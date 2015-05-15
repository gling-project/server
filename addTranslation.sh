cd ./public/javascripts/
find . -name "*.*" -not -path "*/target*" -exec grep --no-filename "--" {} \+ | grep -o -P '(?<=--.)[a-z0-9.]*' >> /tmp/props.txt
cd ../../




find . -name "*.html" -not -path "*/target*" -exec grep --no-filename "--" {} \+ | grep -o -P '(?<=--.)[a-z0-9.]*' > /tmp/props.txt
find . -name "*.java" -not -path "*/target*" -exec grep --no-filename "--" {} \+ | grep -o -P '(?<=--.)[a-z0-9.]*' >> /tmp/props.txt

sort /tmp/props.txt | uniq > /tmp/unique.txt
sed -r 's/$/=/g' /tmp/unique.txt > /tmp/propfile.txt