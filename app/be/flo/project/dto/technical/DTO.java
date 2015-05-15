package be.flo.project.dto.technical;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import play.Logger;
import play.mvc.Content;
import be.flo.project.util.message.ErrorMessageEnum;
import be.flo.project.util.exception.MyRuntimeException;

import java.io.IOException;

/**
 * Created by florian on 10/11/14.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class DTO implements Content {


    private String __type;
    private String __class;

    public static <T extends DTO> T getDTO(JsonNode data, Class<T> type) {

        if (data != null) {
            ObjectMapper mapper = new ObjectMapper();
            JsonParser jp = data.traverse();
            Logger.info("DTO:"+data.asText());
            try {
                T dto = mapper.readValue(jp, type);

                if (dto == null) {
                    throw new MyRuntimeException(ErrorMessageEnum.JSON_CONVERSION_ERROR);
                }

                //dto.validate();
                return dto;

            } catch (IOException e) {
                throw new MyRuntimeException(ErrorMessageEnum.JSON_CONVERSION_ERROR);
            }
        }
        throw new MyRuntimeException(ErrorMessageEnum.JSON_CONVERSION_ERROR);
    }

    public String get__type() {
        return this.getClass().getCanonicalName();
    }

    public void set__type(String __type) {
        if (!get__type().equals(__type)) {
            throw new MyRuntimeException(ErrorMessageEnum.FATAL_ERROR, get__type()+" instead of "+__type);
        }
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


}
