const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const buttons = require('discord-buttons');
const ayarlar = require("../ayarlar.json")

exports.run= async (client, message, args) => { 
  const embed = new MessageEmbed()
.setColor("ffffff")
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()


    
       if(![ayarlar.sahipid].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) 
  return message.channel.send(new MessageEmbed()

  .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`${message.author} Bu Komutu Kullanmak İçin Yetkin Bulunmamakta!`)// burayı değiştirebilirsiniz
  .setColor('2f3136')).then(x => x.delete({timeout: 5000}));
      
       var evethayır = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setColor('#5555dd')
        .setTimestamp()
        .setDescription(`:question: taglı alım açmak için \`aç\` butonuna kapatmak için \`kapat\` butonuna tıkla!`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }));
        var evt = new buttons.MessageButton()
        .setStyle('green')
        .setLabel('aç')
        .setID('evet');
        var hyr = new buttons.MessageButton()
        .setStyle('red')
        .setLabel('kapat')
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
        await db.set(`taglıalım.${message.guild.id}`, true)
                          var embeds = new MessageEmbed()
    
                    .setColor('#5555dd')
                    .setTimestamp()
                    .setDescription(`Sunucuda **taglı alım** açıldı!`)
                    .setThumbnail(button.message.guild.iconURL({ dynamic: true }));

                return s.edit({ embed: embeds }).then(async (sm) => {
                        s.delete({ timeout: 5000 });
                    });
                } else if (button.id == "hayır") {
                  
                  await db.set(`taglıalım.${message.guild.id}`, false)        
                    var embeds = new MessageEmbed()
                    .setColor('#5555dd')
                    .setTimestamp()
                    .setDescription(`Sunucuda **taglı alım** kapatıldı!`)
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
    name: "taglıalım",
}
