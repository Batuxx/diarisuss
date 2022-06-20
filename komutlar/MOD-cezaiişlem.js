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
    let sebep = args.splice(1).join(" ") || `Sebep girilmemiş!`
    if(!sebep) return message.channel.send("**Bir Sebeb Belirtmelisin!**").then(x => x.delete({timeout: 5000}))
  
    var evethayır = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setColor('#5555dd')
        .setDescription(`\`${sebep}\` Sebebiyle Hangi Ceza Türünü Seçmek İstiyorsun?`)
        var ceza1 = new buttons.MessageButton()
        .setStyle('blurple')
        .setLabel('Jail')
        .setID('jail');
  var ceza2 = new buttons.MessageButton()
        .setStyle('blurple')
        .setLabel('Mute')
        .setID('mute');
  var ceza3 = new buttons.MessageButton()
        .setStyle('blurple')
        .setLabel('Ban')
        .setID('ban');
  var ceza4 = new buttons.MessageButton()
        .setStyle('blurple')
        .setLabel('Kick')
        .setID('kick');
  
        var hyr = new buttons.MessageButton()
        .setStyle('red')
        .setLabel('İptal')
        .setID('hayır');
        var row = new buttons.MessageActionRow()
        .addComponents([ceza1, ceza2,ceza3,ceza4, hyr]);
        if (!message.member.permissions.has(ayarlar.yetkilirol)) {
            ceza1.setDisabled(true);
          ceza2.setDisabled(true);
          ceza3.setDisabled(true);
          ceza4.setDisabled(true);
            hyr.setDisabled(true);
        };
        return message.channel.send({ embed: evethayır, components: [ row ] }).then(async (s) => {
            var filter = m => m.clicker.user.id == message.author.id;
            var collector = s.createButtonCollector(filter);
            collector.on('collect', async (button) => {
                button.reply.defer();
                if (button.id == "jail") {
              message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
    .setColor("#ffffff")
        .setFooter(ayarlar.footer)      
  .setDescription(`
 ${member} Adlı Kullanıcı Karantinaya Atıldı!
  
  `))
                  member.roles.set([ayarlar.jailrol])
                  member.setNickname(`Karantina!`)
                  db.add(`ceza.${member.id}`, +1)
                  
                  await db.push(`sicil.${member.id}`, {
  Ceza: `JAIL`,
 Hammer: message.author.id,
Tarih: `${kayıttarihi}`
  });
                  
                  const log = new kevzyy.MessageEmbed()
.setColor("#ffffff")
.setDescription(`
**${member} Adlı Kullanıcı Karantinaya Atıldı!**

**•** \`Detaylar;\` 

**• Kullanıcı =** ${member}-\`( ${member.id} )\`
**• Yetkili =** ${message.author}-\`( ${message.author.id} )\`
**• Sebep =** \`${sebep}\`
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
                } else if (button.id == "mute") {
                     message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
                                                .setColor("#ffffff")
        .setFooter(ayarlar.footer)  
  .setDescription(`
 ${member} Adlı Kullanıcı Mutelendi!
  
  `))
                  member.roles.add(ayarlar.muterol)        
                  db.add(`ceza.${member.id}`, +1)
                  
                  await db.push(`sicil.${member.id}`, {
  Ceza: `MUTE`,
 Hammer: message.author.id,
Tarih: `${kayıttarihi}`
  });
                  
                  const log = new kevzyy.MessageEmbed()
.setColor("#ffffff")
.setDescription(`
**${member} Adlı Kullanıcı Mutelendi!**

**•** \`Detaylar;\` 

**• Kullanıcı =** ${member}-\`( ${member.id} )\`
**• Yetkili =** ${message.author}-\`( ${message.author.id} )\`
**• Sebep =** \`${sebep}\`
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
                } else if (button.id == "ban") {
                     message.channel.send(new MessageEmbed()
                                                .setColor("#ffffff")
        .setFooter(ayarlar.footer)  
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`
 ${member} Adlı Kullanıcı Banlandı!
  
  `))
                      message.guild.members.ban(member.id)
                  db.add(`ceza.${member.id}`, +1)
                  
                  await db.push(`sicil.${member.id}`, {
  Ceza: `BAN`,
 Hammer: message.author.id,
Tarih: `${kayıttarihi}`
  });
                  
                  const log = new kevzyy.MessageEmbed()
.setColor("#ffffff")
.setDescription(`
**${member} Adlı Kullanıcı Sunucudan Yasaklandı!**

**•** \`Detaylar;\` 

**• Kullanıcı =** ${member}-\`( ${member.id} )\`
**• Yetkili =** ${message.author}-\`( ${message.author.id} )\`
**• Sebep =** \`${sebep}\`
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
                } else if (button.id == "kick") {
                     message.channel.send(new MessageEmbed()
                                          .setColor("#ffffff")
        .setFooter(ayarlar.footer)  
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`
 ${member} Adlı Kullanıcı Banlandı!
  
  `))
                       message.guild.member(member).kick
                  db.add(`ceza.${member.id}`, +1)
                  
                  await db.push(`sicil.${member.id}`, {
  Ceza: `KİCK`,
 Hammer: message.author.id,
Tarih: `${kayıttarihi}`
  });
                  
                  const log = new kevzyy.MessageEmbed()
.setColor("#ffffff")
.setDescription(`
**${member} Adlı Kullanıcı Sunucudan Atıldı!**

**•** \`Detaylar;\` 

**• Kullanıcı =** ${member}-\`( ${member.id} )\`
**• Yetkili =** ${message.author}-\`( ${message.author.id} )\`
**• Sebep =** \`${sebep}\`
**• Tarih =** ${kayıttarihi}
`)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setFooter(ayarlar.footer)
client.channels.cache.get(ayarlar.kicklog).send(log)
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
                    .setDescription(`Cezalandırma İşlemi iptal edildi!`)
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
  aliases: ['cezaişlem'],
  permLevel: 0
};

exports.help = {
  name: 'ceza',
};