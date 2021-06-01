//  npm Discord
const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true
});

exports.run = async (client, message, args) => {
    console.log(message.guild.members)
    const embed = new Discord.MessageEmbed();
    if(!args[0]){
        embed.setDescription(`_Has de mencionar a un usuario o ID._`).setColor('#ED4245')
        message.channel.send({embed: embed})
            .then(m => m.delete({timeout: 5000}))
    } else {
        const member = message.mentions.members.first() || message.guild.members.resolve(args[0]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[0]) || await client.users.fetch(args[0]);
        if(!member || member.id == message.author.id){
            embed.setDescription(`_Has de mencionar a un usuario o ID._`).setColor('#ED4245')
            message.channel.send({embed: embed})
                .then(m => m.delete({ timeout: 5000 }))
        } else {
            if(!message.member.permissions.has('BAN_MEMBERS')){
                embed.setDescription(`_No tienes permisos para kickear usuarios._`).setColor('#ED4245')
                        message.channel.send({embed: embed})
                            .then(m => m.delete({ timeout: 5000 }))
            } else {
                if(message.guild.members.resolve(member.id)){
                    if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0){
                        embed.setDescription(`_No puedes kickear a un usuario igual o superior a ti._`).setColor('#ED4245')
                        message.channel.send({embed: embed})
                            .then(m => m.delete({ timeout: 5000 }))
                    } else {
                        if(!member.kickable){
                            embed.setDescription(`_El usuario no puede ser kickeado._`).setColor('#ED4245')
                            message.channel.send({embed: embed})
                                .then(m => m.delete({ timeout: 5000 }))
                        } else {
                            const reason = args.slice(1).join(" ")?args.slice(1).join(" "):'No se ha especificado una razón.'
                            message.guild.member(member.id||args[0]).kick(reason)
                                .then(()=>{
                                    embed.setDescription(`_${member.user.username}#${member.user.discriminator} ha sido kickeado con motivo: \`${args[1]?args.slice(1).join(' '):'No hay motivo.'}\`_`).setColor('#57F287')
                                    message.channel.send({embed: embed})
                                })
                                .catch(err => {
                                    embed.setDescription(`_No puedo kickear a este usuario._`).setColor('#ED4245')
                                    message.channel.send({embed: embed})
                                        .then(m => m.delete({ timeout: 5000 }))
                                    console.error(err);
                                })
                        }
                    }
                }
            }
        }
    }
}


// V2
/*
const Base = new Discord.MessageEmbed();
const user = args[0];
if(!user||user==message.author.id){
    Base.setDescription(`_Has de mencionar a un usuario o escribir una ID._`).setColor('#ED4245')
    message.channel.send({embed: Base})
        .then(m => m.delete({timeout: 5000}))
        .catch(e => console.log(e))
    return
}
if(!message.member.permissions.has('BAN_MEMBERS')){
    Base.setDescription(`_No tienes permisos para kickear usuarios._`).setColor('#ED4245')
    message.channel.send({embed: Base})
        .then(m => m.delete({ timeout: 5000 }))
        .catch(e => console.log(e))
    return
}
*/