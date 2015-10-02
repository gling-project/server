package be.lynk.server.module.mongo;

import be.lynk.server.dto.technical.DTO;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Created by florian on 19/07/15.
 */
@Component
public class MongoDBOperator {

    public <V extends DTO> void write(V dto, Class<V> clazz) {
//        //asynchronious
//        F.Promise.promise(() -> {
//            JacksonDBCollection<V, Date> collection = MongoDB.collection(clazz.getName(), clazz, play.api.Play.current());
//
//            collection.insert(dto);
//            return null;
//        });
    }

}
