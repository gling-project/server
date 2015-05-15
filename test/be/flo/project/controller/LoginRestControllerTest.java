package be.flo.project.controller;

import be.flo.project.dto.AccountFusionDTO;
import be.flo.project.dto.FacebookAuthenticationDTO;
import be.flo.project.dto.LangDTO;
import be.flo.project.dto.MyselfDTO;
import be.flo.project.dto.externalDTO.FacebookTokenAccessControlDTO;
import be.flo.project.dto.post.LoginDTO;
import be.flo.project.dto.post.RegistrationDTO;
import be.flo.project.util.AppUtil;
import com.jayway.facebooktestjavaapi.testuser.FacebookTestUserAccount;
import com.jayway.facebooktestjavaapi.testuser.FacebookTestUserStore;
import com.jayway.facebooktestjavaapi.testuser.impl.HttpClientFacebookTestUserStore;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import play.libs.Json;
import play.mvc.Result;

import static org.junit.Assert.*;
import static play.test.Helpers.*;

/**
 * Created by florian on 19/04/15.
 */
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class LoginRestControllerTest extends AbstractControllerTest {


    @Test
    public void test1_registration() {

        RegistrationDTO dto = new RegistrationDTO();
        dto.setFirstname(FIRSTNAME);
        dto.setLastname(LASTNAME);
        dto.setMale(true);
        dto.setEmail(EMAIL);
        dto.setPassword(PASSWORD);
        dto.setKeepSessionOpen(true);

        Result result = request(POST, "/registration", dto);

        assertEquals(printError(result), 200, status(result));

        // get LoginResultDTO
        MyselfDTO formDTO = Json.fromJson(Json.parse(new String(contentAsBytes(result))), MyselfDTO.class);

        assertEquals(FIRSTNAME, formDTO.getFirstname());
        assertEquals(LASTNAME, formDTO.getLastname());
        assertEquals(EMAIL, formDTO.getEmail());
        assertFalse(formDTO.getFacebookAccount());
        assertTrue(formDTO.getLoginAccount());

    }

    @Test
    public void test2_login() {

        Result result = request(POST, "/login", new LoginDTO(EMAIL, PASSWORD));

        MyselfDTO formDTO = Json.fromJson(Json.parse(new String(contentAsBytes(result))), MyselfDTO.class);

        assertEquals(FIRSTNAME, formDTO.getFirstname());
        assertEquals(LASTNAME, formDTO.getLastname());
        assertEquals(EMAIL, formDTO.getEmail());
        assertFalse(formDTO.getFacebookAccount());
        assertTrue(formDTO.getLoginAccount());

    }

    @Test
    public void test3_facebookLogin() {

        String facebookAppId = AppUtil.getFacebookAppId();
        String facebookAppSecret = AppUtil.getFacebookAppSecret();


        FacebookTestUserStore facebookStore = new HttpClientFacebookTestUserStore(facebookAppId, facebookAppSecret);
        FacebookTestUserAccount account = facebookStore.createTestUser(true, "email,read_stream");

        FacebookAuthenticationDTO facebookAuthenticationDTO = new FacebookAuthenticationDTO();

        FacebookTokenAccessControlDTO facebookTokenAccessControlDTO=Json.fromJson(Json.parse(account.getUserDetails()), FacebookTokenAccessControlDTO.class);

        //temporary ?
        facebookAuthenticationDTO.setToken(account.accessToken());
        facebookAuthenticationDTO.setLang(new LangDTO("english","en"));
        facebookAuthenticationDTO.setUserId(account.id());

        Result result = request(POST, "/login/facebook", facebookAuthenticationDTO);

        assertEquals(printError(result), 200, status(result));

        // get LoginResultDTO
        MyselfDTO formDTO = Json.fromJson(Json.parse(new String(contentAsBytes(result))), MyselfDTO.class);

        assertEquals("error 3.1",facebookTokenAccessControlDTO.getFirst_name(), formDTO.getFirstname());
        assertEquals("error 3.2",facebookTokenAccessControlDTO.getLast_name(), formDTO.getLastname());
        assertEquals("error 3.3",facebookTokenAccessControlDTO.getEmail(), formDTO.getEmail());
        assertTrue("error 3.4",formDTO.getFacebookAccount());
        assertFalse("error 3.5",formDTO.getLoginAccount());
    }

    @Test
    public void test4_accountFusion() {


        String facebookAppId = AppUtil.getFacebookAppId();
        String facebookAppSecret = AppUtil.getFacebookAppSecret();

        //create a facebook account
        FacebookTestUserStore facebookStore = new HttpClientFacebookTestUserStore(facebookAppId, facebookAppSecret);
        FacebookTestUserAccount account = facebookStore.createTestUser(true, "email,read_stream");

        FacebookAuthenticationDTO facebookAuthenticationDTO = new FacebookAuthenticationDTO();

        FacebookTokenAccessControlDTO facebookTokenAccessControlDTO=Json.fromJson(Json.parse(account.getUserDetails()), FacebookTokenAccessControlDTO.class);


        //first : create a login account
        RegistrationDTO dto = new RegistrationDTO();
        dto.setFirstname(FIRSTNAME);
        dto.setLastname(LASTNAME);
        dto.setMale(true);
        dto.setEmail(facebookTokenAccessControlDTO.getEmail());
        dto.setPassword(PASSWORD);
        dto.setKeepSessionOpen(true);

        Result result = request(POST, "/registration", dto);

        assertEquals(printError(result), 200, status(result));

        // get LoginResultDTO
        MyselfDTO formDTO = Json.fromJson(Json.parse(new String(contentAsBytes(result))), MyselfDTO.class);

        assertEquals(FIRSTNAME, formDTO.getFirstname());
        assertEquals(LASTNAME, formDTO.getLastname());
        assertEquals(facebookTokenAccessControlDTO.getEmail(), formDTO.getEmail());
        assertFalse(formDTO.getFacebookAccount());
        assertTrue(formDTO.getLoginAccount());

        //second : create a facebook account
        facebookAuthenticationDTO.setToken(account.accessToken());
        facebookAuthenticationDTO.setLang(new LangDTO("english","en"));
        facebookAuthenticationDTO.setUserId(account.id());

        result = request(POST, "/login/facebook", facebookAuthenticationDTO);

        assertEquals(printError(result), 410, status(result));

        // get LoginResultDTO
        AccountFusionDTO accountFusionDTO= Json.fromJson(Json.parse(new String(contentAsBytes(result))), AccountFusionDTO.class);
        accountFusionDTO.setPassword(PASSWORD);

        result = request(POST, "/account/fusion", accountFusionDTO);
        assertEquals(printError(result), 200, status(result));

        // get LoginResultDTO
        formDTO = Json.fromJson(Json.parse(new String(contentAsBytes(result))), MyselfDTO.class);

        assertEquals("error 3.1",FIRSTNAME, formDTO.getFirstname());
        assertEquals("error 3.2",LASTNAME, formDTO.getLastname());
        assertEquals("error 3.3",facebookTokenAccessControlDTO.getEmail(), formDTO.getEmail());
        assertTrue("error 3.4",formDTO.getFacebookAccount());
        assertTrue("error 3.5",formDTO.getLoginAccount());
    }


}
