package be.flo.project.service.impl;

import akka.actor.ActorRef;
import akka.actor.ActorSystem;
import akka.actor.Props;
import akka.routing.SmallestMailboxRouter;
import be.flo.project.model.entities.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import play.Configuration;
import be.flo.project.service.EmailService;
import be.flo.project.service.VelocityGeneratorService;
import be.flo.project.util.email.ProjectData;
import be.flo.project.util.email.actors.EmailServiceActor;
import be.flo.project.util.email.messages.EmailMessage;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by florian on 6/12/14.
 */
@Repository
public class EmailServiceImpl implements EmailService {

    //services
    @Autowired
    private VelocityGeneratorService velocityGeneratorService;

    private String projectUrl = Configuration.root().getString("project.url");
    private String projectName = Configuration.root().getString("project.name");

    private final static String VELOCITY_BASIC_EMAIL = "basicEmailStructure.vm";
    public ActorSystem system;
    public ActorRef emailActorRef;

    public EmailServiceImpl() {

        system = ActorSystem.create("awacsystem");
        emailActorRef = system.actorOf(new Props(EmailServiceActor.class).withRouter
                (new SmallestMailboxRouter(1)), "emailService");

    }

    @Override
    public void sendEmail(Account account, String title, String body) {
        sendEmail(account.getEmail(), title, body);
    }

    @Override
    public void sendEmail(String email, String title, String body) {

        //load velocity content
        Map<String, Object> values = new HashMap<>();

        ProjectData projectData = getProjectData();

        body = body.replace("$project.url",projectData.getUrl());
        body = body.replace("$project.name",projectData.getName());

        title = title.replace("$project.url",projectData.getUrl());
        title = title.replace("$project.name",projectData.getName());

        values.put("content", body);
        values.put("project", projectData);

        String velocityContent = velocityGeneratorService.generate(VELOCITY_BASIC_EMAIL, values);

        EmailMessage emailMessage = new EmailMessage(email, title, velocityContent);

        emailActorRef.tell(emailMessage, emailActorRef);
    }


    private ProjectData getProjectData() {

        ProjectData projectData = new ProjectData();

        projectData.setName(projectName);
        projectData.setUrl(projectUrl);

        return projectData;
    }
}
