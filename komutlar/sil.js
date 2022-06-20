const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');
exports.run = async(client, message, args) => {
        
        if(![ayarlar.yetkilirol].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**Yetki Yetersiz!**")

    
        let miktar = args[0]
        
       
        if(miktar > 100){
            const embed1 = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **En Fazla \`100\` Mesaj Silebilirim**`)
            .setColor('BLACK')
            return message.channel.send(embed1).then(cmf => {
                cmf .delete({timeout: 5000})
            })
        }
        if(!miktar){
            const embed2 = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **Lütfen Silinecek Mesaj Sayısını Gir.**`)
            .setColor('BLACK')
            return message.channel.send(embed2).then(cmf => {
                cmf .delete({timeout: 5000})
            })
        }

    
        if(miktar){
            message.channel.bulkDelete(miktar)
            
            const embed3 = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **Başarıyla ${miktar} Adet Mesaj Sildim**`)
            .setColor('BLACK')
            return message.channel.send(embed3).then(cmf => {
                cmf .delete({timeout: 5000})
            })
        }
    }

exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'sil',
}