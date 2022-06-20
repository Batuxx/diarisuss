const kevzyy = require("discord.js")//burayı değiştirdim amina
const { MessageEmbed } = require('discord.js');
const buttons = require('discord-buttons');
const ayarlar = require("../ayarlar.json")
const moment = require('moment');
const db = require("quick.db");
const ms = require('ms');


exports.run = (client, message, args) => {
  
      if(![ayarlar.yetkilirol].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) 
  return message.channel.send(new MessageEmbed()

  .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`${message.author} Bu Komutu Kullanmak İçin Yetkin Bulunmamakta!`)// burayı değiştirebilirsiniz
  .setColor('2f3136')).then(x => x.delete({timeout: 5000}));
  
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!user) return message.channel.send(`**Bir Kullanıcı Belirtmelisin!**`).then(x => x.delete({timeout: 5000}));
  // burayı değiştirebilirsiniz
if(!user.voice.channel) return message.reply("Bağlantısını kesmek istediğiniz kullanıcı sesli odalarda bulunmuyor.").then(x => x.delete({timeout: 5000}))
        if(message.member.roles.highest.rawPosition < user.roles.highest.rawPosition) return message.reply("Rolleri senden yüksek birinin ses kanallarında ki bağlantısını kesemezsin.").then(x => x.delete({timeout: 5000}))
 var evethayır = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
        .setColor('#5555dd')
        .setTimestamp()
        .setDescription(`:question: ${user} adlı kullanıcıyı ses kanalından çıkarmaya eminmisiniz?`)
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
                    button.guild.members.cache.get(user.id).voice.kick()
                  const embed1 = new MessageEmbed()
                  .setDescription(`${user} Adlı Kullanıcı Ses Kanalından Çıkarıldı!`)
                  .setColor("BLACK")
                  .setFooter(`Yetkili id: ` + message.author)
                   client.channels.cache.get(ayarlar.kayıtlog).send(embed1)
                    var embeds = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setColor('#5555dd')
                    .setTimestamp()
                    .setDescription(`${user} Adlı Kullanıcı **`+user.voice.channel.name+`** Adlı Ses Kanalından Çıkarıldı!`)
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
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0
};

exports.help = {
  name: 'seskes',
};
//kevzyy basit register Komut Alıntıdır!