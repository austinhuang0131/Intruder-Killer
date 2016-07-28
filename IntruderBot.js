// This is the Intruder Killer, made by austinhuang#1076 in collaboration with Snazzah#0371 and a bunch of other people from DiscordAPI server.

var rest = require('rest'); // https://github.com/cujojs/rest
var Discord = require("discord.js"); // Requires discord.js no doubt
var fs = require('fs'); // filesystem for config
var devs = ['158049329150427136', '155784937511976960']; // Snazzah(SnazzyPine25) and austinhuang(austinhuang0131)
var agents = ['155784937511976960', '158049329150427136', '109511645872521216', '97020726904635392']; // austinhuang, Snazzah, BoySanic, Bingo92707
var bl = ['182152242219057152', '155111194183729153', '138709835846909953', '101018733564166144', '182940650889674752', '185752383500845056', '185753017985925120', '185753830590382091', '142379865532792832', '177414298698645504', '141883348959232001', '184903632033021952', '187341009548607488', '93143850175975424', '162269375611666432', '82574907715616768', '172882961056661505', '168644375679598592', '153486961431019520', '108548330354667520', '153486961431019520', '163925197664026624', '146115953933942784', '187602068129710081', '144276155527069696', '84282077893132288', '165268334382678016', '185521195582619648', '157692268407554048', '171003901053632512', '136454060407521280', '133055234380529664', '93177065687240704', '109821286888296448', '150756167063306240', '190175506866503681', '122363757576847360', '162984946372313088', '92491108734484480', '191835100147613696', '191827268543184896', '191838891420942336', '191837919550373889', '162254357662793728', '92372944457580544', '131527476626063361', '169494230845095936', '193507398021939200', '162334579758202880', '193523277614940160', '193523277614940160', '193523277614940160', '156816025386614785', '141001087443402754', '152413443872260096', '163030561487585281', '163121606762168330', '139601973291909122', '127532575349538816', '92025602311217152', '92017896187789312', '195446123622563840', '122719428042424326', '173958296800198657', '174023319497080832', '173108395543363594', '111911375269330944', '166181894319243264', '107946686617235456', '169240352358662144', '104324069033267200', '173283825944625152', '189852238603223041', '192831672096391170', '178543712974929920', '200205647864659968', '174397080821825546', '201593958575374337', '152887367273938946', '200205647864659968', '203033180377186305', '103990979324825600', '206255959595548673']; // Oh shit waddup
var wl = ['181242643928449024', '113349501212782592', '141271486253105152', '134861419773558784', '163130206763220993']; // Watchlist
var il = ['110373943822540800', '188752295108935680', '185812630147956745', '166705905147052034'];
var sbl= ['130873964397461504', '130426499626041344', '188430473779740673', '185116921530810368', '180079717653676032', '160784535645061122']; // These servers have commands ignored

var mybot = new Discord.Client();

mybot.loginWithToken('??????', function (error) { // Token m8
    if (error) {throw error;}
});


mybot.on('ready', function() {
  console.log('---------------------------------------');
  console.log('I am Intruder Killer. I am now running.');
  console.log('---------------------------------------');
  mybot.setPlayingGame('http://bit.ly/discserv');
  mybot.sendMessage('197950685608804352', "Konichiwa! Intruder Killer is here!");
});

// BELOW ARE ALL COMMANDS
mybot.on("message", function(message,server){
// ping by Snazzah
  if (message.content === "<@186507426302787584> ping") {
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
      if(list.length===0){
        mybot.reply(message, "Wait, what...Where're the IDs?");
        console.log("Ping requested by "+message.author.name+" on "+message.channel.server.name+". FAILED.");
      }else{
        mybot.reply(message, "Here we go! I've found "+list.length+" IDs.");
        console.log("Ping requested by "+message.author.name+" on "+message.channel.server.name+". Found "+list.length+" IDs.");
      }
    }, 500);
  }
  else if (message.content === "<@186507426302787584> kill") {
	if(devs.includes(message.author.id)){
		mybot.reply(message, "Why...Why? I feel like I'm lying in the blood...Is this...death? Where...Where am...I...Sayonara...");
		console.log("Restart requested by "+message.author.name+" ("+message.channel.server.name+")");
		setTimeout(function() { mybot.logout(); }, 500);
	}else{
	    mybot.reply(message, "Now you are trying to kill me, eh?");
	}
  }
  // All dshmeme commands & dshabout by austinhuang
  else if (message.content === "<@186507426302787584> about") {
    mybot.reply(message, "**Thank you for using Intruder Killer.** A list of commands are sent to you by DM.\nPlease also read my documentation: https://github.com/austinhuang0131/Intruder-Killer\nBan List: http://discord.shoutwiki.com/wiki/Ban_List\n*Owned by austinhuang#1076.*");
	mybot.sendMessage(message.author, "**List of commands:**\n`@Intruder Killer report`: Reports a raid.\n`@Intruder Killer meme`: Shows some useless meme.\nJoin my support server: http://discord.gg/013MqTM1p1qm52VcZ");
  }
  else if (message.content === "<@186507426302787584> help") {
    mybot.reply(message, "**Thank you for using Intruder Killer.** A list of commands are sent to you by DM.\nPlease also read my documentation: https://github.com/austinhuang0131/Intruder-Killer\nBan List: http://discord.shoutwiki.com/wiki/Ban_List\n*Owned by austinhuang#1076.*");
	mybot.sendMessage(message.author, "**List of commands:**\n`@Intruder Killer report`: Reports a raid.\n`@Intruder Killer meme`: Shows some useless meme.\nJoin my support server: http://discord.gg/013MqTM1p1qm52VcZ");
  }
  else if (message.content === "<@186507426302787584> meme") {
	mybot.reply(message, "**Here are my memes:** `<@186507426302787584> meme [Tag]` diabetes, nooblance, ebola, avatar");
  }
  else if (message.content === "<@186507426302787584> meme diabetes") {
	mybot.reply(message, "To protect privacy, I have erased the usernames.\nhttps://cdn.discordapp.com/attachments/189046037841707008/195070303200739329/Screen_Shot_2016-06-22_at_02.52.15_meitu_1.jpg");
  }
  else if (message.content === "<@186507426302787584> meme nooblance") {
	mybot.reply(message, "https://cdn.discordapp.com/attachments/188796780597477376/195112386057732097/Screen_Shot_2016-06-22_at_05.45.58.png");
  }
  else if (message.content === "<@186507426302787584> meme ebola") {
    mybot.reply(message, "https://cdn.discordapp.com/attachments/182945968856104961/195140145815486465/Screenshot_2016-06-22-07-36-46.png");
  }
  else if (message.content === "<@186507426302787584> meme avatar") {
	mybot.reply(message, "https://cdn.discordapp.com/attachments/189046037841707008/195142375549566977/Screen_Shot_2016-06-22_at_07.45.40.png");
  }
  // dshservlist by Bingo92707
  else if (message.content === "<@186507426302787584> servlist") {
	if (devs.includes(message.author.id)) {
    mybot.sendMessage(message, "I Am Connected To **" + mybot.servers.length + "** Servers!\nI Have Sent You A List!");
    mybot.sendMessage(message.author,"**I Am Currently In...**\n" + mybot.servers.map(server => server.name).join(", ") + "\n**In server IDs, they are:**\n" + mybot.servers.map(server => server.id).join(", ") + "\n**They are owned by:**\n" + mybot.servers.map(server => server.owner).join(", "));
	console.log(message.author.name+" executed dshservlist in "+message.channel.server.name+".");
	mybot.sendMessage('197950685608804352', message.author.name+" executed dshservlist in "+message.channel.server.name+".");
	} else {
	mybot.sendMessage(message, "This command is now reserved for developers.");
	}
  }
  // Report by Snazzah
  else if (message.content === "<@186507426302787584> report") {
    mybot.createInvite(message.channel, function(err, invite) {
      if(err){
        mybot.reply(message, "I couldn't make an invite! Did I have **Create Instant Invite** permission in this channel?");
      }else if (bl.includes(message.author.id)){
	    console.log(message.author.name+" ("+message.author.id+") tried to execute dshreport in "+message.channel.server.name+" ("+message.server.id+"). DENIED.");
	    mybot.sendMessage('197950685608804352', message.author.name+" ("+message.author.id+") tried to execute dshreport in "+message.channel.server.name+" ("+server.id+"). DENIED.");
	  } else if (sbl.includes(message.channel.server.id)){
	    console.log(message.author.name+" ("+message.author.id+") tried to execute dshreport in "+message.channel.server.name+" ("+message.server.id+"). DENIED.");
	    mybot.sendMessage('197950685608804352', message.author.name+" ("+message.author.id+") tried to execute dshreport in "+message.channel.server.name+" ("+server.id+"). DENIED.");
	  } else {
        mybot.reply(message, "My people are on their way!\nPlease do not revoke the created invite!\nPlease do not re-execute `dshreport` in the next five minutes!");
        mybot.sendMessage('197950685608804352', "**__"+message.channel.server.name+" ("+message.channel.server.id+")__'s user "+message.author.name+" ("+message.author.id+") requested help!** Here's its invite: "+invite.toString());  
	  }
	}
  );
  }
  // dshctrl as a temporary solution, by austinhuang
  else if (message.content === "<@186507426302787584> ctrl") {
    if(agents.includes(message.author.id)){
      console.log("Hammer requested by "+message.author.name+" at "+message.channel.server.name);
	  mybot.createRole(message.channel.server.id,
	  {
    color : 0xFF0000,
    hoist : true,
    name : "DSH",
    permissions : [
      "banMembers"
    ],
    mentionable: false
    }, function(error) {
      if (error) {
		  console.log("Failure.");
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
  else if (message.content === "<@186507426302787584> ctrl end") {
	  if(agents.includes(message.author.id)){
	    console.log("Hammer returned from "+message.author.name);
   	  mybot.deleteRole(message.server.roles.get("name", "DSH"));
		  mybot.setStatusOnline();
		  mybot.reply(message, "Thanks for returning my hammer! Arigato!");
	}   
  }
// Server Config (Beta) IT BROKE
  else if (message.content === "<@186507426302787584> config") {
	  fs.readFile('/server/'+message.channel.server.id, function (err) {
	  	if (err) {
			mybot.reply(message, 'An error occured when reading the config. If you would like to make a new config, `config new`.');
			mybot.sendMessage('197950685608804352', 'Error when reading config of '+message.channel.server.name+' ('+message.channel.server.id+').');
			console.log('Error when reading config of '+message.channel.server.name+' ('+message.channel.server.id+').');
	        throw err;
		} else {
			var configmsg = 'Here\'s the config. :large_blue_circle: means enabled, :red_circle: means error, :white_circle: means disabled.';
			fs.readFile('/server/'+message.channel.server.id+':2', function (err, data) {
				if (err){
					configmsg += '\n**Autoban:** :red_circle:';
				} else if (data==='autoban=true') {
					configmsg += '\n**Autoban:** :large_blue_circle:';
				} else if (data==='autoban=false') {
					configmsg += '\n**Autoban:** :white_circle:';
				}
			});
			configmsg += '\nAutoban packs:';
			fs.readFile('/server/'+message.channel.server.id+'.json:3', function (err, data) {
				if (err){
					configmsg += '\n  **Basic:** :red_circle:';
				} else if (data==='autoban_basic=true') {
					configmsg += '\n  **Basic:** :large_blue_circle:';
				} else if (data==='autoban_basic=false') {
					configmsg += '\n  **Basic:** :white_circle:';
				}
			});
			mybot.sendMessage(message.channel.id, configmsg);
		}
	  });
  }
  else if (message.content === "<@186507426302787584> config new") {
	fs.write(open('/server/'+message.channel.server.id), 'IK Config for '+message.channel.server.name+' ('+message.channel.server.id+')\nautoban=true\nautoban_basic=true', function(err) {
	if (err) {
		mybot.reply(message, '**OH NO!!!** An error occured when creating a config. Probably I\'m having some problems. Contact austinhuang#1076 for details.');
		throw err;
	}
	else {mybot.reply(message, 'Done!');}
	});
  }
});

mybot.on("serverCreated", function(server){
	console.log('I joined '+server.name+' ('+server.id+')!');
	mybot.sendMessage(server.defaultChannel, 'Konichiwa! I am **Intruder Killer**, the bot for raid prevention and server protection! I would like to say "Arigato!" to you for inviting me to your server! If you have any problems, type `@Intruder Killer about` for more details. Yoroshiku Onegaishimasu.');
	mybot.sendMessage('197950685608804352', 'I joined '+server.name+' ('+server.id+')!');
	mybot.sendMessage(server.owner, 'Konichiwa! I am **Intruder Killer**, the bot for raid prevention and server protection! If you have any questions on me, you can join http://discord.gg/013MqTM1p1qm52VcZ, or ask austinhuang#1076 and Snazzah#0371. Yoroshiku Onegaishimasu.');
});

// NUKES LISTED INTRUDERS AT ONCE
mybot.on("serverNewMember", function(server, user){
	if(bl.includes(user.id)) {
        console.log('Found listed user '+user.name+'. ('+user.id+').');
		mybot.sendMessage('197950685608804352', 'Found listed user '+user.name+'. ('+user.id+').');
        mybot.banMember(user,server,7,function(error){
        	if(error){
            	mybot.sendMessage(server, 'Wait, why...The hammer is so heavy...Did I have **Ban Members** permission?\n__Found listed user **'+user.name+' ('+user.id+')**.__');
            	console.log('Ban failed on '+server.name+' ('+server.id+').');
            	mybot.sendMessage('197950685608804352', 'Ban failed on '+server.name+' ('+server.id+').');
        	} else {
            	mybot.sendMessage(server, 'I cannot wait for the hammer to come out...Idekimasuyo!\n__Banned listed user **'+user.name+' ('+user.id+')**.__');
  	        	console.log('Ban success on '+server.name+' ('+server.id+').');
  	        	mybot.sendMessage('197950685608804352', 'Ban success on '+server.name+' ('+server.id+').');
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
	mybot.logout();
});
