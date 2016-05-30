var Discord = require("discord.js");

var mybot = new Discord.Client();

mybot.on("message", function(message) => {
  if (msg.content.startsWith("dshset")) { //Check for add channel command
    JSON.stringify(serverSettings[serverID]); // add to the global object
    //save the data to a file
    fs.writeFile('./servers/' + serverID + '.json', serverSettings[serverID], function(error) {
    if (error) {
      console.error(error);
      return;
    }
  });
}
});

mybot.on("message", function(message) {
    if(message.content === "dshreport") {
        mybot.reply(message, "**Mute the intruder first**, fill our form, then execute ban. (If you have a Mee6, you can ban the intruder first.) https://goo.gl/forms/SJ86rcxgWWSkwnZk2");
    }
});

mybot.on(`serverNewMember`, (server, user) => {
  var blacklistID = ['182152242219057152','155111194183729153','138709835846909953','101018733564166144','182940650889674752','185752383500845056','185753017985925120','185753830590382091','163130206763220993','148309181806542849'];

  for (var i = 0; i < blacklistID.length; i++) {
    if (blacklistID[i] == user.id) {
      var message = ``;

      message += `**Blacklisted ID found!**\n`;
      message += `**User:** ${user.name} (#${user.id})\n`;

      mybot.sendMessage(message.channel.id, message);
    }
  }
});

mybot.loginWithToken("MTg2NTA3NDI2MzAyNzg3NTg0.CiyiEw.eDojIXeRU29vF5OsyWRd2egVU1A");
