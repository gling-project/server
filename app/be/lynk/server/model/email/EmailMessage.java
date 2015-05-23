package be.lynk.server.model.email;

import java.util.ArrayList;
import java.util.List;

public class EmailMessage {

    private List<Recipient> recipients;
    private final List<String> ccAddresses = new ArrayList<>();
    private String subject;
    private String content;
    private String replyTo;


    public EmailMessage(Recipient recipients, String subject, String content) {
        this.recipients = new ArrayList<>();
        this.recipients.add(recipients);
        this.subject = subject;
        this.content = content;
    }

    public EmailMessage(String replyTo, Recipient recipients, String subject, String content) {
        this.recipients = new ArrayList<>();
        this.recipients.add(recipients);
        this.subject = subject;
        this.content = content;
        this.replyTo=replyTo;
    }

    public EmailMessage(String replyTo, List<Recipient> recipients, String subject, String content) {
        this.replyTo = replyTo;
        this.recipients = recipients;
        this.subject = subject;
        this.content = content;
    }

    public void addCcAddress(String email) {
        this.ccAddresses.add(email);
    }

    public List<String> getCcAddresses() {
        return ccAddresses;
    }

    public void addRecipient(List<Recipient> admins) {
        recipients.addAll(admins);
    }

    public List<Recipient> getRecipients() {
        return recipients;
    }

    public void setRecipients(List<Recipient> recipients) {
        this.recipients = recipients;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "EmailMessage{" +
                "recipients='" + recipients + '\'' +
                ", subject='" + subject + '\'' +
                ", content='" + content + '\'' +
                '}';
    }

    public String getReplyTo() {
        return replyTo;
    }

    public void setReplyTo(String replyTo) {
        this.replyTo = replyTo;
    }


    public static class Recipient{

        private final String email;
        private final String name;
        private final RecipientTypeEnum type;

        public Recipient(String email) {
            this.email = email;
            this.name = email;
            this.type= RecipientTypeEnum.TO;
        }

        public Recipient(String email, String name) {
            this.email = email;
            this.name = name;
            this.type= RecipientTypeEnum.TO;
        }

        public Recipient(String email, String name,RecipientTypeEnum type) {
            this.email = email;
            this.name = name;
            this.type=type;
        }

        public RecipientTypeEnum getType() {
            return type;
        }

        public String getEmail() {
            return email;
        }

        public String getName() {
            return name;
        }
    }

    public static enum RecipientTypeEnum{
        TO, BCC, CC
    }
}
