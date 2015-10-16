package be.lynk.server.mongoService.impl;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import be.lynk.server.module.mongo.MongoDBOperator;
import be.lynk.server.mongoService.MongoSearchService;
import com.mongodb.Block;
import com.mongodb.client.FindIterable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Sorts.ascending;
import static java.util.Arrays.asList;

/**
 * Created by florian on 16/10/15.
 */
@Service
public class MongoSearchServiceImpl implements MongoSearchService {

    private final static String BY_DEFAULT = "be.lynk.server.controller.rest.SearchRestController.getByDefault";


    @Autowired
    private MongoDBOperator mongoDBOperator;


    @Override
    public int numberSessionsFrom(LocalDateTime localDateTime){

        Date from = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());

        DBCursor cursor = mongoDBOperator.getDB().getCollection(BY_DEFAULT)
                                         .find(new BasicDBObject("_id", new BasicDBObject("$gt", from)));

        List<Session> sessions = new ArrayList<>();

        while (cursor.hasNext()) {
            DBObject next = cursor.next();
            Session session = new Session((Long) next.get("currentAccountId"), (String) next.get("sessionId"), (Date) next.get("_id"));
            boolean founded = false;
            for (Session session1 : sessions) {
                if (session1.sameSession(session)) {
                    founded = true;
                    break;
                }
            }
            if (!founded) {
                sessions.add(session);
            }
        }

        int sessionNb = sessions.size();
        return sessionNb;
    }

    private class Session {

        private Long   userId;
        private String sessionKey;
        private Date   date;

        public Session(Long userId, String sessionKey, Date date) {
            this.userId = userId;
            this.sessionKey = sessionKey;
            this.date = date;
        }

        public Long getUserId() {
            return userId;
        }

        public String getSessionKey() {
            return sessionKey;
        }

        public Date getDate() {
            return date;
        }

        public boolean sameSession(Session session) {
            if ((userId != null && userId.equals(session.getUserId()) ||
                    sessionKey != null && sessionKey.equals(session.getSessionKey())) &&
                    date.getTime() < session.getDate().getTime() &&
                    (date.getTime() + (1000L * 60L * 30L)) > session.getDate().getTime()) {
                return true;
            }
            return false;
        }
    }


}
