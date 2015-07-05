
insert into account (email,firstname,lastname,gender,type,role,lang,dtype) VALUES
('florian.jeanmart@gmail.com','Florian','Jeanmart','MALE','CUSTOMER','SUPERADMIN','fr','CustomerAccount'),
('gil.knops@krings-law.be','Florian','Jeanmart','MALE','CUSTOMER','SUPERADMIN','fr','CustomerAccount'),
('greg.malcause@gmail.com','Florian','Jeanmart','MALE','CUSTOMER','SUPERADMIN','fr','CustomerAccount');

insert into logincredential (password,keepsessionopen,account_id) VALUES
('ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R',false,(select id from account where email = 'greg.malcause@gmail.com')),
('ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R',false,(select id from account where email = 'gil.knops@krings-law.be')),
('ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R',false,(select id from account where email = 'florian.jeanmart@gmail.com'));