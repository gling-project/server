#launch test
protractor test.js

export PGPASSWORD='florian';

# ENVIRONMENTS
LOCAL="psql -h 127.0.0.1 -U florian -d lynk -w"

DB_CONNECTION=$LOCAL

echo "delete from session WHERE  account_id  = (select id from account where email ='john@snow.com' or email = 'paul@fire.com')" | eval $DB_CONNECTION
echo "delete from account_customerinterest WHERE  account_id  = (select id from account where email ='john@snow.com' or email = 'paul@fire.com')" | eval $DB_CONNECTION
echo "delete from logincredential where account_id = (select id from account where email ='john@snow.com' or email = 'paul@fire.com')" | eval $DB_CONNECTION
echo "delete from address WHERE  account_id  = (select id from account where email ='john@snow.com' or email = 'paul@fire.com')" | eval $DB_CONNECTION
echo "delete from account where email ='john@snow.com' or email = 'paul@fire.com'" | eval $DB_CONNECTION

