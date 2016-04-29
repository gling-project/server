package be.lynk.server.service.impl;

import be.lynk.server.model.email.EmailMessage;
import be.lynk.server.service.EmailSenderService;
import be.lynk.server.util.constants.Constant;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.filter.HTTPBasicAuthFilter;
import com.sun.jersey.multipart.FormDataMultiPart;
import com.sun.jersey.multipart.file.StreamDataBodyPart;
import org.springframework.stereotype.Service;
import play.Configuration;

import javax.ws.rs.core.MediaType;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

/**
 * Created by florian on 13/05/15.
 */
@Service
public class MailgunSenderServiceImpl implements EmailSenderService {


    private final static String MAILGUN_API_KEY = Configuration.root().getString("mailgun.api.key");
    private final static String MAILGUN_DOMAIN  = Configuration.root().getString("mailgun.domain");

    @Override
    public void send(EmailMessage emailMessage) {


        try {
            Client client = Client.create();
            client.addFilter(new HTTPBasicAuthFilter("api", MAILGUN_API_KEY));

            WebResource webResource = client.resource("https://api.mailgun.net/v3/" + MAILGUN_DOMAIN + "/messages");
            FormDataMultiPart formData = new FormDataMultiPart();
            formData.field("from", "Gling noreply <mailgun@" + MAILGUN_DOMAIN + ">");
            if (emailMessage.getReplyTo() != null) {
                formData.field("Reply-To", emailMessage.getReplyTo());
            }

            //TO
            for (EmailMessage.Recipient s : emailMessage.getRecipients()) {
                formData.field(s.getType().name().toLowerCase(), s.getName() + " <" + s.getEmail() + ">");
            }

            //subject
            formData.field("subject", emailMessage.getSubject());
            //content
            formData.field("html", emailMessage.getContent());

//            //attachment
//            if (emailMessage.getAttachments().size() > 0) {
//                formData.field("Content-Type", "multipart/form-data");
//                for (EmailMessage.Attachment attachment : emailMessage.getAttachments()) {
//
//                    String name = attachment.getName() + "." + attachment.getType();
//
//                    FileInputStream fileInputStream = new FileInputStream(attachment.getFile());
//
//                    StreamDataBodyPart bodyPart = new StreamDataBodyPart("inline", fileInputStream, name, MediaType.APPLICATION_OCTET_STREAM_TYPE);
//                    formData.bodyPart(bodyPart);
//                }
//            }


            ClientResponse post = webResource.type(MediaType.MULTIPART_FORM_DATA_TYPE).
                    post(ClientResponse.class, formData);

            if (post.getStatus() != 200) {
                //TODO manage error
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

}
