package be.lynk.server.service.impl;

import be.lynk.server.model.entities.Session;
import be.lynk.server.service.SessionService;
import org.springframework.stereotype.Component;

/**
 * Created by florian on 12/03/15.
 */
@Component
public class SessionServiceImpl extends CrudServiceImpl<Session> implements SessionService {
}
