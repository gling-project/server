
insert into account (version,email,firstname,lastname,gender,type,role,lang,sendnotificationbydefault) VALUES
(0,'florian.jeanmart@gmail.com','Florian','Jeanmart','MALE','CUSTOMER','SUPERADMIN','fr',true),
(0,'gil.knops@krings-law.be','Florian','Jeanmart','MALE','CUSTOMER','SUPERADMIN','fr',true),
(0,'greg.malcause@gmail.com','Florian','Jeanmart','MALE','CUSTOMER','SUPERADMIN','fr',true);

insert into logincredential (version,password,account_id) VALUES
(0,'ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R',(select id from account where email = 'greg.malcause@gmail.com')),
(0,'ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R',(select id from account where email = 'gil.knops@krings-law.be')),
(0,'ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R',(select id from account where email = 'florian.jeanmart@gmail.com'));