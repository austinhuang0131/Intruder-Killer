// This is the Intruder Killer, made by austinhuang#1076 in collaboration with Snazzah#0371, Nathanael#6757, and a bunch of other people from DiscordAPI server.

var rest = require('rest'); // https://github.com/cujojs/rest
var Discord = require("discord.js"); // Requires discord.js no doubt
var devs = ['96676726397997056', '158049329150427136', '155784937511976960']

var mybot = new Discord.Client();

mybot.loginWithToken('??????', function (error) {
    if (error) {
      throw error;
    }
});


mybot.on('ready', function() {
  console.info('-----------------------------------------------------------------------------');
  console.info('Username: ' + mybot.user.username);
  console.info('ID: ' + mybot.user.id);
  console.info('Servers: ' + mybot.servers.length);
  console.info('Channels: ' + mybot.channels.length);
  console.info('-----------------------------------------------------------------------------');
});

mybot.on("message", function(message,server,channel){
  if (message.content === "dshping") {
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
  }
  else if (message.content === "dshabout") {
    mybot.reply(message, "**Thank you for using Intruder Killer.** This bot is made by austinhuang and Snazzah. The ban list is managed by austinhuang and Edelin3, located at http://discord.shoutwiki.com/wiki/Ban_List. Having any questions, please join my server: http://discord.gg/014UYlML7lk1Fb7tB");
  }
  else if (message.content === "dshkill") {
	if(devs.includes(message.author.id)){
		mybot.reply(message, "Killing bot...");
		mybot.logout();
		}
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

function hasBan(userid) {
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
      if(list.length == 0){
        return hasBan(userid);
      }else{
        return list.includes(userid);
      }
    }, 500);
}

mybot.on("serverNewMember", function(server, user){
  if (hasBan(user.id)) {
    console.info('Seems like I found a bad guy named '+user.name+'! ('+user.id+')');
    server.banmember(user,server,function(error){
      if(error){
        mybot.sendMessage('Error when swinging the ban hammer. Watch out.');
        console.info('Damn Daniel, there is an error when swinging the ban hammer!');
      }
    });
  }
});
