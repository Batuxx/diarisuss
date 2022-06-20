const kevzyy = require("discord.js");
const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json")
const db = require('quick.db');
const buttons = require('discord-buttons');
const moment = require('moment');
exports.run = async (client, message, args) => {
  
   let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let kayıttarihi = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    moment.locale("tr")
  
  var prefix = ayarlar.prefix
  
  
   if(![ayarlar.yetkilirol].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) 
  return message.channel.send(new MessageEmbed()

  .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`${message.author} Bu Komutu Kullanmak İçin Yetkin Bulunmamakta!`)// burayı değiştirebilirsiniz
  .setColor('2f3136')).then(x => x.delete({timeout: 5000}))
  
   
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if (!member) return message.channel.send(`**Bir Kullanıcı Belirtmelisin!**`).then(x => x.delete({timeout: 5000}));// burayı değiştirebilirsiniz
  
    var evethayır = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setColor('#5555dd')
        .setDescription(`Aşağıda Belirtilen Ceza Türlerinden Birini **Seçmelisin!**`)
        var ceza1 = new buttons.MessageButton()
        .setStyle('blurple')
        .setLabel('UnJail')
        .setID('unjail');
  var ceza2 = new buttons.MessageButton()
        .setStyle('blurple')
        .setLabel('UnMute')
        .setID('unmute');
  var ceza3 = new buttons.MessageButton()
        .setStyle('blurple')
        .setLabel('UnBan')
        .setID('unban');
  
        var hyr = new buttons.MessageButton()
        .setStyle('red')
        .setLabel('İptal')
        .setID('hayır');
        var row = new buttons.MessageActionRow()
        .addComponents([ceza1, ceza2,ceza3, hyr]);
        if (!message.member.permissions.has(ayarlar.yetkilirol)) {
            ceza1.setDisabled(true);
          ceza2.setDisabled(true);
          ceza3.setDisabled(true);
            hyr.setDisabled(true);
        };
        return message.channel.send({ embed: evethayır, components: [ row ] }).then(async (s) => {
            var filter = m => m.clicker.user.id == message.author.id;
            var collector = s.createButtonCollector(filter);
            collector.on('collect', async (button) => {
                button.reply.defer();
                if (button.id == "unjail") {
              message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
    .setColor("#ffffff")
        .setFooter(ayarlar.footer)      
  .setDescription(`
 ${member} Adlı Kullanıcı Karantinadan Çıkarıldı!
  
  `))
                  member.roles.set([ayarlar.unregisterrol])
                  member.setNickname(`Kayıtsız`)

                  
                  const log = new kevzyy.MessageEmbed()
.setColor("#ffffff")
.setDescription(`
**${member} Adlı Kullanıcı Karantinadan Çıkarıldı!**

**•** \`Detaylar;\` 

**• Kullanıcı =** ${member}-\`( ${member.id} )\`
**• Yetkili =** ${message.author}-\`( ${message.author.id} )\`
**• Tarih =** ${kayıttarihi}
`)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setFooter(ayarlar.footer)
client.channels.cache.get(ayarlar.jaillog).send(log)
                  var embeds = new MessageEmbed()
.setColor('BLACK')
.setDescription(`.`)

                return s.edit({ embed: embeds }).then(async (sm) => {
                        s.delete({ timeout: 1 });
                    });
                } else if (button.id == "unmute") {
                     message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
                                                .setColor("#ffffff")
        .setFooter(ayarlar.footer)  
  .setDescription(`
 ${member} Adlı Kullanıcının Mutesi Kaldırıldı!
  
  `))
                  member.roles.remove(ayarlar.muterol)        
 
                  
                  const log = new kevzyy.MessageEmbed()
.setColor("#ffffff")
.setDescription(`
**${member} Adlı Kullanıcının Mutesi Kaldırıldı!**

**•** \`Detaylar;\` 

**• Kullanıcı =** ${member}-\`( ${member.id} )\`
**• Yetkili =** ${message.author}-\`( ${message.author.id} )\`
**• Tarih =** ${kayıttarihi}
`)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setFooter(ayarlar.footer)
client.channels.cache.get(ayarlar.mutelog).send(log)
                  var embeds = new MessageEmbed()
.setColor('BLACK')
.setDescription(`.`)

                return s.edit({ embed: embeds }).then(async (sm) => {
                        s.delete({ timeout: 1 });
                    });
                } else if (button.id == "unban") {
                     message.channel.send(new MessageEmbed()
                                                .setColor("#ffffff")
        .setFooter(ayarlar.footer)  
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`
 ${member} Adlı Kullanıcının Yasağı Kaldırıldı!
  
  `))
                      await message.guild.members.unban(member)
                  
                  
                  const log = new kevzyy.MessageEmbed()
.setColor("#ffffff")
.setDescription(`
**${member} Adlı Kullanıcının Sunucu Yasağı Kaldırıldı!**

**•** \`Detaylar;\` 

**• Kullanıcı =** ${member}-\`( ${member.id} )\`
**• Yetkili =** ${message.author}-\`( ${message.author.id} )\`
**• Tarih =** ${kayıttarihi}
`)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setFooter(ayarlar.footer)
client.channels.cache.get(ayarlar.banlog).send(log)
                  var embeds = new MessageEmbed()
.setColor('BLACK')
.setDescription(`.`)

                return s.edit({ embed: embeds }).then(async (sm) => {
                        s.delete({ timeout: 1 });
                    });
                
                }  else if (button.id == "hayır") {
                                   
                    var embeds = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                    .setFooter(member.user.username,member.user.displayAvatarURL({ dynamic: true }))
                    .setColor('#5555dd')
                    .setTimestamp()
                    .setDescription(`Ceza Kaldırma İşlemi iptal edildi!`)
                    return s.edit({ embed: embeds }).then(async (sm) => {
                        s.delete({ timeout: 5000 });
                    });
                }
                
  
  
   });
        });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0
};

exports.help = {
  name: 'cezakaldır',
};