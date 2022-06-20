const kevzyy = require("discord.js");
const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json")
const db = require('quick.db');
const buttons = require('discord-buttons');
const moment = require('moment');
module.exports.run = async (client, message, args) => {
  
   let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let kayıttarihi = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    moment.locale("tr")
  
  var tag = ayarlar.tag 
  
  
   if(![ayarlar.yetkilirol].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) 
  return message.channel.send(new MessageEmbed()

  .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`${message.author} Bu Komutu Kullanmak İçin Yetkin Bulunmamakta!`)// burayı değiştirebilirsiniz
  .setColor('2f3136')).then(x => x.delete({timeout: 5000}));
  
 
  
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if (!member) return message.channel.send(`**Bir Kullanıcı Belirtmelisin!**`).then(x => x.delete({timeout: 5000}));// burayı değiştirebilirsiniz
let isim = args[1]
if (!isim) return message.channel.send(`**İsmini Belirtmelisin!**`).then(x => x.delete({timeout: 5000}));// burayı değiştirebilirsiniz
let yaş = args[2]
if (!yaş) return message.channel.send(`**Yaşını Belirtmelisin!**`).then(x => x.delete({timeout: 5000}));// burayı değiştirebilirsiniz
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('Belirtilen Kişinin Rolü Senle Eşit Ve ya Üstün Bü yüzden Kayıt Edemezsin!').then(x => x.delete({timeout: 5000}));
 let taglıalım = await db.fetch(`taglıalım.${message.guild.id}`)
   if(taglıalım === true){
        if(!member.roles.cache.has(ayarlar.tagrol) && !member.roles.cache.has(ayarlar.vip) && !member.roles.cache.has(ayarlar.booster)) return message.channel.send("Sunucu Taglı Alımdadır! **Kullanıcı tag almalı, vip rolü almalı ve ya boost basmalıdır!**").then(x => x.delete({timeout: 10000}));
   }
    var evethayır = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
        .setColor('#5555dd')
        .setTimestamp()
        .setDescription(`:question: ${member} adlı kullanıcıyı **Kız** olarak kayıt etmeyi onaylıyormusunuz?`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }));
        var evt = new buttons.MessageButton()
        .setStyle('green')
        .setLabel('Onayla')
        .setID('evet');
        var hyr = new buttons.MessageButton()
        .setStyle('red')
        .setLabel('İptal')
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
const İsim = `${tag} ${isim} | ${yaş}`
  
  db.add(`${message.author.id}.kız`, 1)
  db.add(`.${message.author.id}.toplam`, 1)
  db.add(`sayı.${member.id}`, +1)
  let reg = db.fetch(`${message.author.id}.toplam`)
  
   await member.setNickname(`${İsim}`)
  member.roles.remove(ayarlar.kayıtsızrol);
  member.roles.add(ayarlar.kızrol)
                  
                  await db.push(`isimler.${member.id}`, {
  Tag: ayarlar.tag,
    Registerer: message.author.id,
    Name: isim,
    Tür: `Kayıt`,
    Age: yaş,
    Rol: ayarlar.kızrol
  });
  
  
  client.channels.cache.get(ayarlar.chat).send(`${member} **Sunucumuza Hoşgeldin!**`).then(x => x.delete({timeout: 8000}));// burayı değiştirebilirsiniz
  
  const log = new kevzyy.MessageEmbed()
.setColor("#d51aee")
.setDescription(`
**${member} Adlı Kullanıcı Kayıt Edildi!**

**•** \`Detaylar;\` 

**• Kullanıcı =** ${member}-\`( ${member.id} )\`
**• Yetkili =** ${message.author}-\`( ${message.author.id} )\`
**• Kayıt Türü =** \`Kız\`
**• Tarih =** ${kayıttarihi}
`)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setFooter(ayarlar.footer)
.setTimestamp()
client.channels.cache.get(ayarlar.kayıtlog).send(log)
                       var embeds = new MessageEmbed()
.setColor('#1a4cee')
.setFooter(".isimler Komutuyla İsim Geçmişini Kontrol Etmeyi Unutma!")
.setDescription(`${member} Adlı Kullanıcı <@&${ayarlar.kızrol}> Olarak Kayıt Edildi!`)

                return s.edit({ embed: embeds }).then(async (sm) => {
                        s.delete({ timeout: 5000 });
                    });


                } else if (button.id == "hayır") {
                                   
                    var embeds = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                    .setFooter(member.user.username,member.user.displayAvatarURL({ dynamic: true }))
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
    aliases: ["k"],
    permLevel: 0
};

module.exports.help = {
    name: "kız",
}
//kevzyy basit register

