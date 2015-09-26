insert into translation (creationuser) values ('florian.jeanmart@gmail.com');
insert into translationvalue (content,lang,searchablecontent,translation_id) values ('Les bons comptes font…','fr','les bons comptes font…',(select id from translation order by id desc limit 1));
insert into translationvalue (content,lang,searchablecontent,translation_id) values ('good accounts make…','en','good accounts make…',(select id from translation order by id desc limit 1));

insert into customerinterest (iconname,name,orderindex,translationname_id) values
('money.png','money',21,(select id from translation order by id desc limit 1));

insert into categoryinterestlink (businesscategory_id,customerinterest_id,priority) values
((select id from businesscategory where name = 'servicesprox_findroit_assurances'),(select id from customerinterest where name = 'money'),1),
((select id from businesscategory where name = 'servicesprox_findroit_comptable'),(select id from customerinterest where name = 'money'),1);