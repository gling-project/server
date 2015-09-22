package be.lynk.server.controller.technical.businessStatus;

import play.mvc.With;

import java.lang.annotation.*;


/**
 * Created by gaston on 8/25/14.
 */

@With(BusinessStatusAnnotationAction.class)
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
@Inherited
@Documented
public @interface BusinessStatusAnnotation {
	BusinessStatusEnum[] status();
}
