package be.lynk.server.controller.technical.security.annotation;
//

import be.lynk.server.controller.technical.security.CommonSecurityController;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.service.TranslationService;
import be.lynk.server.service.impl.TranslationServiceImpl;
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
            RoleEnum role = securityController.getCurrentUser().getRole();
            if (role.equals(configuration.role()) ||
                    role.getChildren().contains(configuration.role())) {
                return delegate.call(context);

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