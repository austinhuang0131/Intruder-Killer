var fs = require('fs'); // require the filesystem module

var Discord = require("discord.js");

var mybot = new Discord.Client();

// Contains all settings
var serverSettings = {};
fs.readdir('./servers/', function(error, files) {
  if (error) {
    throw error; // Must be able to successfuly get the contents of the servers directory else throw an error.
  }
  //loop through the array "files" and read each one.
  for (var i= 0; i < files.length; i++) {
    (function(tmp_i) {
      //read current json file for settings
        fs.readFile('./servers/' + files[tmp_i] + '.json', function(error, data) {
          if (error) {
            console.error(error);
            return;
          }

          // try to parse it
          try {
            serverSettings[files[tmp_i]] = JSON.parse(data); //Parse the settings file and add it to the global var called "serverSettings" with the key being the server ID/file name.
          } catch(e) {
            //throw the error if it fails. I suggest you do a bit of error handling yourself.
            throw e;
          }
        });
    })(i);
  }
  //login with your token
  mybot.loginWithToken('MTg2NTA3NDI2MzAyNzg3NTg0.Ci54XA.56TLsTmZ82V8f3ou7Mx4oi1a6K4', function (error) {
    if (error) {
      throw error;
    }
  });
});

mybot.on('ready', function() {
  console.info('Username: ' + mybot.user.username);
  console.info('ID: ' + mybot.user.id);
  console.info('Servers: ' + mybot.servers.length);
  console.info('Channels: ' + mybot.channels.length);
  console.info('-----------------------------------------------------------------------------');
});

mybot.on("message", function(message){
  if (message.content === "dshset") {
    serverSettings[message.channel.server.id].settings = {}; // create the settings object (top level json object
    serverSettings[message.channel.server.id].settings.whitelisted = message.channel.id; // create the key called "whitelisted" and give it the value of the channel the message was sent form
    // save the settings to a file
    fs.writeFile('./servers/' + message.channel.server.id + '.json', JSON.stringify(serverSettings[message.channel.server.id]), function(error) {
      if (error) {
        console.error(error);
        return;
      }
    });
  }
  else if (message.content === "dshremove") {
    delete serverSettings[message.channel.server.id]; // remove the data from serverSettings
    //Delete the file containing the settings
    fs.unlink('./servers/' + message.channel.server.id + '.json', function(error) {
      if (error) {
        console.error(error);
        return;
      }
    });
  }
});

var interruptedAlready = false;
process.on('SIGINT', function() {
  if(interruptedAlready) {
    console.log("Caught second interrupt signal... Exiting");
    process.exit(0);
  }

  interruptedAlready = true;

  console.log("Caught interrupt signal... Disconnecting");

  bot.logout();
});