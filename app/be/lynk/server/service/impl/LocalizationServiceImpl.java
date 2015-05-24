package be.lynk.server.service.impl;

import be.lynk.server.model.Position;
import be.lynk.server.model.entities.Address;
import be.lynk.server.service.LocalizationService;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import com.google.maps.*;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.DistanceMatrixElement;
import com.google.maps.model.DistanceMatrixRow;
import org.springframework.stereotype.Service;
import play.Configuration;
import play.Logger;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by florian on 24/05/15.
 */
@Service
public class LocalizationServiceImpl implements LocalizationService {

    private final static String GOOGLE_API_KEY = Configuration.root().getString("google.api.key");

    @Override
    public boolean validAddress(Address address) {
        return false;
    }

    @Override
    public Map<Address, Long> distanceBetweenAddresses(Address origin, List<Address> destinations) {
        return distanceBetweenAddresses(addressToString(origin), destinations);
    }

    @Override
    public Map<Address, Long> distanceBetweenAddresses(Position origin, List<Address> destinations) {
        return distanceBetweenAddresses(positionToString(origin), destinations);
    }

    private Map<Address, Long> distanceBetweenAddresses(String originString, List<Address> destinations) {

        Map<Address, Long> map = new HashMap<>();


        String[] destinationsString = new String[destinations.size()];
        for (int i = 0; i < destinations.size(); i++) {
            destinationsString[i] = addressToString(destinations.get(i));
        }

        GeoApiContext geoApiContext = new GeoApiContext();
        geoApiContext.setApiKey(GOOGLE_API_KEY);

        DistanceMatrixApiRequest request = DistanceMatrixApi.newRequest(geoApiContext);
        request.origins(originString);
        request.destinations(destinationsString);

        try {
            DistanceMatrix await = request.await();
            int i = 0;
            for (DistanceMatrixRow row : await.rows) {
                for (DistanceMatrixElement element : row.elements) {
                    long distance = element.distance.inMeters;
                    map.put(destinations.get(i), distance);
                    i++;
                }

            }
            return map;

        } catch (Exception e) {
            e.printStackTrace();
            throw new MyRuntimeException(ErrorMessageEnum.GOOGLE_MAP_ERROR);
        }
    }

    private String addressToString(Address address) {
        return address.getStreet() + "," + address.getZip() + "," + address.getCity() + "," + address.getCountry();
    }

    private String positionToString(Position position) {
        return position.getX() + "," + position.getY();
    }
}
