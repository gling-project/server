package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.*;
import be.lynk.server.dto.post.CustomerRegistrationDTO;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.model.Position;
import be.lynk.server.model.entities.*;
import be.lynk.server.service.*;
import be.lynk.server.service.impl.LocalizationServiceImpl;
import be.lynk.server.util.exception.MyRuntimeException;
import org.springframework.beans.factory.annotation.Autowired;
import play.Logger;
import play.db.jpa.Transactional;
import play.i18n.Lang;
import play.mvc.Result;
import be.lynk.server.util.message.ErrorMessageEnum;

import java.util.*;

/**
 * Created by florian on 26/03/15.
 */
@org.springframework.stereotype.Controller
public class
        AccountRestController extends AbstractRestController {

    //service
    @Autowired
    private AccountService accountService;
    @Autowired
    private LoginCredentialService loginCredentialService;
    @Autowired
    private AddressService addressService;
    @Autowired
    private CustomerInterestService customerInterestService;
    @Autowired
    private LocalizationServiceImpl localizationService;
    @Autowired
    private SessionService sessionService;


    @Transactional
    @SecurityAnnotation(role = RoleEnum.USER)
    public Result mySession() {
        List<Session> sessions = sessionService.findByAccount(securityController.getCurrentUser());
        Collection<SessionDTO> map = dozerService.map(sessions, SessionDTO.class);

        return ok(new ListDTO<>(map));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.USER)
    public Result myself() {

        MyselfDTO map = dozerService.map(securityController.getCurrentUser(), MyselfDTO.class);

        return ok(map);
    }


    @Transactional
    @SecurityAnnotation(role = RoleEnum.USER)
    public Result editAccount(long id) {

        AccountDTO dto = extractDTOFromRequest(AccountDTO.class);

        //contorl it's myself'
        if (!securityController.getCurrentUser().getId().equals(id)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION, id);
        }

        Account account = securityController.getCurrentUser();

        //edit
        account.setFirstname(dto.getFirstname());
        account.setLastname(dto.getLastname());
        account.setGender(dto.getGender());
        account.setEmail(dto.getEmail());

        if (dto.getLang() != null) {
            Lang lang = Lang.forCode(dto.getLang().getCode());
            if (lang != null) {
                account.setLang(dozerService.map(dto.getLang(), Lang.class));
                changeLang(lang.code());
            }
        }

        //storage
        securityController.storeAccount(ctx(), account);

        //save
        accountService.saveOrUpdate(account);

        return ok(dozerService.map(account, MyselfDTO.class));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.CUSTOMER)
    public Result editCustomerInterest(long id) {

        CustomerRegistrationDTO dto = extractDTOFromRequest(CustomerRegistrationDTO.class);

        //contorl it's myself'
        if (!securityController.getCurrentUser().getId().equals(id)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION, id);
        }

        Account account = securityController.getCurrentUser();

        account.setCustomerInterests(new HashSet<CustomerInterest>());

        if (dto.getCustomerInterests() != null) {
            for (CustomerInterestDTO customerInterestDTO : dto.getCustomerInterests()) {
                account.getCustomerInterests().add(customerInterestService.findByName(customerInterestDTO.getName()));
            }
        }

        accountService.saveOrUpdate(account);

        return ok(new ListDTO<>(dozerService.map(account.getCustomerInterests(), CustomerInterestDTO.class)));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.USER)
    public Result changePassword(long id) {

        //contorl it's myself'
        if (!securityController.getCurrentUser().getId().equals(id)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION, id);
        }

        ChangePasswordDTO changePasswordDTO = extractDTOFromRequest(ChangePasswordDTO.class);

        Account account = securityController.getCurrentUser();

        //control last password
        if (account.getLoginCredential() == null || !loginCredentialService.controlPassword(changePasswordDTO.getOldPassword(), account.getLoginCredential())) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_OLD_PASSWORD);
        }

        account.getLoginCredential().setPassword(changePasswordDTO.getNewPassword());

        //operation
        accountService.saveOrUpdate(account);

        return ok(dozerService.map(account, AccountDTO.class));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.CUSTOMER)
    public Result addAddress() {
        AddressDTO dto = extractDTOFromRequest(AddressDTO.class);

        Address address = dozerService.map(dto, Address.class);

        //TODO control address
        //TODO temp
        address.setCountry("BELGIUM");


        //control address
        try {
            localizationService.validAddress(address);
        } catch (Exception e) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_ADDRESS);
        }


        Account currentUser = securityController.getCurrentUser();

        //control name
        if (addressService.findByNameAndAccount(address.getName(), currentUser) != null) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_ADDRESS_NAME_ALREADY_USED);
        }

        address.setAccount(currentUser);
        currentUser.getAddresses().add(address);

        accountService.saveOrUpdate(currentUser);

        Logger.info("my new address : " + address);

        return ok(dozerService.map(address, AddressDTO.class));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.USER)
    public Result editAddress(long id) {

        //test id
        Account currentUser = securityController.getCurrentUser();

        boolean founded = false;

        for (Address address : currentUser.getAddresses()) {
            if (address.getId().equals(id)) {
                founded = true;
                break;
            }
        }

        if (!founded) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }


        AddressDTO dto = extractDTOFromRequest(AddressDTO.class);

        Address address = addressService.findById(id);
        address.setCity(dto.getCity());
        address.setStreet(dto.getStreet());
        address.setName(dto.getName());
        address.setZip(dto.getZip());


        //control address
        try {
            localizationService.validAddress(address);
        } catch (Exception e) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_ADDRESS);
        }

        addressService.saveOrUpdate(address);

        AddressDTO addressDTO = dozerService.map(address, AddressDTO.class);

        return ok(addressDTO);
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.CUSTOMER)
    public Result deleteAddress(long id) {

        Account currentUser = securityController.getCurrentUser();

        Address addressToDelete = null;

        for (Address address : currentUser.getAddresses()) {
            if (address.getId().equals(id)) {
                addressToDelete = address;
                break;
            }
        }

        if (addressToDelete == null) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        currentUser.getAddresses().remove(addressToDelete);


        //delete
        accountService.saveOrUpdate(currentUser);
        addressService.remove(addressToDelete);

        return ok(new ResultDTO());
    }

    @Transactional
    public Result getDistance(long id) {

        //load address
        Address byId = addressService.findById(id);

        PositionDTO dto = extractDTOFromRequest(PositionDTO.class);

        //distance
        Long distance = localizationService.distanceBetweenAddress(dozerService.map(dto, Position.class), byId);

        return ok(new DistanceDTO(distance));
    }

    @Transactional
    public Result setCurrentAddress() {

        NewAddressDTO newAddressDTO = extractDTOFromRequest(NewAddressDTO.class);

        if (!securityController.isAuthenticated(ctx())) {
            return ok(new ResultDTO());
        }

        Account currentUser = securityController.getCurrentUser();

        AddressDTO addressDTO = null;



        if (newAddressDTO.getAddressName().equals("currentPosition")) {
            currentUser.setSelectedAddress(null);
        } else {
            Address address = addressService.findByNameAndAccount(newAddressDTO.getAddressName(), currentUser);
            if (address == null) {
                throw new MyRuntimeException(ErrorMessageEnum.WRONG_ADDRESS_NAME);
            }
            currentUser.setSelectedAddress(address);
            addressDTO = dozerService.map(address,AddressDTO.class);
        }

        accountService.saveOrUpdate(currentUser);
        if(addressDTO==null){
            return ok(new ResultDTO());
        }
        return ok(addressDTO);
    }


}
