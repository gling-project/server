package be.flo.project.util.httpRequest;

import be.flo.project.dto.externalDTO.FacebookTokenAccessControlDTO;
import be.flo.project.util.message.ErrorMessageEnum;
import be.flo.project.util.exception.MyRuntimeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import play.Configuration;
import play.Logger;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by florian on 3/05/15.
 */
@Component
public class FacebookRequest {

    private String facebookAppId = Configuration.root().getString("facebook.app.id");
    private String facebookAppSecret = Configuration.root().getString("facebook.app.secret");

    @Autowired
    private HttpRequest httpRequest;

    public FacebookTokenAccessControlDTO debugToken(String accessKey) {

        Map<String, String> map = new HashMap<>();
        map.put("access_token", accessKey);

        try {
            return httpRequest.sendRequest(HttpRequest.RequestMethod.GET, "https://graph.facebook.com/me", map, FacebookTokenAccessControlDTO.class);
        } catch (HttpRequestException e) {
            e.printStackTrace();
            throw new MyRuntimeException(ErrorMessageEnum.FATAL_ERROR);
        }
    }

    public String facebookAuthentication() {

        Map<String, String> map = new HashMap<>();
        map.put("client_id", facebookAppId);
        map.put("client_secret", facebookAppSecret);
        map.put("grant_type", "client_credentials");


        try {
            String response= httpRequest.sendRequest(HttpRequest.RequestMethod.GET, "https://graph.facebook.com/oauth/access_token", map);
            String token = response.split("\\|")[1].replace(" ","");
            Logger.info("token  : "+token);
            return token;
        } catch (HttpRequestException e) {
            e.printStackTrace();
            throw new MyRuntimeException(ErrorMessageEnum.FATAL_ERROR);
        }
    }
}
