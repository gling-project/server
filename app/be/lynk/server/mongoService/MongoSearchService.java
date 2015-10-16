package be.lynk.server.mongoService;

import java.time.LocalDateTime;

/**
 * Created by florian on 16/10/15.
 */
public interface MongoSearchService {

    public int numberSessionsFrom(LocalDateTime localDateTime);
}
