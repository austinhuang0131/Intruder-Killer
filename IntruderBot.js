// This is the Intruder Killer, made by austinhuang#1076 in collaboration with Bingo92707#2447, Nathanael#6757, and a bunch of other people from DiscordAPI server.
// Without doubt, this bot needs Discord.js
// Need Rest.js too. https://github.com/cujojs/rest

var fs = require('fs'); // require the filesystem module
var Discord = require("discord.js"); // Requires discord.js no doubt
// var rest = require('rest'); If you need the auto fetch feature.
var blacklistID = ['182152242219057152','155111194183729153','138709835846909953','101018733564166144','182940650889674752','185752383500845056','185753017985925120','185753830590382091','163130206763220993','148309181806542849','142379865532792832','177414298698645504','141883348959232001','184903632033021952','155784937511976960'];
// For customizing your blacklist without reporting it to DSH, put IDs here.


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
      fs.readFile('./servers/' + files[tmp_i], function(error, data) {
        if (error) {
          console.error(error);
          return;
        }

        // try to parse it
        try {
          serverSettings[files[tmp_i]] = JSON.parse(data); //Parse the settings file and add it to the global var called "serverSettings" with the key being the server ID/file name.
        } 
		  catch(e) {
            throw e;
        }
      });
    });
  }
  //login with your token. Please don't steal my token, thank you.
  mybot.loginWithToken('??????', function (error) {
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
    console.log('serverSettings#1: ', serverSettings);
    console.log('serverID: ' + message.channel.server.id);
    console.log('serverSettings#2: ', serverSettings);
    serverSettings[message.channel.id]["settings"]["whitelisted"] = message.channel.server.id; // create the key called "whitelisted" and give it the value of the channel the message was sent form
    console.log('serverSettings[serverID]: ', serverSettings[message.channel.server.id]);
	mybot.reply(message, "Success!");
    // save the settings to a file
    fs.writeFile('./servers/' + message.channel.server.id + '.json', JSON.stringify(serverSettings[message.channel.server.id]), function(error) {
      if (error) {
        console.error(error);
        return;
      }
    });
  }
  else if (message.content === "dshremove") {
    delete serverSettings[message.channel.id]; // remove the data from serverSettings
    //Delete the file containing the settings
	mybot.reply(message, "Success!");
    fs.unlink('./servers/' + message.channel.id + '.json', function(error) {
      if (error) {
        console.error(error);
        return;
      }
    });
  }
});

mybot.on("message", function(message){
    if(message.content === "dshreport") {
        mybot.reply(message, "**Mute the intruder first**, fill our form, then execute ban. (If you have a Mee6, you can ban the intruder first.) https://goo.gl/forms/SJ86rcxgWWSkwnZk2");
    }
});

// This is the module that fetches ban list from my wiki. Thanks Snazzah#0371/SnazzyPine25. This module is no longer used in the normal script.
// function hasBan(userid) {
//  var list = []
//  rest('http://discord.shoutwiki.com/wiki/Ban_List').then(function(response) {
//    var templist = response.split('<table class="wikitable">')[1].split('<td>');
//    templist.forEach(function(item, index){
//      if(!isNaN(Number(item))){
//        list.push(item)
//      }
//    });
//  });
//  return list.includes(userid)
// }

mybot.on("serverNewMember", function(server, user){
if(!isNaN(rest)){ var rested = true }
if (blacklistID.includes(user.id)) || rested && hasBan(user.id) {
    var message = ``;

    message += `**Blacklisted ID found!**\n`;
    message += `**User:** ${user.name} (#${user.id})\n`;

    mybot.sendMessage(message.channel.id, message);
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
