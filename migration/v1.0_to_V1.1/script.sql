insert into translation (creationuser) values ('florian.jeanmart@gmail.com');
insert into translationvalue (content,lang,searchablecontent,translation_id) values ('Les bons comptes font…','fr','les bons comptes font…',(select id from translation order by id desc limit 1));
insert into translationvalue (content,lang,searchablecontent,translation_id) values ('good accounts make…','en','good accounts make…',(select id from translation order by id desc limit 1));

insert into customerinterest (iconname,name,orderindex,translationname_id) values
('money.png','money',21,(select id from translation order by id desc limit 1));

insert into categoryinterestlink (businesscategory_id,customerinterest_id,priority) values
((select id from businesscategory where name = 'servicesprox_findroit_assurances'),(select id from customerinterest where name = 'money'),1),
((select id from businesscategory where name = 'servicesprox_findroit_comptable'),(select id from customerinterest where name = 'money'),1);



update translationvalue set content = 'Expo ou théâtre?' where translation_id =(select translationname_id from customerinterest where name = 'culture') and lang = 'fr';
update translationvalue set content = 'Exhibition or theatre?' where translation_id =(select translationname_id from customerinterest where name = 'culture') and lang = 'en';

update translationvalue set content = 'Fleurs ou plantes?' where translation_id =(select translationname_id from customerinterest where name = 'garden') and lang = 'fr';
update translationvalue set content = 'The green side of life!' where translation_id =(select translationname_id from customerinterest where name = 'garden') and lang = 'en';

update translationvalue set content = 'Les bons comptes font…' where translation_id =(select translationname_id from customerinterest where name = 'money') and lang = 'fr';
update translationvalue set content = 'Good accounts make…' where translation_id =(select translationname_id from customerinterest where name = 'money') and lang = 'en';

insert into categoryinterestlink (businesscategory_id,customerinterest_id,priority) values
((select id from businesscategory where name = 'magasin_loisirs_livres'),(select id from customerinterest where name = 'eat'),1),
((select id from businesscategory where name = 'magasin_loisirs_livres'),(select id from customerinterest where name = 'drink'),1),
((select id from businesscategory where name = 'magasin_loisirs_livres'),(select id from customerinterest where name = 'going_out'),1),
((select id from businesscategory where name = 'magasin_loisirs_livres'),(select id from customerinterest where name = 'culture'),1),
((select id from businesscategory where name = 'magasin_loisirs_livres'),(select id from customerinterest where name = 'clothe'),1),
((select id from businesscategory where name = 'magasin_loisirs_livres'),(select id from customerinterest where name = 'decor'),1),
((select id from businesscategory where name = 'magasin_loisirs_livres'),(select id from customerinterest where name = 'welness'),1),
((select id from businesscategory where name = 'magasin_loisirs_livres'),(select id from customerinterest where name = 'sport'),1),
((select id from businesscategory where name = 'magasin_loisirs_livres'),(select id from customerinterest where name = 'pets'),1),
((select id from businesscategory where name = 'magasin_loisirs_livres'),(select id from customerinterest where name = 'travel'),1),
((select id from businesscategory where name = 'magasin_loisirs_livres'),(select id from customerinterest where name = 'sleep'),1),
((select id from businesscategory where name = 'magasin_loisirs_livres'),(select id from customerinterest where name = 'doityourself'),1),
((select id from businesscategory where name = 'magasin_loisirs_livres'),(select id from customerinterest where name = 'garden'),1),
((select id from businesscategory where name = 'magasin_loisirs_livres'),(select id from customerinterest where name = 'music'),1),
((select id from businesscategory where name = 'magasin_loisirs_livres'),(select id from customerinterest where name = 'technology'),1),
((select id from businesscategory where name = 'magasin_loisirs_livres'),(select id from customerinterest where name = 'play'),1),
((select id from businesscategory where name = 'magasin_loisirs_livres'),(select id from customerinterest where name = 'money'),1);
