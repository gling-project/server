package be.lynk.server.mongoService.impl;

import be.lynk.server.controller.technical.security.source.SourceEnum;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by flo on 26/02/16.
 */
public class MongoDTO {

    @javax.persistence.Id
    protected Date parsingDate = new Date();

    protected String requestData;

    protected Map<String, String> requestParams = new HashMap<>();

    private Map<String, String[]> headers;

    protected String sessionId;

    @Enumerated(value = EnumType.STRING)
    private SourceEnum device;

    protected Long currentAccountId;

    public Long getCurrentAccountId() {
        return currentAccountId;
    }

    public void setCurrentAccountId(Long currentAccountId) {
        this.currentAccountId = currentAccountId;
    }

    public SourceEnum getDevice() {
        return device;
    }

    public void setDevice(SourceEnum device) {
        this.device = device;
    }

    public Map<String, String[]> getHeaders() {
        return headers;
    }

    public void setHeaders(Map<String, String[]> headers) {
        this.headers = headers;
    }

    public Date getParsingDate() {
        return parsingDate;
    }

    public void setParsingDate(Date parsingDate) {
        this.parsingDate = parsingDate;
    }

    public String getRequestData() {
        return requestData;
    }

    public void setRequestData(String requestData) {
        this.requestData = requestData;
    }

    public Map<String, String> getRequestParams() {
        return requestParams;
    }

    public void setRequestParams(Map<String, String> requestParams) {
        this.requestParams = requestParams;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
}
