package be.lynk.server.service.impl;

import be.lynk.server.model.Position;
import be.lynk.server.model.entities.Address;
import be.lynk.server.model.entities.Business;
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
            address.setPosx(geocoderResponse.getResults().get(0).getGeometry().getLocation().getLat().doubleValue());
            address.setPosy(geocoderResponse.getResults().get(0).getGeometry().getLocation().getLng().doubleValue());
        } catch (IOException e) {
            e.printStackTrace();
            throw new MyRuntimeException("fatal error : " + e.getMessage());
        }
    }

    @Override
    public Map<Business, Long> distanceBetweenAddresses(Address origin, List<Business> destinations) {
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
    public Map<Business, Long> distanceBetweenAddresses(Position origin, List<Business> destinations) {

        Map<Business, Long> map = new HashMap<>();

        for (Business destination : destinations) {
            long l=distance(
                    origin.getX(),
                    origin.getY(),
                    destination.getAddress().getPosx(),
                    destination.getAddress().getPosy(),
                    null).longValue();
            map.put(destination, l);
        }
        return map;


//        return distanceBetweenAddresses(positionToString(origin), destinations);
    }

    private Map<Business, Long> distanceBetweenAddresses(String originString, List<Business> destinations) {

        Map<Business, Long> map = new HashMap<>();

        String[] destinationsString = new String[destinations.size()];
        for (int i = 0; i < destinations.size(); i++) {
            destinationsString[i] = addressToString(destinations.get(i).getAddress());
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


    @Override
    public Double distance(double lat1, double lon1, double lat2, double lon2, Character unit) {
        if(unit==null){
            unit='m';
        }
        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515;
        if (unit == 'K') {
            dist = dist * 1.609344;
        } else if(unit == 'm'){
            dist = dist * 1.609344 * 1000;
        } else if (unit == 'N') {
            dist = dist * 0.8684;
        }
        return (dist);
    }

    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
/*::  This function converts decimal degrees to radians             :*/
/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
    private double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
    }

    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
/*::  This function converts radians to decimal degrees             :*/
/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
    private double rad2deg(double rad) {
        return (rad * 180 / Math.PI);
    }
}
