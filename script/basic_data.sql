
insert into account (email,firstname,lastname,gender,type,role,lang,dtype,sendnotificationbydefault) VALUES
('florian.jeanmart@gmail.com','Florian','Jeanmart','MALE','CUSTOMER','SUPERADMIN','fr','Account',true),
('gil.knops@krings-law.be','Florian','Jeanmart','MALE','CUSTOMER','SUPERADMIN','fr','Account',true),
('greg.malcause@gmail.com','Florian','Jeanmart','MALE','CUSTOMER','SUPERADMIN','fr','Account',true);

insert into logincredential (password,keepsessionopen,account_id) VALUES
('ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R',false,(select id from account where email = 'greg.malcause@gmail.com')),
('ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R',false,(select id from account where email = 'gil.knops@krings-law.be')),
('ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R',false,(select id from account where email = 'florian.jeanmart@gmail.com'));