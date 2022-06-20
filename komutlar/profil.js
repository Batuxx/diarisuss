const { MessageEmbed } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

exports.run = async(client, message, args) => {


    let cuser = message.mentions.users.first() || message.author;
    let cmember = message.guild.member(cuser)
    let cDurum = message.author.presence.status;
    let cdurum;
    if(cDurum === 'online') cdurum = "Çevrimiçi"
    if(cDurum === 'idle') cdurum = "Boşta"
    if(cDurum === 'dnd') cdurum = "Rahatsız Etmeyin"
    if(cDurum === 'Invisible') cdurum = "Görünmez/Çevrimdışı"

    let embed = new MessageEmbed()
    .setColor("#ffffff")
    .setAuthor(message.member.nickname || message.author.tag, message.author.avatarURL({dynamic: true}))
    .setThumbnail(message.author.avatarURL({dynamic: true}))
    .addField("❯ Kullanıcı Bilgisi",` 
    
    **\`•\`Profil: <@${(message.member.id)}>**
    **\`•\`ID: \`${message.author.id}\`**
    **\`•\`Durum: \`${cdurum} \`**
    **\`•\`Oluşturulma: \`${moment(cmember.user.createdAt).format("DD/MM/YYYY")}\`**
    `)
    .addField("❯ Üyelik Bilgisi",` 
    
    **\`•\`Sunucu takma ad: \`${(message.member.nickname) || 'Yok'}\`**
    **\`•\`Sunucuya Katılma: \`${moment(cmember.joinedAt).format("DD/MM/YYYY")}\`**`)

    .addField("❯ Bazı Rolleri", `${message.member.roles.cache.size <= 15 ? message.member.roles.cache.filter(x => x.name !== "@everyone").map(x => x).join(`, `) : `Roller Çok Fazla...!`}`)
    message.channel.send(embed);
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'profil',
}