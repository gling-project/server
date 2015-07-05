package be.lynk.server.service.impl;

import be.lynk.server.model.Position;
import be.lynk.server.model.entities.Address;
import be.lynk.server.service.LocalizationService;
import be.lynk.server.util.exception.MyRuntimeException;
import be.lynk.server.util.message.ErrorMessageEnum;
import com.google.code.geocoder.Geocoder;
import com.google.code.geocoder.GeocoderRequestBuilder;
import com.google.code.geocoder.model.GeocodeResponse;
import com.google.code.geocoder.model.GeocoderRequest;
import com.google.code.geocoder.model.GeocoderStatus;
import com.google.maps.*;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.DistanceMatrixElement;
import com.google.maps.model.DistanceMatrixRow;
import org.springframework.stereotype.Service;
import play.Configuration;
import play.Logger;

import java.io.IOException;
import java.math.BigDecimal;
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
    public void validAddress(Address address) throws Exception {
        final Geocoder geocoder = new Geocoder();
        String addressString = addressToString(address);

        GeocoderRequest geocoderRequest = new GeocoderRequestBuilder()
                .setAddress(addressString)
                .setLanguage("en")
                .getGeocoderRequest();
        try {
            GeocodeResponse geocoderResponse = geocoder.geocode(geocoderRequest);
            if (!geocoderResponse.getStatus().equals(GeocoderStatus.OK)) {
                throw new Exception();
            }
            address.setPosx(geocoderResponse.getResults().get(0).getGeometry().getLocation().getLat());
            address.setPosy(geocoderResponse.getResults().get(0).getGeometry().getLocation().getLng());
        } catch (IOException e) {
            e.printStackTrace();
            throw new MyRuntimeException("fatal error : " + e.getMessage());
        }
    }

    @Override
    public Map<Address, Long> distanceBetweenAddresses(Address origin, List<Address> destinations) {
        return distanceBetweenAddresses(addressToString(origin), destinations);
    }

    @Override
    public Long distanceBetweenAddress(Position origin, Address destination) {

        String destinationsString = addressToString(destination);

        GeoApiContext geoApiContext = new GeoApiContext();
        geoApiContext.setApiKey(GOOGLE_API_KEY);

        DistanceMatrixApiRequest request = DistanceMatrixApi.newRequest(geoApiContext);
        request.origins(positionToString(origin));
        request.destinations(destinationsString);

        try {
            DistanceMatrix await = request.await();
            int i = 0;
            return await.rows[0].elements[0].distance.inMeters;

        } catch (Exception e) {
            e.printStackTrace();
            throw new MyRuntimeException(ErrorMessageEnum.GOOGLE_MAP_ERROR);
        }
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
