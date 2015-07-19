package be.lynk.server.dto.technical;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.vz.mongodb.jackson.Id;
import net.vz.mongodb.jackson.ObjectId;
import play.Logger;
import play.modules.mongodb.jackson.KeyTyped;
import play.mvc.Content;
import be.lynk.server.util.message.ErrorMessageEnum;
import be.lynk.server.util.exception.MyRuntimeException;

import java.io.IOException;
import java.util.Date;

/**
 * Created by florian on 10/11/14.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class DTO implements Content ,KeyTyped<Date> {

    @javax.persistence.Id
    protected Date parsingDate =new Date();

    protected String currentAccountEmail;


    private String __type;
    private String __class;

    public static <T extends DTO> T getDTO(JsonNode data, Class<T> type) {

        Logger.info("data");
        Logger.info(data + "");

        if (data != null) {
            ObjectMapper mapper = new ObjectMapper();
            JsonParser jp = data.traverse();
            Logger.info("DTO:" + data.asText());
            try {
                T dto = mapper.readValue(jp, type);

                if (dto == null) {
                    throw new MyRuntimeException(ErrorMessageEnum.JSON_CONVERSION_ERROR);
                }

                //dto.validate();
                return dto;

            } catch (IOException e) {
                Logger.error("error Json with value : " + data.asText());
                e.printStackTrace();
                throw new MyRuntimeException(ErrorMessageEnum.JSON_CONVERSION_ERROR);
            }
        }
        throw new MyRuntimeException(ErrorMessageEnum.JSON_CONVERSION_ERROR);
    }

    public String get__type() {
        return this.getClass().getCanonicalName();
    }

    public void set__type(String __type) {
//        if (!get__type().equals(__type)) {
//            throw new MyRuntimeException(ErrorMessageEnum.FATAL_ERROR, get__type()+" instead of "+__type);
//        }
    }

    @Override
    public String body() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new MyRuntimeException(ErrorMessageEnum.FATAL_ERROR, e.getMessage());
        }
    }

    @Override
    public String contentType() {
        return "application/json; charset=utf-8";
    }


    public Date getParsingDate() {
        return parsingDate;
    }

    public void setParsingDate(Date parsingDate) {
        this.parsingDate = parsingDate;
    }

    public String getCurrentAccountEmail() {
        return currentAccountEmail;
    }

    public void setCurrentAccountEmail(String currentAccountEmail) {
        this.currentAccountEmail = currentAccountEmail;
    }
}
