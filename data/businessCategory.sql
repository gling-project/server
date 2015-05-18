

insert into businesscategory (name,translationname) values
('restaurant','--.businesscategory.restaurant'),
('restaurantChiness','--.businesscategory.restaurant.chiness'),
('restaurantJaponaise','--.businesscategory.restaurant.japonese'),
('restaurantCorean','--.businesscategory.restaurant.corean');

update businesscategory set parent_id = (select id from businesscategory where name = 'restaurant') where
name ='restaurantCorean' or
  name ='restaurantJaponaise' or
  name ='restaurantChiness' ;
