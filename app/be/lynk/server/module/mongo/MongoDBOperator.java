package be.lynk.server.module.mongo;

import be.lynk.server.dto.technical.DTO;
import be.lynk.server.model.entities.Account;
import com.mongodb.*;
import org.mongojack.JacksonDBCollection;
import org.springframework.stereotype.Component;
import play.Configuration;
import play.Logger;
import play.Play;
import play.libs.F;
import play.mvc.Http;


import java.lang.reflect.Method;
import java.net.UnknownHostException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by florian on 19/07/15.
 */
@Component
public class MongoDBOperator {


    private static String SERVER     = Configuration.root().getString("mongodb.servers");
    private static String CREDENTIAL = Configuration.root().getString("mongodb.credentials");
    private static String DATABASE   = Configuration.root().getString("mongodb.database");

    private static DB db = null;


//    mongodb.database=${MongodbDatabase}
//    mongodb.credentials=${MongodbCredential}
//    mongodb.servers=${MongodbServer}


    private void initialization() {
        try {

            List<MongoCredential> mongoCredential = new ArrayList<>();

            if (Play.isProd()) {

//                mongoCredential.add(MongoCredential.createMongoCRCredential(, , CREDENTIAL.split(":")[1].toCharArray()));
            }

            ServerAddress serverAddress = new ServerAddress();

            String user = CREDENTIAL.split(":")[0];
            String password = CREDENTIAL.split(":")[1];
            String dbName = DATABASE;
            String host = SERVER.split(":")[0];
            String port = SERVER.split(":")[1];

            String uriS = "mongodb://" + user + ":" + password + "@" + host + ":" + port + "/" + dbName;

            Logger.info("--------------------------------=>" + uriS);

            MongoClientURI uri = new MongoClientURI(uriS);
            MongoClient mongoClient = new MongoClient(uri);

            db = mongoClient.getDB(uri.getDatabase());


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public <T extends DTO> void write(String route, T dto, Class<T> clazz) {
        F.Promise.promise(() -> {

            if (db == null) {
                initialization();
            }

            try {

                DBCollection coll = db.getCollection(route);//name1+"."+name);

                JacksonDBCollection<T, String> jColl = JacksonDBCollection.wrap(coll, clazz,
                                                                                String.class);


                jColl.insert(dto);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return null;
        });
    }
}
