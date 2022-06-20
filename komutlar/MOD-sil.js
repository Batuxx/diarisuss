const kevzyy = require("discord.js");
const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json")
const db = require('quick.db');
const buttons = require('discord-buttons');
const moment = require('moment');
exports.run = async (client, message, args) => {
  
   
  
  var prefix = ayarlar.prefix
  
  
   if(![ayarlar.yetkilirol].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) 
  return message.channel.send(new MessageEmbed()

  .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`${message.author} Bu Komutu Kullanmak İçin Yetkin Bulunmamakta!`)// burayı değiştirebilirsiniz
  .setColor('2f3136')).then(x => x.delete({timeout: 5000}))

 
    var evethayır = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setColor('#5555dd')
        .setDescription(`Aşağıdan Mesaj Miktarı Seçiniz!`)
        var ceza1 = new buttons.MessageButton()
        .setStyle('blurple')
        .setLabel('10')
        .setID('jail');
  var ceza2 = new buttons.MessageButton()
        .setStyle('blurple')
        .setLabel('50')
        .setID('mute');
  var ceza3 = new buttons.MessageButton()
        .setStyle('blurple')
        .setLabel('100')
        .setID('ban');
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
                if (button.id == "jail") {
                  message.channel.bulkDelete(10)
              message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
    .setColor("#ffffff")
        .setFooter(ayarlar.footer)      
  .setDescription(`
 Belirtilen Miktarda Mesaj Silindi!
  
  `))
                  var embeds = new MessageEmbed()
.setColor('BLACK')
.setDescription(`.`)

                return s.edit({ embed: embeds }).then(async (sm) => {
                        s.delete({ timeout: 1 });
                    });
                } else if (button.id == "mute") {
                   message.channel.bulkDelete(50)
                     message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
                                                .setColor("#ffffff")
        .setFooter(ayarlar.footer)  
  .setDescription(`
 Belirtilen Miktarda Mesaj Silindi!
  
  `))
                  
                  var embeds = new MessageEmbed()
.setColor('BLACK')
.setDescription(`.`)

                return s.edit({ embed: embeds }).then(async (sm) => {
                        s.delete({ timeout: 1 });
                    });
                } else if (button.id == "ban") {
                  message.channel.bulkDelete(100)
                     message.channel.send(new MessageEmbed()
                                                .setColor("#ffffff")
        .setFooter(ayarlar.footer)  
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`
 Belirtilen Miktarda Mesaj Silindi!
  
  `))
        
                  var embeds = new MessageEmbed()
.setColor('BLACK')
.setDescription(`.`)

                return s.edit({ embed: embeds }).then(async (sm) => {
                        s.delete({ timeout: 1 });
                    });
                }  else if (button.id == "hayır") {
                                   
                    var embeds = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                    .setFooter(ayarlar.footer)
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
  aliases: [''],
  permLevel: 0
};

exports.help = {
  name: 'sil',
};