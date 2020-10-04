const restify = require('restify');
const builder = require('botbuilder');
const config = require("./config");

// Setup Restify Server
const server = restify.createServer();

server.listen(config.PORT, () => {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
const bot = new builder.UniversalBot(connector, (session) => {
    session.send("You said: %s", session.message.text);
});


bot.customAction({
    matches: /what time is it?|time/gi,
    onSelectAction: (session, args, next) => {
        // Set reminder...
        session.send("the time is: " +  new Date());
    }
})