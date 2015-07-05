package be.lynk.server.service;

import be.lynk.server.controller.AbstractControllerTest;
import be.lynk.server.model.entities.Address;
import org.junit.Assert;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import play.test.Helpers;

/**
 * Created by florian on 29/06/15.
 */

@ContextConfiguration(locations = {"classpath:/components.xml"})
@RunWith(SpringJUnit4ClassRunner.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class LocalizationServiceTest extends AbstractServiceTest {

    @Autowired
    private LocalizationService localizationService;

    @Test
    public void testAddress() {

        Address address = new Address();

        address.setStreet("Grand place");
        address.setCountry("BELGIUM");
        address.setCity("BRUSSEL");
        address.setZip("1000");

        try {
            localizationService.validAddress(address);
        } catch (Exception e) {
            Assert.fail();
        }


    }

}
