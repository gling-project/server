echo "Run grunt"
grunt
echo "rename package.json"
mv ./../package.json ./../-package.json
git add -A
git commit -m "pre-deploy"

echo ""
echo "Deploy"
git push heroku master

mv ./../-package.json ./../package.json

