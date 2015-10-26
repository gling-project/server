package be.lynk.server.mongoService;

import be.lynk.server.dto.admin.UserHistoryDTO;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by florian on 16/10/15.
 */
public interface MongoSearchService {

    public int numberSessionsFrom(LocalDateTime localDateTime);

    List<UserHistoryDTO> generateUserHistory();
}
