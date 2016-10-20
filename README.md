# Chatbot-engine

## Overview
A simple chatbot developed using node js, express, mongoDB and wit.ai's chatbot support.
Includes Text-to-text and Speech-to-text feature too.

#### Note:  
This is a spectacles chatbot example application which works with sunglasses and contact lens data, few parts of the code are
generic in nature. One can review the code carefully and with  few changes you can have your own customized chat engine.

## Stack
* node.js
* express
* RestAPI
* MongoDB
* jade
* socket.io

## Installation
Preferably use system having pre installed node js and mongoDB.

```javascript
git clone https://github.com/pdeolankar/Chatbot-engine
cd Chatbot-engine	
npm install
```

### Database
To create a spectacles database,
run the lines of code from mongodb_records_code file
* Make a mongo database (db name used in this example 'myappdb')
* A document for contactlens and sunglasses records.

Here mongoose is used for interaction with database and
mongojs node.js module for MongoDB.

#### Schema
The appcontactlens.js and appsunglass.js files are the two schemas used.

#### Run
Running on local machine
```javascript
node server.js
```
Open in browser: localhost:9001 or YOUR_IP_ADDRESS:9001

NOTE: Since speech-to-text feature is implemented using webkitspeechrecognition api the app would work fully in Google chrome only(as of now).
