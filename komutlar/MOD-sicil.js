const kevzyy = require("discord.js")
const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json")
const db = require("quick.db");
const moment = require('moment');
const ms = require('ms');


module.exports.run = async (client, message, args) => {
  
      if(![ayarlar.yetkilirol].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) 
  return message.channel.send(new MessageEmbed()

  .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`${message.author} Bu Komutu Kullanmak İçin Yetkin Bulunmamakta!`)// burayı değiştirebilirsiniz
  .setColor('2f3136')).then(x => x.delete({timeout: 5000}));
  
   let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author
  if (!member) return message.channel.send("**Bir Kullanıcı Belirtmelisin!**").then(x => x.delete({timeout: 5000}));
  let kontrol = await db.has(`sicil.${member.id}`)
  if (kontrol === false) return message.channel.send("**Görünürde Sicil Verisi Bulunmuyor!**").then(x => x.delete({timeout: 5000}));

  let data = await db.get(`sicil.${member.id}`)
  let sayı = await db.get(`ceza.${member.id}`)
  let isimler = data.length > 0 ? data.map((value, index) => `${index + 1}. **(${value.Ceza})** Cezasıyla \`${value.Tarih}\` Adlı Tarihte **Yargılanmış!** (<@!${value.Hammer}>)  `).join(`\n`)  : "Bu üyenin sicil verisi bulunamadı!";

  const embed = new MessageEmbed()
  .setTitle(`${member.user.username} Adlı Kullanıcının toplamda ${sayı} sicil verisi bulundu:`)
  .setDescription(`${isimler}`)
  .setColor("ffffff")
 return message.channel.send(embed)
 
}
exports.conf = {
    aliases: [""],
    permLevel: 0
};

module.exports.help = {
    name: "sicil"
}
//kevzyy basit register Komut Alıntıdır!