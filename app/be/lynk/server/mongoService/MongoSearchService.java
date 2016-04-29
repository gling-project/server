package be.lynk.server.mongoService;

import be.lynk.server.dto.PositionDTO;
import be.lynk.server.dto.admin.UserHistoryDTO;
import be.lynk.server.model.entities.CustomerInterest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * Created by florian on 16/10/15.
 */
public interface MongoSearchService {

    public int numberSessionsFrom(LocalDateTime localDateTime);

    List<PositionDTO> getCustomerPosition(LocalDateTime from);

    Map<String, Integer> getInterestVisits(LocalDateTime localDateTime);

    List<UserHistoryDTO> generateUserHistory(LocalDateTime from);
}
