#!/bin/bash

# set ORIGIN to current git origin
ORIGIN=$(git remote -v | awk '$1=="origin" && $3=="(push)" {print $2}');
VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g');

rm -fr gh-pages
mkdir gh-pages
cd gh-pages
echo $ORIGIN
# init an empty git repo, checkout branch gh-pages
git init
git remote add origin $ORIGIN
git fetch
git checkout -t origin/gh-pages
ko move 
# commit and push to gh-pages
 git add . -A
 git commit -m "$VERSION"
 git push

