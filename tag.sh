echo "Tag name : "
read tagName

git tag "$tagName"
git push origin --tags
