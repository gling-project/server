echo ""
echo "!!! THIS IS PROD VERSION !!! ARE YOU SURE TO CONTINUE ???"
read dummyVar

echo "Run grunt"
grunt
echo "rename package.json"
mv ./package.json ./-package.json
git add -A
git commit -m "pre-deploy"

echo ""
echo "Deploy"
git push heroku-prod master

mv ./-package.json ./package.json

