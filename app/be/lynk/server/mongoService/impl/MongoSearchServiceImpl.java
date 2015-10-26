package be.lynk.server.mongoService.impl;

import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.admin.UserHistoryDTO;
import be.lynk.server.model.entities.Account;
import be.lynk.server.service.AccountService;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import be.lynk.server.module.mongo.MongoDBOperator;
import be.lynk.server.mongoService.MongoSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.mongodb.client.model.Sorts.ascending;

/**
 * Created by florian on 16/10/15.
 */
@Service
public class MongoSearchServiceImpl implements MongoSearchService {

    private final static Long[] ACCOUNT_ID_EXCLUDE_LIST = {1L, 2L, 3L, 51L, 104L, 128L};


    private final static String BY_DEFAULT = "be.lynk.server.controller.rest.SearchRestController.getByDefault";


    @Autowired
    private MongoDBOperator mongoDBOperator;
    @Autowired
    private AccountService  accountService;


    @Override
    public int numberSessionsFrom(LocalDateTime localDateTime) {

        Date from = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());

        DBCursor cursor = mongoDBOperator.getDB().getCollection(BY_DEFAULT)
                                         .find(new BasicDBObject("$and",
                                                                 new BasicDBObject[]{new BasicDBObject("_id", new BasicDBObject("$gt", from))
                                                                         , new BasicDBObject("currentAccountId", new BasicDBObject("$nin", ACCOUNT_ID_EXCLUDE_LIST))})
                                              );

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

    @Override
    public List<UserHistoryDTO> generateUserHistory() {

        List<Account> accounts = accountService.findByRole(RoleEnum.CUSTOMER);


        List<UserHistoryDTO> userHistoryDTOs = new ArrayList<>();
        //load all connection request
        //registration

        //load all default

        //load
        for (Account account : accounts) {

            UserHistoryDTO userHistoryDTO = new UserHistoryDTO();


            userHistoryDTO.setAccountId(account.getId());
            userHistoryDTO.setCreationDate(account.getCreationDate());
            userHistoryDTO.setFacebook(account.getFacebookCredential() != null);


            DBCursor cursor = mongoDBOperator.getDB().getCollection(BY_DEFAULT)
                                             .find(new BasicDBObject("currentAccountId", account.getId()));


            long lastSession = Date.from(account.getCreationDate().atZone(ZoneId.systemDefault()).toInstant()).getTime();
            int nbSession = 1;

            while (cursor.hasNext()) {
                DBObject next = cursor.next();
                if (lastSession > Date.from(account.getCreationDate().atZone(ZoneId.systemDefault()).toInstant()).getTime() * 3600 * 1000) {
                    lastSession = ((Date) next.get("_id")).getTime();
                    nbSession++;
                }
            }

            userHistoryDTO.setNbSessions(nbSession);
        }

        return userHistoryDTOs;
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
