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
  let kontrol = await db.has(`isimler.${member.id}`)
  if (kontrol === false) return message.channel.send("**Görünürde İsim Verisi Bulunmuyor!**").then(x => x.delete({timeout: 5000}));

  let data = await db.get(`isimler.${member.id}`)
  let sayı = await db.get(`sayı.${member.id}`)
  let isimler = data.length > 0 ? data.map((value, index) => `${index + 1}. \`${value.Tag} ${value.Name} | ${value.Age}\` (<@&${value.Rol}>) (${value.Tür})`).join(`\n`)  : "Bu üyenin isim kayıtı bulunamadı!";

  const embed = new MessageEmbed()
  .setTitle(`${member.user.username} Adlı Kullanıcının toplamda ${sayı} isim kayıtı bulundu:`)
  .setDescription(`${isimler}`)
  .setColor("ffffff")
  .setFooter("NOT: .isimverisıfırla Komutuyla İsim Verilerini Sıfırlayabilirsiniz!")
 return message.channel.send(embed)
 
}
exports.conf = {
    aliases: ["nicks"],
    permLevel: 0
};

module.exports.help = {
    name: "isimler",
}
//kevzyy basit register Komut Alıntıdır!