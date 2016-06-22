// This is the Intruder Killer, made by austinhuang#1076 in collaboration with Bingo92707#2447, Nathanael#6757, and a bunch of other people from DiscordAPI server.
// Without doubt, this bot needs Discord.js
// Need Rest.js too. https://github.com/cujojs/rest

var fs = require('fs'); // require the filesystem module
var Discord = require("discord.js"); // Requires discord.js no doubt
// var rest = require('rest'); If you need the auto fetch feature.
var blacklistID = ['182152242219057152','155111194183729153','138709835846909953','101018733564166144','182940650889674752','185752383500845056','185753017985925120','185753830590382091','163130206763220993','148309181806542849','142379865532792832','177414298698645504','141883348959232001','184903632033021952','155784937511976960'];
// For customizing your blacklist without reporting it to DSH, put IDs here.
var devs = ['96676726397997056', '158049329150427136', '155784937511976960'] // Insert your ID here to kill the bot from discord.


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
  else if (message.content === "dshkill") {
	if(devs.includes(message.author.id)){
		mybot.sendMessage(message.id, "Killing bot...");
		console.info("Restart requested by "+message.author.name);
		setTimeout(function() { mybot.logout(); }, 500);
		}
	}
  else if (message.content === "dshping") {
    if(rest!=undefined){
    var list = [];
    rest('http://discord.shoutwiki.com/wiki/Ban_List').then(function(response) {
    var templist = response.entity.split('<table class="wikitable">')[1].split('<td>').join('').split('</td>');
      templist.forEach(function(item, index){
        if(!isNaN(Number(item))){
          list.push(String(Number(item)));
        }
      });
    });
    setTimeout(function() {
      if(list.length==0){
        mybot.reply(message, "Failed to get IDs.");
        console.info("Testing connections. Failed to get IDs.");
      }else{
        mybot.reply(message, "Success in testing connections. Found "+list.length+" IDs");
        console.info("Testing connections. Found "+list.length+" IDs");
      }
    }, 500);
    }else{
    	mybot.reply(message, "Rest was not found!");
    }
  }
  else if (message.content === "dshabout") {
    mybot.reply(message, "**Thank you for using Intruder Killer.** This bot is made by austinhuang and Snazzah. The ban list is managed by austinhuang and contributed by public. Having any questions, please join my server: https://discord.gg/013MqTM1p1qm52VcZ");
  }
  else if (message.content === "dshreport") {
    mybot.createInvite(message.channel, function(err, invite) {
      if(err){
        mybot.reply(message, "I couldn't make a invite! Did you give me **Create Instant Invite** permissions in the current channel?");
      }else{
        mybot.reply(message, "Agents are on their way! Please do not revoke the created invite!");
        mybot.sendMessage('185813839818784769', "**We got an report from "+message.channel.server.name+"!** Here's its invite: "+invite.toString());
      }
    });
  }
});

// This is the module that fetches ban list from my wiki. Thanks Snazzah#0371/SnazzyPine25. This module is no longer used in the normal script.
// function hasBan(userid) {
//     var list = [];
//     rest('http://discord.shoutwiki.com/wiki/Ban_List').then(function(response) {
//     var templist = response.entity.split('<table class="wikitable">')[1].split('<td>').join('').split('</td>');
//       templist.forEach(function(item, index){
//         if(!isNaN(Number(item))){
//           list.push(String(Number(item)));
//         }
//       });
//     });
//     setTimeout(function() {
//       if(list.length == 0){
//         return hasBan(userid);
//       }else{
//         return list.includes(userid);
//       }
//     }, 500);
// }

mybot.on("serverNewMember", function(server, user){
if(rest!=undefined){ var rested = true }
if (blacklistID.includes(user.id)) or rested and hasBan(user.id) {
    console.info('Seems like I found a bad guy named '+user.name+'! ('+user.id+')');
    server.banmember(user,server,function(error){
      if(error){
        mybot.sendMessage('Error when swinging the ban hammer. Watch out.');
        console.info('Damn Daniel, there is an error when swinging the ban hammer!');
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
