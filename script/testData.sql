

insert into businesscategory (name,translationname) values
('restaurant','--.businesscategory.restaurant'),
('restaurantChiness','--.businesscategory.restaurant.chiness'),
('restaurantJaponaise','--.businesscategory.restaurant.japonese'),
('restaurantCorean','--.businesscategory.restaurant.corean');

update businesscategory set parent_id = (select id from businesscategory where name = 'restaurant') where
name ='restaurantCorean' or
  name ='restaurantJaponaise' or
  name ='restaurantChiness' ;

insert into customerinterest (name,translationname) values
('eat','--.customerinterest.eat'),
('shopping','--.customerinterest.shopping'),
('healthy','--.customerinterest.healthy'),
('sport','--.customerinterest.sport'),
('party','--.customerinterest.party'),
('culture','--.customerinterest.culture');


insert into address (name,street,zip,city,country) VALUES
('My office','rue royale 73','1000','Bruxelles','BELGIUM'),
(null,'rue des sables 12','1000','Bruxelles','BELGIUM'),
(null,'rue charle legrelle 19','1040','Bruxelles','BELGIUM'),
(null,'place des bienfaiteurs 5','1030','Bruxelles','BELGIUM'),
(null,'rue de la paix 14','1420','Braine l''alleux','BELGIUM'),
(null,'Grand-place 1','1000','Bruxelles','BELGIUM'),
(null,'Rue des Plantes 56','1210','Bruxelles','BELGIUM'),
(null,'Avenue Fonsny, 34','1060','Bruxelles','BELGIUM'),
(null,'23, Bd Bischoffsheim','1000','Bruxelles','BELGIUM'),
(null,'Boulevard du Jardin Botanique 20','1035','Bruxelles','BELGIUM'),
(null,',Rue A. Lavallée, 1','1080','Bruxelles','BELGIUM');


insert into account (email,firstname,lastname,male,type,role,lang,dtype) VALUES
('florian.jean@hotmail.fr','Florian','Jeanmart',true,'CUSTOMER','CUSTOMER','fr','CustomerAccount'),
('info@boucherie.com','Boucher','Le',true,'BUSINESS','BUSINESS','fr','BusinessAccount'),
('info@fleur.com','fleur','La',false,'BUSINESS','BUSINESS','en','BusinessAccount'),
('info@retauranttai.com','retauranttai','Le',true,'BUSINESS','BUSINESS','fr','BusinessAccount'),
('info@pneu.com','pneu','Le',true,'BUSINESS','BUSINESS','fr','BusinessAccount'),
('info@vin.com','Vin','Le',true,'BUSINESS','BUSINESS','fr','BusinessAccount'),
('info@coiffeur.com','coiffeur','Le',true,'BUSINESS','BUSINESS','fr','BusinessAccount'),
('info@theatre.com','theatre','Le',true,'BUSINESS','BUSINESS','fr','BusinessAccount'),
('info@pharmacie.com','pharmacie','Le',true,'BUSINESS','BUSINESS','fr','BusinessAccount'),
('info@legume.com','legume','Le',true,'BUSINESS','BUSINESS','fr','BusinessAccount'),
('info@fringue.com','fringue','Le',true,'BUSINESS','BUSINESS','fr','BusinessAccount');

insert into account_address (account_id,addresses_id) VALUES
((select id from account where email = 'florian.jean@hotmail.fr'),(select id from address where street = 'rue royale 73'));

insert into facebookcredential (userid,account_id) VALUES
('10205683388500133',(select id from account where email = 'florian.jean@hotmail.fr'));

insert into logincredential (password,keepsessionopen,account_id) VALUES
('oRMBidojKYGZ4TotfEZvshc6eB6MIhvlU6eil0h7BlFWy3GeSFFzTJFW1R8m7BC2',false,(select id from account where email = 'info@boucherie.com')),
('oRMBidojKYGZ4TotfEZvshc6eB6MIhvlU6eil0h7BlFWy3GeSFFzTJFW1R8m7BC2',false,(select id from account where email = 'info@fleur.com')),
('oRMBidojKYGZ4TotfEZvshc6eB6MIhvlU6eil0h7BlFWy3GeSFFzTJFW1R8m7BC2',false,(select id from account where email = 'info@retauranttai.com')),
('oRMBidojKYGZ4TotfEZvshc6eB6MIhvlU6eil0h7BlFWy3GeSFFzTJFW1R8m7BC2',false,(select id from account where email = 'info@pneu.com')),
('oRMBidojKYGZ4TotfEZvshc6eB6MIhvlU6eil0h7BlFWy3GeSFFzTJFW1R8m7BC2',false,(select id from account where email = 'info@vin.com')),
('oRMBidojKYGZ4TotfEZvshc6eB6MIhvlU6eil0h7BlFWy3GeSFFzTJFW1R8m7BC2',false,(select id from account where email = 'info@coiffeur.com')),
('oRMBidojKYGZ4TotfEZvshc6eB6MIhvlU6eil0h7BlFWy3GeSFFzTJFW1R8m7BC2',false,(select id from account where email = 'info@theatre.com')),
('oRMBidojKYGZ4TotfEZvshc6eB6MIhvlU6eil0h7BlFWy3GeSFFzTJFW1R8m7BC2',false,(select id from account where email = 'info@pharmacie.com')),
('oRMBidojKYGZ4TotfEZvshc6eB6MIhvlU6eil0h7BlFWy3GeSFFzTJFW1R8m7BC2',false,(select id from account where email = 'info@legume.com')),
('oRMBidojKYGZ4TotfEZvshc6eB6MIhvlU6eil0h7BlFWy3GeSFFzTJFW1R8m7BC2',false,(select id from account where email = 'info@fringue.com'));

insert into business (name,description,phone,account_id,address_id) VALUES
('Boucherie sansot','meilleur boucherie du coin !','0478.123.435',(select id from account where email = 'info@boucherie.com'),(select id from address where street = 'rue des sables 12')),
('Fleuriste belle plante','Vend des fleures et des plantes','0474.345.234',(select id from account where email = 'info@fleur.com'),(select id from address where street = 'rue charle legrelle 19')),
('Retaurant Larmes du panda','Spécialité thai et chinoise','0478.234.453',(select id from account where email = 'info@retauranttai.com'),(select id from address where street = 'place des bienfaiteurs 5')),
('Pneu et parchoque','Tout pour votre voiture','0478.324.435',(select id from account where email = 'info@pneu.com'),(select id from address where street = 'rue de la paix 14')),
('Vins et spiritueux','Le meilleur du terroire','0324.123.435',(select id from account where email = 'info@vin.com'),(select id from address where street = 'Grand-place 1')),
('Coiffure choc','Pour épater vos amis','0478.125.435',(select id from account where email = 'info@coiffeur.com'),(select id from address where street = 'Rue des Plantes 56')),
('Théatre du pardessus','Venez découvrir notre nouvelle saison pleins de superbes spectacles','0478.724.435',(select id from account where email = 'info@theatre.com'),(select id from address where street = 'Avenue Fonsny, 34')),
('Pharmacie sans soucis','plains de médoc','0478.123.435',(select id from account where email = 'info@pharmacie.com'),(select id from address where street = '23, Bd Bischoffsheim')),
('Légume du soleil','Tout est bio !','0478.123.435',(select id from account where email = 'info@legume.com'),(select id from address where street = 'Boulevard du Jardin Botanique 20')),
('Vêtements pour petits et grands','...et grands enfants!','0478.123.435',(select id from account where email = 'info@fringue.com'),(select id from address where street = ',Rue A. Lavallée, 1'));

insert into storedfile (isimage,originalname,storedname,account_id) VALUES
(true,'poulet-6-1.jpg','poulet-6-1.jpg',(select id from address where street = 'rue des sables 12'));

insert into promotion (description,quantity,minimalquantity,unit,price,startdate,enddate,business_id,storedfile_id) values
('poulets rotis',12,1,null,5.5,'2015-05-22 12:00','2015-06-22 12:00',(select id from business where name = 'Boucherie sansot'),(select id from storedfile where storedname = 'poulet-6-1.jpg')),
('Chaussures neuves',100,1,null,134,'2015-05-22 12:00','2015-05-25 14:00',(select id from business where name = 'Vêtements pour petits et grands'),null);