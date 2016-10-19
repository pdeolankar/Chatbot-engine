# hello world! this is a Chatbot-engine
a chat engine repository

To develop a chatbot or chat engine is very easy, for this project I have used node.js,express, mongoDB and jade and 
wit.ai's chatbot support.

There are very few steps that I followed...
Step 1: Create a story on wit.ai, save it, train it and import modules to your local machine.
Step 2: Make a package.json file (here named by packagejson file), install all dependencies needed.
        Some generic dependencies are like, express, body-parser, isomorphic-fetch, jade, mongojs, mongoose, socket.io and etc.
Step 3: Make a server.js file
        this file important mostly because it includes packages, libraries, RESTAPI routes, mongoDB connections and socket io connections.
Step 4: Inside your downloaded wit modules folder their is a file called 'quickstart.js', modify this file according to need.
        All needed methods, callbacks and routes are included here.
Step 5: Create a corresponding mongoDB database.
Step 6: For GUI support (since we will be working on this UI instead of terminal).
        Includes jade and css files.
        Step 6.1: The Speech-to-text feature also is included here.
