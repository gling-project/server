package be.lynk.server.util.httpRequest;

import be.lynk.server.dto.externalDTO.FacebookPageDataDTO;
import be.lynk.server.dto.externalDTO.FacebookPhotoDTO;
import be.lynk.server.dto.externalDTO.FacebookTokenAccessControlDTO;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import play.Configuration;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by florian on 3/05/15.
 */
@Component
public class FacebookRequest {

    private String facebookAppId     = Configuration.root().getString("facebook.app.id");
    private String facebookAppSecret = Configuration.root().getString("facebook.app.secret");

    @Autowired
    private HttpRequest httpRequest;

    public FacebookTokenAccessControlDTO meRequest(String accessKey) {

        Map<String, String> map = new HashMap<>();
        map.put("access_token", accessKey);

        try {
            return httpRequest.sendRequest(HttpRequest.RequestMethod.GET, "https://graph.facebook.com/me", map, FacebookTokenAccessControlDTO.class);
        } catch (HttpRequestException e) {
            e.printStackTrace();
            throw new MyRuntimeException(ErrorMessageEnum.FATAL_ERROR);
        }
    }

    public FacebookPageDataDTO getPageData(String pageName) {


        try {
            String accessToken = getAppAccessToken();


            String url = "https://graph.facebook.com/v2.5/" + pageName;


            //https://graph.facebook.com/v2.5/uopclibrairie?fields=description,phone,cover,link,name,location,category,emails,hours,payment_options,website,photos

            Map<String, String> map = new HashMap<>();
            map.put("fields", "description,phone,cover,link,name,location,category,emails,hours,payment_options,website,photos");
            map.put("access_token", accessToken);


            FacebookPageDataDTO pageContent = httpRequest.sendRequest(HttpRequest.RequestMethod.GET, url, map, FacebookPageDataDTO.class);

            return pageContent;

        } catch (Exception e) {
            e.printStackTrace();
            throw new MyRuntimeException(e.getMessage());
        }
    }

    public FacebookPhotoDTO getPhoto(String photoId) {
        String url = "https://graph.facebook.com/v2.5/" + photoId;


        try {

            String accessToken = getAppAccessToken();
            Map<String, String> map = new HashMap<>();
            map.put("fields", "images");
            map.put("access_token", accessToken);

            FacebookPhotoDTO pageContent = httpRequest.sendRequest(HttpRequest.RequestMethod.GET, url, map, FacebookPhotoDTO.class);

            return pageContent;

        } catch (Exception e) {
            e.printStackTrace();
            throw new MyRuntimeException(e.getMessage());
        }
    }

    public String facebookAuthentication() {

        Map<String, String> map = new HashMap<>();
        map.put("client_id", facebookAppId);
        map.put("client_secret", facebookAppSecret);
        map.put("grant_type", "client_credentials");


        try {
            String response = httpRequest.sendRequest(HttpRequest.RequestMethod.GET, "https://graph.facebook.com/oauth/access_token", map);
            String token = response.split("\\|")[1].replace(" ", "");
            return token;
        } catch (HttpRequestException e) {
            e.printStackTrace();
            throw new MyRuntimeException(ErrorMessageEnum.FATAL_ERROR);
        }
    }

    public String getAppAccessToken() throws HttpRequestException {
        Map<String, String> params = new HashMap<>();
        params.put("client_id", facebookAppId);
        params.put("client_secret", facebookAppSecret);
        params.put("grant_type", "client_credentials");

        //recover the access token of the app
        String accessTokenS = httpRequest.sendRequest(HttpRequest.RequestMethod.GET, "https://graph.facebook.com/oauth/access_token", params);
        return accessTokenS.split("=")[1];

    }
}
