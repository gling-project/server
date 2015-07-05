package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.businessStatus.BusinessStatus;
import be.lynk.server.controller.technical.security.SecurityAnnotation;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.technical.ResultDTO;
import be.lynk.server.importer.CategoryImporter;
import be.lynk.server.model.entities.Business;
import be.lynk.server.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import play.db.jpa.Transactional;
import play.mvc.Result;

/**
 * Created by florian on 5/07/15.
 */
public class SuperAdminRestController extends AbstractRestController {

    @Autowired
    private BusinessService businessService;

    @Autowired
    private CategoryImporter categoryImporter;

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result importCategory() {

        return ok(categoryImporter.importStart(false));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result importCategoryTranslation() {

        return ok(categoryImporter.importStart(true));
    }

    @Transactional
    @SecurityAnnotation(role = RoleEnum.SUPERADMIN)
    public Result confirmPublication(Long id) {


        Business business = businessService.findById(id);

        business.setBusinessStatus(BusinessStatus.PUBLISHED);

        businessService.saveOrUpdate(business);

        return ok(new ResultDTO());
    }
}
