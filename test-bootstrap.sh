# DEV
export PGPASSWORD='florian';
DB_CONNECTION="psql -h 127.0.0.1 -U florian -d lynk -w"

echo "[DROP SCHEMA]"
echo "DROP SCHEMA public CASCADE;" | eval $DB_CONNECTION

echo "[CREATE SCHEMA]"
echo "CREATE SCHEMA public;" | eval $DB_CONNECTION

echo ""
echo "Run the app and press enter"
read dummyVar

# insert DB
echo "[CREATE LANGUAGE]"
eval $DB_CONNECTION < script/basic_data.sql

#import
curl -H "Content-Type: application/json" -X POST -d  '{"email":"florian.jeanmart@gmail.com","password":"password"}' http://lynk-test.herokuapp.com/import_category
curl -H "Content-Type: application/json" -X POST -d  '{"email":"florian.jeanmart@gmail.com","password":"password"}' http://lynk-test.herokuapp.com/import_demo

echo "Done !"
