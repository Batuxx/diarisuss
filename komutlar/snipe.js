const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');

exports.run = async(client, message, args) => {

    if(![ayarlar.yetkilirol].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**Yetki Yetersiz!**")

    let embed = new MessageEmbed().setColor("#ffffff").setAuthor(message.member.nickname, message.author.avatarURL());
    let data = db.get(`snipe.${message.guild.id}`);
    if(!data) return message.channel.send("**Mesaj Bulunmuyor!**")
    message.channel.send(embed.setDescription(`
    \`• Yazan Kişi:\` <@!${data.mesajyazan}>
    \`• Mesaj:\` (**${data.mesaj}**)
    \`• Silinme Tarihi:\` ${moment.duration(Date.now() - data.starihi).format("D [gün], H [saat], m [dakika], s [saniye]")}
`)).then(x => x.delete({timeout: 15000}));
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'snipe',
}