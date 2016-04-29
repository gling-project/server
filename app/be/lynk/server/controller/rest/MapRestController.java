package be.lynk.server.controller.rest;

import be.lynk.server.controller.EmailController;
import be.lynk.server.controller.technical.businessStatus.BusinessStatusEnum;
import be.lynk.server.dto.CustomerInterestDTO;
import be.lynk.server.dto.ListDTO;
import be.lynk.server.dto.map.MapDataBusinessDTO;
import be.lynk.server.model.MapDataBusiness;
import be.lynk.server.model.entities.Account;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.CustomerInterest;
import be.lynk.server.model.entities.FollowLink;
import be.lynk.server.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import play.Logger;
import play.db.jpa.Transactional;
import play.mvc.Result;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by florian on 20/11/15.
 */
@org.springframework.stereotype.Controller
public class MapRestController extends AbstractRestController {

    @Autowired
    private BusinessService         businessService;
    @Autowired
    private FollowLinkService       followLinkService;
    @Autowired
    private PublicationService      publicationService;
    @Autowired
    private BusinessScheduleService businessScheduleService;
    @Autowired
    private CustomerInterestService customerInterestService;
    @Autowired
    private BusinessCategoryService businessCategoryService;


    @Transactional
    public Result getMapDataBusinesses() {

        long t = new Date().getTime();

        List<MapDataBusinessDTO> results = new ArrayList<>();

        Account account = null;
        if (securityController.isAuthenticated(ctx())) {
            account = securityController.getCurrentUser();
        }

        List<MapDataBusiness> byStatus = businessService.findForMap(account);

        Logger.info("getMapDataBusinesses TIME 1: " + ((new Date().getTime()) - t));

        for (MapDataBusiness business : byStatus) {
            business.setBusinessCategories(businessService.findById(business.getId()).getBusinessCategories());
        }

        Logger.info("getMapDataBusinesses TIME 2: " + ((new Date().getTime()) - t));

        List<FollowLink> byAccount = followLinkService.findByAccount(account);

        for (MapDataBusiness business : byStatus) {
            for (FollowLink followLink : byAccount) {
                if(business.getId().equals(followLink.getBusiness().getId())){
                    business.setFollowing(true);
                }
            }
        }

        Logger.info("getMapDataBusinesses TIME 3: " + ((new Date().getTime()) - t));

        for (MapDataBusiness business : byStatus) {
            MapDataBusinessDTO mapDataBusiness = dozerService.map(business, MapDataBusinessDTO.class);

//            //following ?
//            if (account != null) {
//                mapDataBusiness.setFollowing(followLinkService.testByAccountAndBusiness(account, business));
//            }
//
//            Logger.info("--- 1.2: " + ((new Date().getTime()) - t));
//
//            //attendance
//            mapDataBusiness.setAttendance(businessScheduleService.getCurrentAttendance(business.getSchedules()));
//
//            Logger.info("--- 1.3: " + ((new Date().getTime()) - t));
//
            //interest
            List<CustomerInterest> interestsByBusiness = customerInterestService.findInterestByBusinessId(business.getId());
//            Logger.info("--- 1.4: " + ((new Date().getTime()) - t));
            mapDataBusiness.setInterests(dozerService.map(interestsByBusiness, CustomerInterestDTO.class));
//
//            Logger.info("--- 1.5: " + ((new Date().getTime()) - t));

            results.add(mapDataBusiness);
        }

        Logger.info("getMapDataBusinesses TIME 4: " + ((new Date().getTime()) - t));

        return ok(new ListDTO<>(results));
    }

//    @Transactional
//    public Result getMapDataBusinesses() {
//
//        long t = new Date().getTime();
//
//        List<MapDataBusinessDTO> results = new ArrayList<>();
//
//        Account account = null;
//        if (securityController.isAuthenticated(ctx())) {
//            account = securityController.getCurrentUser();
//        }
//
//        for (Business business : businessService.findByStatus(BusinessStatusEnum.PUBLISHED)) {
//
//            MapDataBusinessDTO mapDataBusiness = dozerService.map(business, MapDataBusinessDTO.class);
//
//            //following ?
//            if (account != null) {
//                mapDataBusiness.setFollowing(followLinkService.testByAccountAndBusiness(account, business));
//            }
//
//            //attendance
//            mapDataBusiness.setAttendance(businessScheduleService.getCurrentAttendance(business.getSchedules()));
//
//            //interest
//            mapDataBusiness.setInterests(dozerService.map(customerInterestService.findInterestsByBusiness(business), CustomerInterestDTO.class));
//
//            results.add(mapDataBusiness);
//        }
//
//        Logger.info("getMapDataBusinesses TIME : " + ((new Date().getTime()) - t));
//
//        return ok(new ListDTO<>(results));
//    }
}
