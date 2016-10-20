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
You will find a 'node_modules' folder created.
### Create App Story
* Goto https://wit.ai log in and you are ready to create a app, follow the wit.ai's guide https://wit.ai/docs and https://wit.ai/docs/quickstart.
* For this example I have created 2 stories for sunglasses chat queries and another for contactlens chat queries.
* For sunglasses: Type in "User says" textarea for e.g. "What are options for sunglasses of Fastrack brand Aviator type in pink color" and set intent and entities for same.
I have set my 'intent=show' and entities as 'sunglasses=sunglasses', 'sunglassbrand= name_any_brand', 'sunglasstype=Aviator', and 'color=black'.

Now in "Bot executes" add func 'getSunglass', add context 'sunglass', add message in "Bot sends" like 'These are top rated sunglasses of the season!'
and SAVE the story. 
Train the bot to accept different values for a each entity.
* For contact lenses: Type in "user says" textarea for e.g. " I would like to buy contact lens of Aqualens brand  Monthly Disposable type in grey color" and set 'intent=show' (or it can be any other value), for this story I have made entities as 'contactlens=contactlenses', 'contactlensbrand=name_any_brand', 'contactlenscolor=grey', 'contactlenstype=any_type_name'. 

Now in "Bot executes" add func 'getCOntactlens' and add context 'lens', add message in "Bot sends" like 'sure, what number do you prefer? would you like professional help to find good contact lens number for you?'. Now save the story and train the bot to accept different values for a each entity.

Follow the wit guide https://wit.ai/docs/quickstart to clone the app in your project folder (local machine), you will find 'node-wit' folder created. 

Modify quickstart.js file (path: ./node-wit/examples/quickstart.js) by replacing your apps < wit-access-token > with your Wit Server Access token (present under Settings tab).

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

Note:
Since speech-to-text feature is implemented using webkitspeechrecognition api the app would work fully in Google chrome only(as of now).

