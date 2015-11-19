package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.*;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.model.Position;
import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Address;
import be.lynk.server.model.entities.CustomerInterest;
import be.lynk.server.model.entities.Session;
import be.lynk.server.service.*;
import be.lynk.server.service.impl.LocalizationServiceImpl;
import be.lynk.server.util.constants.Constant;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import play.db.jpa.Transactional;
import play.i18n.Lang;
import play.mvc.Result;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;

/**
 * Created by florian on 26/03/15.
 */
@org.springframework.stereotype.Controller
public class
        AccountRestController extends AbstractRestController {

    //service
    @Autowired
    private AccountService          accountService;
    @Autowired
    private LoginCredentialService  loginCredentialService;
    @Autowired
    private AddressService          addressService;
    @Autowired
    private CustomerInterestService customerInterestService;
    @Autowired
    private LocalizationServiceImpl localizationService;
    @Autowired
    private SessionService          sessionService;


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

        MyselfDTO myselfDTO = accountToMyself(securityController.getCurrentUser());

        return ok(myselfDTO);
    }


    @Transactional
    @SecurityAnnotation(role = RoleEnum.USER)
    public Result editAccount(long id) {

        AccountDTO dto = initialization(AccountDTO.class);

        //contorl it's myself'
        if (!securityController.getCurrentUser().getId().equals(id)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION, id);
        }

        Account account = securityController.getCurrentUser();

        //edit
        account.setFirstname(dto.getFirstname());
        account.setLastname(dto.getLastname());
        account.setGender(dto.getGender());
        account.setEmail(dto.getEmail().toLowerCase());

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

        return ok(accountToMyself(account));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.CUSTOMER)
    public Result editCustomerInterest(long id) {

        List<CustomerInterestDTO> customerInterestDTOs = initializationList(CustomerInterestDTO.class);

        //contorl it's myself'
        if (!securityController.getCurrentUser().getId().equals(id)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION, id);
        }

        Account account = securityController.getCurrentUser();

        account.setCustomerInterests(new HashSet<CustomerInterest>());

        for (CustomerInterestDTO customerInterestDTO : customerInterestDTOs) {
            account.getCustomerInterests().add(customerInterestService.findByName(customerInterestDTO.getName()));
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

        ChangePasswordDTO changePasswordDTO = initialization(ChangePasswordDTO.class);

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
        AddressDTO dto = initialization(AddressDTO.class);

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
        if (address.getName().equals("createNewAddress") ||
                address.getName().equals("currentPosition")) {
            throw new MyRuntimeException(ErrorMessageEnum.ADDRESS_WRONG_NAME_TECHNICAL_NAME);
        }

        address.setAccount(currentUser);
        currentUser.getAddresses().add(address);

        accountService.saveOrUpdate(currentUser);

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


        AddressDTO dto = initialization(AddressDTO.class);

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

        initialization();

        Account currentUser = securityController.getCurrentUser();

        Address addressToDelete = addressService.findById(id);

        //control address
        for (Address address : currentUser.getAddresses()) {
            boolean founded = false;
            if (address.getId().equals(id)) {
                founded = true;
                break;
            }
            if (!founded) {
                throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
            }
        }


        //delete
        addressToDelete.setAccount(null);
        addressToDelete.setSelectedByAccount(null);
        addressService.remove(addressToDelete);

        return ok(new ResultDTO());
    }

    @Transactional
    public Result getDistance(long id) {

        //load address
        Address byId = addressService.findById(id);

        Position position = extractPosition();

        //distance
        Long distance = localizationService.distanceBetweenAddress(position, byId);

        return ok(new DistanceDTO(distance));
    }

    @Transactional
    public Result setCurrentAddress() {

        NewAddressDTO newAddressDTO = initialization(NewAddressDTO.class);

        if (!securityController.isAuthenticated(ctx())) {
            return ok(new ResultDTO());
        }

        Account currentUser = securityController.getCurrentUser();

        AddressDTO addressDTO = null;


        if (newAddressDTO.getAddressName().equals("currentPosition") ||
                newAddressDTO.getAddressName().equals("default")) {
            if (currentUser.getSelectedAddress() != null) {
                currentUser.getSelectedAddress().setSelectedByAccount(null);
                addressService.saveOrUpdate(currentUser.getSelectedAddress());
            }
        } else {
            Address address = addressService.findByNameAndAccount(newAddressDTO.getAddressName(), currentUser);
            if (address == null) {
                throw new MyRuntimeException(ErrorMessageEnum.WRONG_ADDRESS_NAME);
            }
            currentUser.setSelectedAddress(address);
            address.setSelectedByAccount(currentUser);
            addressDTO = dozerService.map(address, AddressDTO.class);
        }

        accountService.saveOrUpdate(currentUser);
        if (addressDTO == null) {
            return ok(new ResultDTO());
        }
        return ok(addressDTO);
    }


    private Position extractPosition(PositionDTO dto) {
        Position position;

        if (dto.getX() == null || dto.getY() == null) {
            position = Constant.DEFAULT_POSITION;
        } else {
            position = dozerService.map(dto, Position.class);
        }

        return position;
    }

    private Position extractPosition() {
        return extractPosition(initialization(PositionDTO.class));
    }

}
