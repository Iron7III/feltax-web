//  npm Discord
const Discord = require("discord.js");
//  Usuario del Bot de Discord
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});
// {MessageEmbed}
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, Fortnite) => {
  console.log(client.uptime)
    let CommandsInformation={
        "header":"**INFORMACION / SOPORTE**",
        "list":[
            "f*help",
            "f*ping",
            "f*info"
        ]
    };
    let CommandsFortnite={
        "header":"**FORTNITE**",
        "list":[
            "f*aes",
            "f*map <language | blank>",
            "f*shop",
            "f*news <gamemode> <language>",
            "f*newitems",
            "f*id <id>"
        ]
    };
    let Commands=[
        `${CommandsInformation.header}\n\`\`\`\n${CommandsInformation.list.join('\n')}\n\`\`\``,
        `${CommandsFortnite.header}\n\`\`\`\n${CommandsFortnite.list.join('\n')}\n\`\`\``,
        `||PlaceHolder||`,
        `||PlaceHolder||`,
    ];

    const embed = new Discord.MessageEmbed()
        .setTitle(`**${client.user.username} HELP**`)
        .addField(
            `**LISTA DE COMANDOS**`,
            `${Commands.join('\n')}`,
            false
        )
    message.channel.send({ embed: embed })
}