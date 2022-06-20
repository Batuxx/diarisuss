const { MessageEmbed } = require('discord.js');
const buttons = require('discord-buttons');
const ayarlar = require("../ayarlar.json")
const db = require('quick.db');


exports.run = async(client, message, args) => {
   
     if(!message.member.hasPermission("ADMINISTRATOR")) 
  return message.channel.send(new MessageEmbed()

  .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`${message.author} Bu Komutu Kullanmak İçin Yetkin Bulunmamakta!`)// burayı değiştirebilirsiniz
  .setColor('2f3136')).then(x => x.delete({timeout: 5000}))
  
 var evethayır = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setColor('#5555dd')
        .setDescription(`Aşağıdan Kanalı \`Kilitleyebilir\` ve ya \`Kilit Açabilirsin\`**!**`)
        var ceza1 = new buttons.MessageButton()
        .setStyle('blurple')
        .setLabel('🔑')
        .setID('jail');
  var ceza2 = new buttons.MessageButton()
        .setStyle('blurple')
        .setLabel('🔒')
        .setID('mute');
        var hyr = new buttons.MessageButton()
        .setStyle('red')
        .setLabel('İptal')
        .setID('hayır');
        var row = new buttons.MessageActionRow()
        .addComponents([ceza1, ceza2, hyr]);
        if (!message.member.permissions.has(ayarlar.yetkilirol)) {
            ceza1.setDisabled(true);
          ceza2.setDisabled(true);
            hyr.setDisabled(true);
        };
        return message.channel.send({ embed: evethayır, components: [ row ] }).then(async (s) => {
            var filter = m => m.clicker.user.id == message.author.id;
            var collector = s.createButtonCollector(filter);
            collector.on('collect', async (button) => {
                button.reply.defer();
                if (button.id == "jail") {
     if(db.get(`kilitli`)){
        message.channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: true });
        db.delete(`kilitli`);
     }
      
   message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
    .setColor("#ffffff")
        .setFooter(ayarlar.footer)      
  .setDescription(`
 Kanal Durumu Başarıyla \`Yazılabilir\` Hale Getirildi!
  
  `))
                  var embeds = new MessageEmbed()
.setColor('BLACK')
.setDescription(`.`)

                return s.edit({ embed: embeds }).then(async (sm) => {
                        s.delete({ timeout: 1 });
                    });
       
    
                   } else if (button.id == "mute") {
         message.channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: false });
        db.set(`kilitli`, true);
                     message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
                                                .setColor("#ffffff")
        .setFooter(ayarlar.footer)  
  .setDescription(`
 Kanal Durumu Başarıyla \`Yazılamaz\` Hale Getirildi!
  
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
                    .setDescription(`Kilit İşlemi iptal edildi!`)
                    return s.edit({ embed: embeds }).then(async (sm) => {
                        s.delete({ timeout: 5000 });
                    });
                }
                })
        })
            
        
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'kilit',
}