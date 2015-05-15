package be.flo.project.controller.technical.security.annotation;

import be.flo.project.controller.technical.security.CommonSecurityController;
import be.flo.project.controller.technical.security.role.RoleEnum;
import be.flo.project.model.entities.Role;
import be.flo.project.service.TranslationService;
import be.flo.project.service.impl.TranslationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import play.libs.F;
import play.mvc.Action;
import play.mvc.Http;
import play.mvc.SimpleResult;
@Service
public class SecurityAnnotationAction extends Action<SecurityAnnotation> {

    //controllers
    @Autowired
    protected CommonSecurityController securityController;

    private TranslationService translationService = new TranslationServiceImpl();

    @Override
    public F.Promise<SimpleResult> call(final Http.Context context) throws Throwable {

        if (securityController.isAuthenticated(context)) {
            for (Role role : securityController.getCurrentUser().getRoles()) {
                if (role.getRoleEnum().equals(configuration.role()) ||
                        role.getRoleEnum().getChildren().contains(configuration.role())) {
                    return delegate.call(context);

                }
            }

        }

        return F.Promise.promise(new F.Function0<SimpleResult>() {
            @Override
            public SimpleResult apply() throws Throwable {
                return securityController.onUnauthorized(context);
            }
        });
    }
}