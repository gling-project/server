
insert into account (version,email,firstname,lastname,gender,type,role,lang,dtype,sendnotificationbydefault) VALUES
(0,'florian.jeanmart@gmail.com','Florian','Jeanmart','MALE','CUSTOMER','SUPERADMIN','fr','Account',true),
(0,'gil.knops@krings-law.be','Florian','Jeanmart','MALE','CUSTOMER','SUPERADMIN','fr','Account',true),
(0,'greg.malcause@gmail.com','Florian','Jeanmart','MALE','CUSTOMER','SUPERADMIN','fr','Account',true);

insert into logincredential (version,password,keepsessionopen,account_id) VALUES
(0,'ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R',false,(select id from account where email = 'greg.malcause@gmail.com')),
(0,'ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R',false,(select id from account where email = 'gil.knops@krings-law.be')),
(0,'ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R',false,(select id from account where email = 'florian.jeanmart@gmail.com'));