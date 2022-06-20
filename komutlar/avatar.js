const { MessageEmbed } = require("discord.js");



exports.run = async(client, message, args) => {
  
    const user = message.author

    const embed = new MessageEmbed()
      .setColor("2f3136")
      .setTitle("Avatarın")
      .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }));
    message.channel.send(embed);
  },
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'avatar',
}
