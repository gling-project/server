# DEV
export PGPASSWORD='florian';
DB_CONNECTION="psql -h localhost -p 5433 -U florian -d lynk -w"

echo "[DROP SCHEMA]"
echo "DROP SCHEMA public CASCADE;" | eval $DB_CONNECTION

echo "[CREATE SCHEMA]"
echo "CREATE SCHEMA public;" | eval $DB_CONNECTION


echo ""
echo "Deploy"
./deploy.sh

echo "open in navigator"
xdg-open http://lynk-test.herokuapp.com/

echo "wait 1 minute to be sure the database is created"
sleep 60

# insert DB
echo "[CREATE LANGUAGE]"
eval $DB_CONNECTION < script/basic_data.sql

#import
curl -H "Content-Type: application/json" -X POST -d  '{"email":"florian.jeanmart@gmail.com","password":"password"}' https://lynk-test.herokuapp.com/rest/import_category
curl -H "Content-Type: application/json" -X POST -d  '{"email":"florian.jeanmart@gmail.com","password":"password"}' https://lynk-test.herokuapp.com/rest/import_demo

echo "Done !"


export PGPASSWORD='florian';
DB_CONNECTION="heroku pg:psql --app gling-prod HEROKU_POSTGRESQL_BLACK"

heroku pg:psql --app gling-prod HEROKU_POSTGRESQL_BLACK

eval $DB_CONNECTION < script/basic_data.sql