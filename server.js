const discord = require('discord.js');
const client = new discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
require("discord-buttons")(client)
require('./util/eventLoader.js')(client);
const path = require('path');
const ms = require('ms');


var prefix = ayarlar.prefix;

const app = express()
app.get("/foo", (req, res, next) => {
    const foo = JSON.parse(req.body.jsonString)
})
process.on("unhandledRejection", (reason, promise) => {})


const log = message => {
    console.log(`${message}`);
};

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);

const invites = {};
const wait = require("util").promisify(setTimeout);
client.on("ready", () => {
  wait(1000);
  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});




//komut kımsı

client.on("userUpdate", async (oldUser, newUser) => {
if (oldUser.username !== newUser.username) {
let tag = ayarlar.tag
let sunucu = ayarlar.sunucuid
let kanal = ayarlar.taglog
let rol = ayarlar.tagrol
if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
client.channels.cache.get(kanal).send(`**${newUser} adlı kişi ${tag} tagımızı aldığı için <@&${rol}> rolü verildi !**`)
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol) }
if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol)
client.channels.cache.get(kanal).send(`**${newUser} adlı kişi ${tag} tagımızı çıkardığı için <@&${rol}> rolü alındı !**`) } } })


client.on('guildMemberAdd', async member => {//Kod alıntı betawile dan aldım biraz değiştirdim .d


        
    await member.roles.add(ayarlar.kayıtsızrol)
    require('moment-duration-format')
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-9])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if(üs) {
     üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
       return {
         '0': `0`, 
         '1': `1`,
         '2': `2`,
         '3': `3`,
         '4': `4`,
         '5': `5`,
         '6': `6`,
         '7': `7`,
         '8': `8`,
         '9': `9`}[d];})}
         let kevzyy = client.users.cache.get(member.id);
         const kurulus = new Date().getTime() - kevzyy.createdAt.getTime();  
         const gecen = moment.duration(kurulus).format(` YY **[Yıl]** DD **[Gün]**`) 
         
         var kontrol;
         
           
         if (kurulus < 1296000000) {
           
           kontrol = `Şüphelisin. ❌`
           
           member.setNickname(ayarlar.tag + " Şüpheli")
            const kytsz = member.guild.roles.cache.get(ayarlar.kayıtsızrol) 
   var rol = member.guild.roles.cache.get(ayarlar.karantinarol) // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
   var kayıtsız = member.guild.roles.cache.get(kytsz) // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
   var kanal = ayarlar.hoşgeldinkanal
   member.roles.add(rol)
   member.roles.remove(kytsz)
client.channels.cache.get(kanal).send(`${member}-(\`${member.id}\`) Adlı Kullanıcının Hesabı 2 Hafta Önce Açıldığı İçin Karantinaya Gönderildi!`)
member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 2 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
         
} else  if (kurulus > 1296000000) {
           
           kontrol = `Güvenilirsin. ✅ `
           moment.locale("tr");
  member.setNickname(ayarlar.tag + " İsim | Yaş")
         client.channels.cache.get(ayarlar.hoşgeldinkanal).send(`
:white_small_square: ${member}-(\`${member.id}\`) **__${ayarlar.Sunucuismi}ya__** hoşgeldin.
         
:white_small_square: Hesabın \``+gecen+`\` önce kurulduğu için `+kontrol+`
         
:white_small_square: **Sunucuya Ulaşabilmek için solda bulunan Ses odalarına geçerek kayıt olmalısın.**

:white_small_square: Tagımızı (\`${ayarlar.tag}\`) Alarak Bize Destek Olabilirsin!!!
         
:white_small_square: <#${ayarlar.kurallar}> Kanalına Göz Atmayı Unutma. **Kayıt Olduktan Sonra Yaptığın Her Davranıştan Sorumlu Tutulucaksın!**

:white_small_square: Seninle beraber **`+üyesayısı+`** kişiye ulaştık. `)
         
}
  
   })

client.on('message', async message => {
if (message.content === '!fakekatıl') { // . yerine prefixi yaz
  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});


client.on("guildMemberAdd", async (member) => {
member.roles.add(ayarlar.kayıtsızrol)

});

client.on("message", async msg => {
if (msg.content.toLowerCase() == 'tag')
 return msg.reply(ayarlar.tag)
  if (msg.content.toLowerCase() == '.tag')
 return msg.reply(ayarlar.tag)
  if (msg.content.toLowerCase() == '!tag')
 return msg.reply(ayarlar.tag)
})


//snipe
client.on("messageDelete", async(message) => {
  if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
  let snipe = {
    mesaj: message.content,
    mesajyazan: message.author.id,
    ytarihi: message.createdTimestamp,
    starihi: Date.now(), 
    kanal: message.channel.id
  }
await db.set(`snipe.${message.guild.id}`, snipe)
});


//afk
client.on("message" , message => {
    if(!message.guild) return;
   if (message.content.includes(`afk`)) return;
    let etiket = message.mentions.users.first()
    let uye = db.fetch(`user_${message.author.id}_${message.guild.id}`)
    let nickk = db.fetch(`nick_${message.author.id}_${message.guild.id}`)
    if(etiket){
      let reason = db.fetch(`sebep_${etiket.id}_${message.guild.id}`)
      let uye2 = db.fetch(`user_${etiket.id}_${message.guild.id}`)
      if(message.content.includes(uye2)){
      let time = db.fetch(`afktime_${message.guild.id}`);
      let timeObj = ms(Date.now() - time);
        message.channel.send(new discord.MessageEmbed().setDescription(`${etiket} adlı kullanıcı **${reason}** sebebiyle \`${timeObj}\` süresi boyunca afk.`).setColor("RANDOM"))}}
  if(message.author.id === uye){  
      message.member.setNickname(nickk)
      db.delete(`sebep_${message.author.id}_${message.guild.id}`)
      db.delete(`user_${message.author.id}_${message.guild.id}`)
      db.delete(`nick_${message.author.id}_${message.guild.id}`)
      db.delete(`user_${message.author.id}_${message.guild.id}`);
      db.delete(`afktime_${message.guild.id}`)
      message.reply(`**Başarıyla \`AFK\` modundan çıkış yaptın.**`)
    }  
  });


//Buton Sunucu Bilgi
const buttons = require('discord-buttons');


client.on("message", async message => {
    if (message.content === "!buton1" && message.author.id === ayarlar.sahipid) {

        const one = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("1")
            .setID("one");

        const two = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("2")
            .setID("two");

        const three = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("3")
            .setID("three");

        const four = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("4")
            .setID("four");

        
       const five = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("5")
            .setID("five");
      
      
     
      
        message.channel.send("**Merhaba!** \n\n Aşşağıdaki butonlarla tıklayarak **sunucumuz hakkında bilgi alabilirsiniz** \n\n **1 ** `Sunucumuzda kaç kişi tagımızı aldığını kontrol edersin.` \n **2 ** `Sunucumuzda kaç kişinin seslide olduğunu kontrol edersin.` \n **3 ** `Sunucumuzda kaç kişi olduğunu kontrol edersin` \n **4** `Sunucumuzdaki rollerinizi kontrol edersiniz.` \n **5 ** `Sunucumuza ne zaman katıldığınızı kontrol edersiniz.`", { buttons: [one, two, three, four, five] })
    }
})
      client.on('clickButton', async (button) => {
      
        if (button.id === "one") {
        const taglı = button.guild.members.cache.filter(r => r.user.username.includes(ayarlar.tag)).size
        await button.reply.think(true);
        await button.reply.edit(`Sunucumuzda Toplam **${taglı}** kişi tagımızı alarak bizi desteklemiş!`);
    };

    if (button.id === "two") {
    const ses = button.guild.channels.cache.filter(channel => channel.type == 'voice').map(channel => channel.members.size).reduce((a,b) => a + b)
        await button.reply.think(true)
        await button.reply.edit(`Sunucumuzda Şu an toplam **${ses}** kişi seslide!`)
    };

    if (button.id === "three") {
     const toplam = button.guild.memberCount
     const bot = button.guild.members.cache.filter(s => s.user.bot).size
        await button.reply.think(true);
        await button.reply.edit(`Sunucumuzda toplam **${toplam} adet üye var!** **${toplam-bot || "0"}** (**+${bot || "0"} bot**)`)
    };

    if (button.id === "four") {
        await button.reply.think(true);
        await button.reply.edit(`${button.clicker.member.roles.cache.size <= 15 ? button.clicker.member.roles.cache.filter(x => x.name !== "@everyone").map(x => x).join(`, `) : `Roller Çok Fazla...!`}`);
    };
 if (button.id === "five") {
      const member = button.guild.joinedAt
        await button.reply.think(true);
        await button.reply.edit(`Sunucumuza ${moment(member).format("DD/MM/YYYY")} tarihinde katılmışsınız.`)
    };

      }
                );



//Buton Rol Alma

client.on("message", async msg => {
    if (msg.content === "!buton2" && msg.author.id === ayarlar.sahipid) {
      
      const button1 = new buttons.MessageButton()
            .setStyle("green")
            .setLabel("Etkinlik Katılımcısı")
            .setID("button1");
      
      const button2 = new buttons.MessageButton()
            .setStyle("red")
            .setLabel("Çekiliş Katılımcısı")
            .setID("button2");
      
      msg.channel.send(`
        
        **Merhaba \`${ayarlar.Sunucuismi}\` Üyeleri!**
 
🎉 **• Çekiliş Katılımcısı alarak nitro, spotify, netflix ve benzeri çekilişlere katılıp ödül sahibi olabilirsiniz.**

🎁 **• Etkinlik Katılımcısı alarak konserlerimizden, oyunlarımızdan, ve etkinliklerimizden faydalanabilirsiniz.**

**NOT:** \`Kayıtlı , kayıtsız olarak hepiniz bu kanalı görebilmektesiniz. Bu sunucumuzda everyone here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın. \`
        
        
        
        
        
        `,{ buttons: [button1, button2] })
      
      client.on('clickButton', async (button) => {
        
        if (button.id === 'button1') {
        if (button.clicker.member.roles.cache.get((ayarlar.etkinlik))) {
            await button.clicker.member.roles.remove((ayarlar.etkinlik))
            await button.reply.think(true);
            await button.reply.edit(`✅ | **Etkinlik Katılımcısı (<@&${ayarlar.etkinlik}>) rolünü senden aldım!**`)
        } else {
            await button.clicker.member.roles.add(((ayarlar.etkinlik)))
            await button.reply.think(true);
            await button.reply.edit(`✅ | **Etkinlik Katılımcısı (<@&${ayarlar.etkinlik}>) rolünü sana verdim!**`)
        }
    }
        
             if (button.id === 'button2') {
        if (button.clicker.member.roles.cache.get((ayarlar.çekiliş))) {
            await button.clicker.member.roles.remove((ayarlar.çekiliş))
            await button.reply.think(true);
            await button.reply.edit(`✅ | **Etkinlik Katılımcısı (<@&${ayarlar.çekiliş}>) rolünü senden aldım!**`)
        } else {
            await button.clicker.member.roles.add(((ayarlar.çekiliş)))
            await button.reply.think(true);
            await button.reply.edit(`✅ | **Etkinlik Katılımcısı (<@&${ayarlar.çekiliş}>) rolünü sana verdim!**`)
        }
    }
      
      })
    }
    })

