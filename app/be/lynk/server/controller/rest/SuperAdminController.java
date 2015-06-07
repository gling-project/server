package be.lynk.server.controller.rest;

import be.lynk.server.controller.technical.AbstractController;
import be.lynk.server.importer.CategoryImporter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import play.db.jpa.Transactional;
import play.mvc.Result;

/**
 * Created by florian on 6/06/15.
 */
@Controller
public class SuperAdminController extends AbstractController {

    @Autowired
    private CategoryImporter categoryImporter;

    @Transactional
    public Result importCategory() {

        return ok(categoryImporter.importStart(false));
    }

    @Transactional
    public Result importCategoryTranslation() {

        return ok(categoryImporter.importStart(true));
    }
}
