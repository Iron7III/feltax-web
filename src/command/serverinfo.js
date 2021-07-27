//  ⌚STATUS⌚
//  Comando no funcional debido a la falta de Privileged Intents
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const guild = message.guild;
    console.log(guild)
    console.log(guild.bans.cache)
    var date = new Date(guild.afkTimeout*1000)
    //> **Registered ➜ **
    let _verificationLevel = {
        "NONE": "A",
        "LOW": "Low",
        "MEDIUM": "Medium",
        "HIGH": "(╯°□°）╯︵ ┻━┻",
        "VERY_HIGH": "┻━┻︵ ヽ(ಠ益ಠ)ノ ︵ ┻━┻"
    }
    let ServerInfo_General = [
        `> **Name ➜ **\`${guild.name}\``,
        `> **ID ➜ **\`${guild.id}\``,
        `> **Locale ➜ **\`${guild.preferredLocale}\``,
        `> **Members ➜ **\`${guild.memberCount}\``,
        `> **Owner ➜ **<@${guild.ownerId}> ${client.emojis.cache.get('860997112434786315')} ${message.channel.guild.members.cache.get(guild.ownerId).premiumSince!=null?client.emojis.cache.get('860999928217206795'):` `} **|** \`${guild.ownerId}\``,
        `> **Maximum Members ➜ **\`${guild.maximumMembers}\``,
        `> **Maximum Presences ➜ **\`${guild.maximumPresences!=null?guild.maximumPresences:`∞`}\``,
        `> **Created ➜ **\` \``,
        `> **Boost Tier ➜ **\`${guild.premiumTier}\``,
        `> **Boost Count ➜ **\`${guild.premiumSubscriptionCount}\``
    ]
    let ServerInfo_Moderation = [
        `> **Bans ➜ **\`${guild.bans.cache.size+1}\``,
        `> **Verification Level ➜ **\`${_verificationLevel[guild.verificationLevel]}\``,
        `> **AFK Timeout ➜ **\`${date.getHours()>9?date.getHours():`0${date.getHours()}`}:${date.getMinutes()>9?date.getMinutes():`0${date.getMinutes()}`}:${date.getSeconds()>9?date.getSeconds():`0${date.getSeconds()}`}\``
    ]
    if(guild.vanityURLCode){
        ServerInfo_Moderation.splice(ServerInfo_General.length,0,`> **Vanity URL ➜ *${guild.vanityURLCode} **|** \`${guild.vanityURLUses}\``)
    }
    if(guild.afkChannel){
        ServerInfo_Moderation.splice(ServerInfo_General.length,0,`> **AFK Channel ➜ **${guild.afkChannel} **|** \`${guild.afkChannelId}\``)
    }
    if(guild.rulesChannel){
        ServerInfo_Moderation.splice(ServerInfo_General.length,0,`> **Rules Channel ➜ **${guild.rulesChannel} **|** \`${guild.rulesChannelId}\``)
    }
    if(guild.systemChannel){
        ServerInfo_Moderation.splice(ServerInfo_General.length,0,`> **System Channel ➜ **${guild.systemChannel} **|** \`${guild.systemChannelId}\``)
    }
    if(guild.publicUpdatesChannelId){
        ServerInfo_Moderation.splice(ServerInfo_General.length,0,`> **Community Updates Channel ➜ **${guild.publicUpdatesChannel} **|** \`${guild.publicUpdatesChannelId}\``)
    }
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${guild.name}'s Information`,guild.iconURL({dynamic:true,size:512}))
        .addField('General Info',ServerInfo_General.join('\n'),false)
        .addField('Moderation Info',ServerInfo_Moderation.join('\n'),false)
        .setColor('#FEE75C')
        .setThumbnail(guild.iconURL({dynamic:true,size:512}))
    client.api.channels(message.channel.id).messages.post({
        type: 1,
        data: {
            content: ' ',
            embed: embed,
            components: null
        }
    })
}