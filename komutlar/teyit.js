const kevzyy = require("discord.js")
const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const ayarlar = require("../ayarlar.json")
const moment = require('moment');
const ms = require('ms');


module.exports.run = async (client, message, args) => {
  
  let kadınsayı = await db.get(`${message.author.id}.kadın`)
  let erkeksayı = await db.get(`${message.author.id}.erkek`)
  let toplam = await db.get(`${message.author.id}.toplam`)
  let isim = await db.get(`${message.author.id}.isim`)
  let kayıtsız = await db.get(`${message.author.id}.kayıtsız`)
  
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author
if (!member) return message.channel.send(`**Bir Kullanıcı Belirtmelisin!**`).then(x => x.delete({timeout: 5000}));// burayı değiştirebilirsiniz
  
  const embed = new MessageEmbed()
  .setTitle(`${member.user.username} Kullanıcının Teyit Verisi:`)
  .setDescription(`
  • Toplam Kayıt Verisi: \`${toplam || "0"}\`
  • Toplam Kadın Kayıt Verisi: \`${kadınsayı || "0"}\`
  • Toplam Erkek Kayıt Verisi: \`${erkeksayı || "0"}\`
  • Toplam Kayıtsıza Atma Verisi: \`${kayıtsız || "0"}\`
  • Toplam İsim Değiştirme Verisi: \`${isim || "0"}\``)

  .setColor("ffffff")
  .setFooter("NOT: .teyitverisıfırla Komutuyla Teyit Verilerini Sıfırlayabilirsiniz!")
  message.channel.send(embed)
 
}
exports.conf = {
    aliases: ["sorgu"],
    permLevel: 0
};

module.exports.help = {
    name: "teyit",
}
//kevzyy basit register Komut Alıntıdır!