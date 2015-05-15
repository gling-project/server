package be.flo.project.util;

import play.Configuration;

/**
 * Created by florian on 10/05/15.
 */
public class AppUtil {

    static String appId = Configuration.root().getString("facebook.app.id");
    static String appSecret = Configuration.root().getString("facebook.app.secret");

    public static String getFacebookAppId(){
        if(appId!=null){
            return appId;
        }
        return "1446672245627002";

    }

    public static String getFacebookAppSecret() {
        return appSecret;
    }
}
