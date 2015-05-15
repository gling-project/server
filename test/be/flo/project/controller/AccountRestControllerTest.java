package be.flo.project.controller;

import be.flo.project.controller.technical.security.CommonSecurityController;
import be.flo.project.dto.AccountDTO;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import play.libs.Json;
import play.mvc.Result;
import play.test.FakeRequest;

import static play.test.Helpers.status;

import static play.test.Helpers.*;
import static org.junit.Assert.*;

/**
 * Created by florian on 19/04/15.
 */
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class AccountRestControllerTest extends AbstractControllerTest {

    protected static final String FIRSTNAME2 = "firstname2";
    protected static final String LASTNAME2 = "lastname2";
    protected static final String EMAIL2 = "my@email2.com";

    @Test
    public void test1_readAccount() {

        registration();

        //load user
        Result result = request(GET, "/myself");

        assertEquals(printError(result), 200, status(result));

        AccountDTO dto = getDTO(result, AccountDTO.class);

        assertEquals(FIRSTNAME, dto.getFirstname());
        assertEquals(LASTNAME, dto.getLastname());
        assertEquals(EMAIL, dto.getEmail());
    }

    @Test
    public void test2_editAccount() {
        registration();

        //load
        AccountDTO myself = requestWithDTo(GET, "/myself", AccountDTO.class);

        assertNotNull(myself.getId());

        //edit
        myself.setFirstname(FIRSTNAME2);
        myself.setLastname(LASTNAME2);
        myself.setEmail(EMAIL2);

        //save
        myself = requestWithDTo(PUT, "/account/" + myself.getId(), myself, AccountDTO.class);

        //test
        assertEquals(FIRSTNAME2, myself.getFirstname());
        assertEquals(LASTNAME2, myself.getLastname());
        //the email address cannot be update by this way
        assertEquals(EMAIL2, myself.getEmail());

    }


}
