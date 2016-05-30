// This is the Intruder Killer, made by austinhuang#1076 in collaboration with Bingo92707#2447, Nathanael#6757, and a bunch of other people from DiscordAPI server.
// Without doubt, this bot needs Discord.js

var Discord = require("discord.js");

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

// This is the new user ID check module.
mybot.on("serverNewMember", function(server, user){
  var blacklistID = ['182152242219057152','155111194183729153','138709835846909953','101018733564166144','182940650889674752','185752383500845056','185753017985925120','185753830590382091','163130206763220993','148309181806542849'];
// Put the USER IDs you want to block here. Note that this only functions when people join.
  for (var i = 0; i < blacklistID.length; i++) {
    if (blacklistID[i] == user.id) {
      var message = ``;

      message += `**Blacklisted ID found!**\n`;
      message += `**User:** ${user.name} (#${user.id})\n`;

      mybot.sendMessage(message.channel.id, message);
    }
  }
});

// A token.
mybot.loginWithToken("???);
