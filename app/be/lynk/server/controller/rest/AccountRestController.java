package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.security.annotation.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.*;
import be.lynk.server.dto.post.CustomerRegistrationDTO;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.model.entities.*;
import be.lynk.server.service.AddressService;
import be.lynk.server.service.CustomerInterestService;
import be.lynk.server.service.LoginCredentialService;
import be.lynk.server.service.impl.LocalizationServiceImpl;
import be.lynk.server.util.exception.MyRuntimeException;
import org.springframework.beans.factory.annotation.Autowired;
import play.Logger;
import play.db.jpa.Transactional;
import play.i18n.Lang;
import play.mvc.Result;
import be.lynk.server.service.AccountService;
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


    @Transactional
    @SecurityAnnotation(role = RoleEnum.USER)
    public Result mySession() {
        Set<Session> sessions = securityController.getCurrentUser().getSessions();
        Collection<SessionDTO> map = dozerService.map(sessions, SessionDTO.class);

        return ok(new ListDTO<SessionDTO>(map));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.USER)
    public Result myself() {
        Logger.info("myself="+securityController.getCurrentUser());
        return ok(dozerService.map(securityController.getCurrentUser(), MyselfDTO.class));
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
        securityController.storeAccount(ctx(),account);

        //save
        accountService.saveOrUpdate(account);

        return ok(dozerService.map(account, AccountDTO.class));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.CUSTOMER)
    public Result editCustomerInterest(long id) {

        CustomerRegistrationDTO dto = extractDTOFromRequest(CustomerRegistrationDTO.class);

        //contorl it's myself'
        if (!securityController.getCurrentUser().getId().equals(id)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION, id);
        }

        CustomerAccount account = (CustomerAccount) securityController.getCurrentUser();

        account.setCustomerInterests(new HashSet<>());

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
            throw new MyRuntimeException(ErrorMessageEnum.VALIDATION_PASSWORD);
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
        if (!localizationService.validAddress(address)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_ADDRESS);
        }

        CustomerAccount currentUser = (CustomerAccount) securityController.getCurrentUser();
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

        if (currentUser instanceof CustomerAccount) {
            for (Address address : ((CustomerAccount) currentUser).getAddresses()) {
                if (address.getId().equals(id)) {
                    founded = true;
                    break;
                }
            }
        } else {
            if (((BusinessAccount) currentUser).getBusiness().getAddress().getId().equals(id)) {
                founded = true;
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
        if (!localizationService.validAddress(address)) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_ADDRESS);
        }

        addressService.saveOrUpdate(address);

        return ok(dozerService.map(address, AddressDTO.class));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.CUSTOMER)
    public Result deleteAddress(long id) {

        Account currentUser = securityController.getCurrentUser();

        Address addressToDelete = null;

        for (Address address : ((CustomerAccount) currentUser).getAddresses()) {
            if (address.getId().equals(id)) {
                addressToDelete = address;
                break;
            }
        }

        if (addressToDelete == null) {
            throw new MyRuntimeException(ErrorMessageEnum.WRONG_AUTHORIZATION);
        }

        ((CustomerAccount) currentUser).getAddresses().remove(addressToDelete);


        //delete
        accountService.saveOrUpdate(currentUser);
        addressService.remove(addressToDelete);

        return ok(new ResultDTO());
    }


}
