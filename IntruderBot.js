// This is the Intruder Killer, made by austinhuang#1076 in collaboration with Bingo92707#2447, Nathanael#6757, and a bunch of other people from DiscordAPI server.
// Without doubt, this bot needs Discord.js
// Need Rest.js too. https://github.com/cujojs/rest

var Discord = require("discord.js");
var rest = require('rest')

var mybot = new Discord.Client();

mybot.on("message", function(message){
  if (message.content === "dshset") {
    var serverSettings.serverID = message.channel.id;
    fs.writeFile('./servers/' + serverID + '.json', serverSettings["serverID"], function(error) {
    if (error) {
      console.error(error);
      return;
    }
  });
}
});

// This is the dshreport command. No need to change here.
mybot.on("message", function(message){
    if(message.content === "dshreport") {
        mybot.reply(message, "**Mute the intruder first**, fill our form, then execute ban. (If you have a Mee6, you can ban the intruder first.) https://goo.gl/forms/SJ86rcxgWWSkwnZk2");
    }
});

// This is the module that fetches ban list from my wiki. Thanks Snazzah#0371/SnazzyPine25.
function hasBan(userid) {
  var list = []
  rest('http://discord.shoutwiki.com/wiki/Ban_List').then(function(response) {
    var templist = response.split('<table class="wikitable">')[1].split('<td>');
    templist.forEach(function(item, index){
      if(!isNaN(Number(item))){
        list.push(item)
      }
    });
  });
  return list.includes(userid)
}

mybot.on("serverNewMember", function(server, user){
  var blacklistID = ['182152242219057152','155111194183729153','138709835846909953','101018733564166144','182940650889674752','185752383500845056','185753017985925120','185753830590382091','163130206763220993','148309181806542849'];
// For customizing your blacklist without reporting it to DSH, put IDs here.
if (hasBan(user.id)||blacklistID[i].includes(user.id)) {
    var message = ``;

    message += `**Blacklisted ID found!**\n`;
    message += `**User:** ${user.name} (#${user.id})\n`;

    mybot.sendMessage(message.channel.id, message);
  }
});

// A token.
mybot.loginWithToken("???");
