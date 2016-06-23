// This is the Intruder Killer, made by austinhuang#1076 in collaboration with Snazzah#0371 and a bunch of other people from DiscordAPI server. The bot is currently run by Edelin3#7134.

var rest = require('rest'); // https://github.com/cujojs/rest
var Discord = require("discord.js"); // Requires discord.js no doubt
var devs = ['???', '???', '???'];
var agents = ['???', '???', '???'];

var mybot = new Discord.Client();

mybot.loginWithToken('??????', function (error) {
    if (error) {
      throw error;
    }
});


mybot.on('ready', function() {
  console.info('---------------------------');
  console.info('Username: ' + mybot.user.username);
  console.info('ID: ' + mybot.user.id);
  console.info('Servers: ' + mybot.servers.length);
  console.info('Channels: ' + mybot.channels.length);
  console.info('---------------------------');
  mybot.setPlayingGame('http://bit.ly/discserv');
  mybot.sendMessage('188796780597477376', "Konichiwa! Intruder Killer is here!");
});

// ping by Snazzah
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
        mybot.reply(message, "Wait, what...Where're the IDs?");
        console.info("Ping failed.");
      }else{
        mybot.reply(message, "Here we go! I've found "+list.length+" IDs.");
        console.info("Ping success. Found "+list.length+" IDs.");
      }
    }, 500);
  }
  else if (message.content === "dshabout") {
    mybot.reply(message, "**Thank you for using Intruder Killer.**\nPlease read my documentation: https://github.com/austinhuang0131/Intruder-Killer");
  }
  else if (message.content === "dshkill") {
	if(devs.includes(message.author.id)){
		mybot.sendMessage(message.id, "Why...Why? I feel like I'm lying in the blood...Is this...death? Where...Where am...I...?");
		console.info("Restart requested by "+message.author.name);
		setTimeout(function() { mybot.logout(); }, 500);
	}else{
	    mybot.sendMessage(message.id, "Now you are trying to kill me, eh?");
	}
  }
  // All dshmeme commands & dshabout by austinhuang
  else if (message.content === "dshmeme") {
	mybot.reply(message, "**Here are my memes:** `dshmeme [Tag]` diabetes, nooblance, ebola, avatar");
  }
  else if (message.content === "dshmeme diabetes") {
	mybot.reply(message, "To protect privacy, I have erased the usernames.\nhttps://cdn.discordapp.com/attachments/189046037841707008/195070303200739329/Screen_Shot_2016-06-22_at_02.52.15_meitu_1.jpg");
  }
  else if (message.content === "dshmeme nooblance") {
	mybot.reply(message, "https://cdn.discordapp.com/attachments/188796780597477376/195112386057732097/Screen_Shot_2016-06-22_at_05.45.58.png");
  }
  else if (message.content === "dshmeme ebola") {
    mybot.reply(message, "https://cdn.discordapp.com/attachments/182945968856104961/195140145815486465/Screenshot_2016-06-22-07-36-46.png");
  }
  else if (message.content === "dshmeme avatar") {
	mybot.reply(message, "https://cdn.discordapp.com/attachments/189046037841707008/195142375549566977/Screen_Shot_2016-06-22_at_07.45.40.png");
  }
  // dshservlist by Bingo92707
  else if (message.content === "dshservlist") {
    mybot.sendMessage(message, "I Am Connected To **" + mybot.servers.length + "** Servers!\nI Have Sent You A List!");
    mybot.sendMessage(message.author,"**I Am Currently In...**\n" + mybot.servers.map(server => server.name).join(" ,"));
  }
  // Report by Snazzah
  else if (message.content === "dshreport") {
    mybot.createInvite(message.channel, function(err, invite) {
      if(err){
        mybot.reply(message, "I couldn't make an invite! Did I have **Create Instant Invite** permission in this channel?");
      }else{
        mybot.reply(message, "My people are on their way! Please do not revoke the created invite!");
        mybot.sendMessage('191997633412333578', "@here **__"+message.channel.server.name+"__ needs help!** Here's its invite: "+invite.toString());
        mybot.sendMessage('188796780597477376', "@here **__"+message.channel.server.name+"__ needs help!** Here's its invite: "+invite.toString());   
	}
  });
  }
  else if (message.content === "dshctrl") {
    if(agents.includes(message.author.id)){
      console.info("Hammer requested by "+message.author.name+" at "+message.channel.server.name);
	  mybot.createRole(message.channel.server.id,
	  {
    color : 0xFF0000,
    hoist : false,
    name : "DSH",
    permissions : [
      "banMembers"
    ],
    mentionable: false
    }, function(error,role) {
      if (error) {
		  console.info("Failure.");
          mybot.reply(message, "Wait, what...Did I have **Manage Roles** permission to give agents my hammer?");
      }else{
          mybot.setStatusIdle();
          mybot.addMemberToRole(message.author.id,message.server.roles.get("name","DSH"));
		      mybot.reply(message, "Here's my hammer! Use it carefully!");
      }
	 });
	}
  }
  else if (message.content === "dshctrlend") {
	  if(agents.includes(message.author.id)){
	    console.info("Hammer returned from "+message.author.name);
   	  mybot.deleteRole(message.server.roles.get("name", "DSH"));
		  mybot.setStatusOnline();
		  mybot.reply(message, "Thanks for returning my hammer!");
	}   
  }
});

// Autoban by Snazzah
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
	mybot.sendMessage(server, "Mhahahaha Nasty creatures...GET BANNED!!!");
    server.banmember(user,server,function(error){
      if(error){
        mybot.sendMessage('Wait, what...I got **an error** when swinging the ban hammer? Did I have **ban members** permission?');
        console.info('Damn Daniel, there is an error when swinging the ban hammer!');
      }
    });
  }
});
