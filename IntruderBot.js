// This is the Intruder Killer, made by austinhuang#1076 in collaboration with Snazzah#0371 and a bunch of other people from DiscordAPI server. The bot is currently run by Edelin3#7134.

var rest = require('rest'); // https://github.com/cujojs/rest
var Discord = require("discord.js"); // Requires discord.js no doubt
var devs = ['???'];
var agents = ['???'];
var bl = ['182152242219057152', '155111194183729153', '138709835846909953', '101018733564166144', '182940650889674752', '185752383500845056', '185753017985925120', '185753830590382091', '163130206763220993', '142379865532792832', '177414298698645504', '141883348959232001', '184903632033021952', '187341009548607488', '93143850175975424', '162269375611666432', '82574907715616768', '172882961056661505', '168644375679598592', '153486961431019520', '108548330354667520', '153486961431019520', '163925197664026624', '146115953933942784', '187602068129710081', '144276155527069696', '84282077893132288', '165268334382678016', '185521195582619648', '157692268407554048', '171003901053632512', '136454060407521280', '133055234380529664', '181242643928449024', '93177065687240704', '109821286888296448', '150756167063306240', '190175506866503681', '122363757576847360', '162984946372313088', '92491108734484480', '191835100147613696', '191827268543184896', '191838891420942336', '191837919550373889', '162254357662793728', '92372944457580544', '131527476626063361', '169494230845095936', '193507398021939200', '162334579758202880', '193523277614940160', '193523277614940160', '193523277614940160', '156816025386614785', '141001087443402754', '152413443872260096', '163030561487585281', '163121606762168330', '139601973291909122', '127532575349538816', '141271486253105152', '92025602311217152', '92017896187789312', '134861419773558784', '195446123622563840'];

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
		mybot.sendMessage(message.id, "Why...Why? I feel like I'm lying in the blood...Is this...death? Where...Where am...I...Sayonara...");
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
	} else {
	  mybot.reply(message, "Want my hammer? How about swinging my hammer at...you?");	
	}
  }
  else if (message.content === "dshctrlend") {
	  if(agents.includes(message.author.id)){
	    console.info("Hammer returned from "+message.author.name);
   	  mybot.deleteRole(message.server.roles.get("name", "DSH"));
		  mybot.setStatusOnline();
		  mybot.reply(message, "Thanks for returning my hammer! Arigato!");
	}   
  }
});

//function hasBan(userid) {
//    var list = [];
//    rest('http://discord.shoutwiki.com/wiki/Ban_List').then(function(response) {
//      var templist = response.entity.split('<table class="wikitable">')[1].split('<td>').join('').split('</td>');
//      templist.forEach(function(item){
//        if(!isNaN(Number(item))){
//          list.push(String(Number(item)));
//        }
//      });
//    });
//    setTimeout(function() {
//      if(list.length === 0){
//        return hasBan(userid);
//      }else{
//        return list.includes(userid);
//      }
//    }, 500);
//}

mybot.on("serverNewMember", function(server, user){
	var list = [];
    rest('http://discord.shoutwiki.com/wiki/Ban_List').then(function(response) {
    var templist = response.entity.split('<table class="wikitable">')[1].split('<td>').join('').split('</td>');
      templist.forEach(function(item){
        if(!isNaN(Number(item))){
          list.push(String(Number(item)));
        }
      });
    });
    setTimeout(function() {
      if(list.length === 0){
        if(bl.includes(user.id)) {
        console.info('Seems like I found a bad guy named '+user.name+'! ('+user.id+')');
        mybot.banMember(user,server,7,function(error){
          if(error){
            mybot.sendMessage('Wait, what...I got **an error** when swinging the ban hammer? Did I have **ban members** permission?');
            console.info('Ban failed on '+server.name);
          } else {
            mybot.sendMessage(server, "I cannot wait for the hammer to come out...Idekimasuyo!");
  	        console.info('And he is banned from that server!');
	        }
        });
        }
      }
      else
      return list.includes(user.id);
      if (list.includes(user.id)) {
        console.info('Seems like I found a bad guy named '+user.name+'! ('+user.id+')');
        mybot.banMember(user,server,7,function(error){
          if(error){
            mybot.sendMessage('Wait, what...I got **an error** when swinging the ban hammer? Did I have **ban members** permission?');
            console.info('Ban failed on '+server.name);
          } else {
            mybot.sendMessage(server, "I cannot wait for the hammer to come out...Idekimasuyo!");
  	        console.info('And he is banned from '+server.name+'!');
	        }
        });
      }
    }, 500);
});
