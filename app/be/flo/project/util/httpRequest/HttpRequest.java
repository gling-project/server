package be.flo.project.util.httpRequest;

import be.flo.project.dto.technical.DTO;
import be.flo.project.util.exception.MyRuntimeException;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.TreeNode;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import play.Logger;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by florian on 30/08/14.
 */
@Component
public class HttpRequest {


    public enum RequestMethod {
        GET, POST;
    }

    public <T extends DTO> T sendRequest(RequestMethod requestMethod, String site, Map<String, String> params, Class<T> returnExcepted) throws HttpRequestException {

        try {
            String response = sendRequest(requestMethod, site, params);

            ObjectMapper mapper = new ObjectMapper();
            JsonFactory factory = mapper.getFactory();
            JsonParser jp = factory.createParser(response);
            JsonNode actualObj = mapper.readTree(jp);

            return DTO.getDTO(actualObj, returnExcepted);
        } catch (IOException e) {
            e.printStackTrace();
            throw new MyRuntimeException(e.getMessage());
        }
    }

    public String sendRequest(RequestMethod requestMethod, String site, Map<String, String> params) throws HttpRequestException {

        if (params == null) {
            params = new HashMap<>();
        }

        String paramString = buildOption(params);

        try {

            if (!site.contains("http")) {
                site = "http://" + site;
            }

            if (requestMethod.equals(RequestMethod.GET)) {
                site = site + "?" + buildOption(params);
            }

            URL url = new URL(site);

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod(requestMethod.toString());
            connection.setRequestProperty("Content-Type",
                    "application/x-www-form-urlencoded");

            if (requestMethod.equals(RequestMethod.POST)) {
                connection.setRequestProperty("Content-Length", "" +
                        Integer.toString(paramString.getBytes().length));
            }
            connection.setRequestProperty("Content-Language", "en-US");

            connection.setUseCaches(false);
            connection.setDoInput(true);
            connection.setDoOutput(true);

            //Send request
            if (requestMethod.equals(RequestMethod.POST)) {
                DataOutputStream wr = new DataOutputStream(
                        connection.getOutputStream());
                wr.writeBytes(paramString);
                wr.flush();
                wr.close();
            }

            Logger.info("Send request... (" + url + ")");

            //Get Response
            InputStream is = connection.getInputStream();
            BufferedReader rd = new BufferedReader(new InputStreamReader(is));
            String line;
            StringBuffer response = new StringBuffer();
            while ((line = rd.readLine()) != null) {
                response.append(line);
                response.append('\r');
            }
            rd.close();

            Logger.info("Request finish ! : " + response.toString());

            return response.toString();


        } catch (MalformedURLException e) {
            throw new HttpRequestException(e, "URL malformed");
        } catch (IOException e) {
            throw new HttpRequestException(e, "URL error");
        }


    }

    private String buildOption(Map<String, String> params) {
        if (params == null) {
            return "";
        }

        String content = "";
        boolean first = false;
        for (Map.Entry<String, String> entry : params.entrySet()) {
            if (first) {
                first = false;
            } else {
                content += "&";
            }
            content += entry.getKey() + "=" + entry.getValue();
        }
        return content;
    }
}
