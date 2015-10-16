package be.lynk.server.mongoService.impl;

import com.mongodb.DBCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import be.lynk.server.module.mongo.MongoDBOperator;
import be.lynk.server.mongoService.MongoSearchService;
import com.mongodb.Block;
import com.mongodb.client.FindIterable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public void read() {

        DBCursor cursor = mongoDBOperator.getDB().getCollection(BY_DEFAULT).find();

        int total = cursor.size();

        if(cursor.hasNext()){
            //...
        }


//        FindIterable<Document> iterable = mongoDBOperator.getDB().
//                getCollection("be.lynk.server.controller.rest.SearchRestController.getByDefault").
//                                                                 find();

    }


}
