# Meteor-React App Structure Example

## Install Meteor in your local Machine
curl https://install.meteor.com/ | sh

## Install Git
sudo apt-get update
sudo apt-get install git

## Clone repo

## cd to the project folder


## Run app for first time after cloning repo
1. type: 'meteor npm install' to install all NPM packages referenced at package.json
2. type: 'meteor --settings settings.json' to launch the app.
3. open your browser, and in a new tab type: 'localhost:3000'

## Packages included with this project
1. meteor npm install --save-dev eslint eslint-plugin-react eslint-plugin-meteor
eslint-config-airbnb (see guide.meteor.com/code-style.html)
2. see 'guide.meteor.com/code-style.html' to setup ESlint with your IDE
3. meteor npm install --save react react-dom react-mounter react-addons-pure-render-mixin
4. this project contains the following meteor packages: react-meteor-data,
kadira:flow-router, alanning:roles, aldeed:collection2, underscore and
accounts-password
