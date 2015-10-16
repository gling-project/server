package be.lynk.server.mongoService.impl;

import com.mongodb.DBCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import be.lynk.server.module.mongo.MongoDBOperator;
import be.lynk.server.mongoService.MongoSearchService;
import com.mongodb.Block;
import com.mongodb.client.FindIterable;
import org.springframework.beans.factory.annotation.Autowired;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Sorts.ascending;
import static java.util.Arrays.asList;

/**
 * Created by florian on 16/10/15.
 */
public class MongoSearchServiceImpl implements MongoSearchService {

    @Autowired
    private MongoDBOperator mongoDBOperator;


    public void read() {

        DBCursor iterable = mongoDBOperator.getDB().getCollection("restaurants").find();



//        FindIterable<Document> iterable = mongoDBOperator.getDB().
//                getCollection("be.lynk.server.controller.rest.SearchRestController.getByDefault").
//                                                                 find();

    }


}
