package be.lynk.server.controller.technical.businessStatus;
//

import be.lynk.server.controller.technical.security.CommonSecurityController;
import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.model.entities.Business;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import play.libs.F;
import play.mvc.Action;
import play.mvc.Http;
import play.mvc.SimpleResult;

@Service
public class BusinessStatusAnnotationAction extends Action<BusinessStatusAnnotation> {

    //controllers
    @Autowired
    protected CommonSecurityController securityController;

    @Override
    public F.Promise<SimpleResult> call(final Http.Context context) throws Throwable {

        if (securityController.isAuthenticated(context)) {
            RoleEnum role = securityController.getCurrentUser().getRole();

            if (role.equals(RoleEnum.SUPERADMIN)) {
                return delegate.call(context);
            }

            if (role.equals(RoleEnum.BUSINESS) || role.getChildren().contains(RoleEnum.BUSINESS)) {

                Business business = securityController.getCurrentUser().getBusiness();
                for (BusinessStatusEnum businessStatus : configuration.status()) {
                    if (checkParentEquals(business.getBusinessStatus(), businessStatus)) {
                        return delegate.call(context);
                    }
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

    public boolean checkParentEquals(BusinessStatusEnum fromBusiness, BusinessStatusEnum toTest) {
        if (fromBusiness.equals(toTest)) {
            return true;
        }
        return false;
    }
}