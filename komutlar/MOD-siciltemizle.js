const kevzyy = require("discord.js")
const db = require("quick.db");
const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json")
const buttons = require('discord-buttons');
const moment = require('moment');
const ms = require('ms');


module.exports.run = async (client, message, args) => {
  
  let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let kayıttarihi = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    moment.locale("tr")

   
    
      if(![ayarlar.üstyetkilirol].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) 
  return message.channel.send(new MessageEmbed()

  .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`${message.author} Bu Komutu Kullanmak İçin Yetkin Bulunmamakta!`)// burayı değiştirebilirsiniz
  .setColor('2f3136')).then(x => x.delete({timeout: 5000}));
  
  var tag = ayarlar.tag
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
  if (!member) return message.channel.send("**Bir Kullanıcı Belirtmelisin!**").then(x => x.delete({timeout: 5000}));
var evethayır = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
        .setColor('#5555dd')
        .setTimestamp()
        .setDescription(`:question: ${member} adlı kullanıcının Sicil verilerini sıfırlamak istiyormusunuz?`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }));
        var evt = new buttons.MessageButton()
        .setStyle('green')
        .setLabel('Evet')
        .setID('evet');
        var hyr = new buttons.MessageButton()
        .setStyle('red')
        .setLabel('Hayır')
        .setID('hayır');
        var row = new buttons.MessageActionRow()
        .addComponents([evt, hyr]);
        if (!message.member.permissions.has(ayarlar.yetkilirol)) {
            evt.setDisabled(true);
            hyr.setDisabled(true);
        };
        return message.channel.send({ embed: evethayır, components: [ row ] }).then(async (s) => {
            var filter = m => m.clicker.user.id == message.author.id;
            var collector = s.createButtonCollector(filter);
            collector.on('collect', async (button) => {
                button.reply.defer();
                if (button.id == "evet") {
db.delete(`sicil.${member.id}`)
db.delete(`ceza.${member.id}`)
                   var embeds = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                    .setFooter(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
                    .setColor('#5555dd')
                    .setTimestamp()
                    .setDescription(`${member} Adlı kullanıcının Sicil verileri sıfırlandı.`)
                    .setThumbnail(button.message.guild.iconURL({ dynamic: true }));
       return s.edit({ embed: embeds }).then(async (sm) => {
                        s.delete({ timeout: 5000 });
                    });
                } else if (button.id == "hayır") {
                                   
                    var embeds = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setColor('#5555dd')
                    .setTimestamp()
                    .setDescription(`İşlem iptal edildi!`)
                    .setThumbnail(button.message.guild.iconURL({ dynamic: true }));
                    return s.edit({ embed: embeds }).then(async (sm) => {
                        s.delete({ timeout: 5000 });
                    });
                }
            });
        });
}
exports.conf = {
    aliases: [""],
    permLevel: 0
};

module.exports.help = {
    name: "sicilverisıfırla",
}
//kevzyy basit register Komut Alıntıdır!