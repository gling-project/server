package be.flo.project.service.impl;

import be.flo.project.model.entities.Session;
import be.flo.project.service.SessionService;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

/**
 * Created by florian on 12/03/15.
 */
@Component
public class SessionServiceImpl extends CrudServiceImpl<Session> implements SessionService {
}
