package be.lynk.server.util.httpRequest;

import be.lynk.server.dto.externalDTO.FacebookPageDataDTO;
import be.lynk.server.dto.externalDTO.FacebookImageDTO;
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


    public FacebookTokenAccessControlDTO meRequest(String accessKey) {

        Map<String, String> map = new HashMap<>();
        map.put("access_token", accessKey);

        try {

            HttpRequest httpRequest = new HttpRequest(HttpRequest.RequestMethod.GET, "https://graph.facebook.com/me");
            httpRequest.setReturnExcepted(FacebookTokenAccessControlDTO.class);
            httpRequest.setParams(map);
            return (FacebookTokenAccessControlDTO) httpRequest.sendRequest();
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
            map.put("fields", "description,phone,cover,link,name,location,category,emails,hours,payment_options,website,photos,albums,about");
            map.put("access_token", accessToken);

            HttpRequest httpRequest = new HttpRequest(HttpRequest.RequestMethod.GET, url);
            httpRequest.setParams(map);
            httpRequest.setReturnExcepted(FacebookPageDataDTO.class);

            return (FacebookPageDataDTO)httpRequest.sendRequest();
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
            map.put("fields", "photos");
            map.put("access_token", accessToken);

            HttpRequest httpRequest = new HttpRequest(HttpRequest.RequestMethod.GET, url);
            httpRequest.setParams(map);
            httpRequest.setReturnExcepted(FacebookPhotoDTO.class);

            return (FacebookPhotoDTO)httpRequest.sendRequest();

        } catch (Exception e) {
            e.printStackTrace();
            throw new MyRuntimeException(e.getMessage());
        }
    }

    public FacebookImageDTO getImage(String photoId) {
        String url = "https://graph.facebook.com/v2.5/" + photoId;


        try {

            String accessToken = getAppAccessToken();
            Map<String, String> map = new HashMap<>();
            map.put("fields", "images");
            map.put("access_token", accessToken);

            HttpRequest httpRequest = new HttpRequest(HttpRequest.RequestMethod.GET, url);
            httpRequest.setParams(map);
            httpRequest.setReturnExcepted(FacebookImageDTO.class);

            return (FacebookImageDTO)httpRequest.sendRequest();

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



            HttpRequest httpRequest = new HttpRequest(HttpRequest.RequestMethod.GET, "https://graph.facebook.com/oauth/access_token");
            httpRequest.setParams(map);
            String response = (String)httpRequest.sendRequest();

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
        HttpRequest httpRequest = new HttpRequest(HttpRequest.RequestMethod.GET, "https://graph.facebook.com/oauth/access_token");
        httpRequest.setParams(params);
        String accessTokenS = (String)httpRequest.sendRequest();

        String a = accessTokenS.split("=")[1].replace("\r", "");
        return a;

    }
}
