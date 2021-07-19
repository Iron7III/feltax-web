const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    intents: ['GUILDS','GUILD_MEMBERS','GUILD_BANS','GUILD_EMOJIS','GUILD_INTEGRATIONS','GUILD_WEBHOOKS','GUILD_INVITES','GUILD_VOICE_STATES','GUILD_PRESENCES','GUILD_MESSAGES','GUILD_MESSAGE_REACTIONS','GUILD_MESSAGE_TYPING','DIRECT_MESSAGES','DIRECT_MESSAGE_REACTIONS','DIRECT_MESSAGE_TYPING']
    //intents: Discord.Intents.NON_PRIVILEGED
});
const FortniteAPI = require("fortnite-api-com");
const config = {
    apikey: "",
    language: "en"
};
var Fortnite = new FortniteAPI(config);
const {assets} = require('./assets.json')

client.on("ready", async () => {
    console.log("[" + client.user.username + "]>[INFO]>[STARTED]>[TESTING]");
    var a = await client.api.users('438390132538605589').get();
    console.log(a)
    const D = new Date();
    var _date = Date.now()/1000;
    const readyEmbed = new Discord.MessageEmbed()
        .setAuthor(`Connected`,assets.ready)
        .setDescription(`> **PING ➜ **\`${Math.round(client.ws.ping)}\`\n> **DATE ➜ **<t:${_date.toFixed(0)}:d> **|** <t:${_date.toFixed(0)}:T>`)
        .setColor('#FD3D26')
    client.api.channels('853697844333772820').messages.post({
        type: 1,
        data: {
            content: ' ',
            embed: readyEmbed,
            components: null
        }
    })
    client.user.setPresence({
        activities: [
            {
                name: 'Use f-help :D',
                type: 'COMPETING'
            }
        ],
        status: 'dnd'
    });
    const { generateShop, getShopItems } = require("./shop");
    const { apiKey, language, watermark } = require("./config.json");
    (async () => {
        const items = await getShopItems(apiKey, language);
        await generateShop(items, watermark);
    })()
})

client.on("messageCreate", async message => {
    let prefix = "f-";
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd===undefined||!message.content.startsWith(`${prefix}${cmd}`||message.channel.dm)) return;
    var s='+';
    try {
        let file = require(`./command/${cmd}.js`);
        file.run(client, message, args, Fortnite, {assets});
    } catch (e) {
        message.channel.send('Este comando no existe').then(msg => client.setTimeout(() => msg.delete(), 5000))
        console.log(e.stack),
        s='-';
    } finally {
        var today = new Date();
        var date = `${today.getHours()+2>9?today.getHours()+2:`0${today.getHours()+2}`}:${today.getMinutes()>9?today.getMinutes():`0${today.getMinutes()}`}:${today.getSeconds()>9?today.getSeconds():`0${today.getSeconds()}`} | ${today.getDate()>9?today.getDate():`0${today.getDate()}`}-${today.getMonth()>9?today.getMonth():`0${today.getMonth()+4}`}-${today.getFullYear()}`    
        var _commandInfo = [
            `> **Guild ➜** \`${message.guild.name}\` **|** \`${message.guild.id}\``,
            `> **Channel ➜** \`#${message.channel.name}\` **|** \`${message.channel.id}\``,
            `> **User ➜** <@${message.author.id}> **|** \`${message.author.id}\``,
            `> **Date ➜** <t:${(message.createdTimestamp/1000).toFixed(0)}:d> **|** <t:${(message.createdTimestamp/1000).toFixed(0)}:T>`,
            `> **Command ➜** **\`${prefix}\`**\`${cmd}\``,
            `> **Arguments ➜** ${args[0]?args.map(a=>`\`${a}\``).join(' '):'No arguments provided'}`
        ]
        const commandEmbed = new Discord.MessageEmbed()
            .setAuthor('Command Executed',assets.command)
            .setDescription(_commandInfo.join('\n'))
            .setColor('#FD3D26')
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel('COMMAND URL')
                    .setStyle('LINK')
                    .setURL(message.url),
                new Discord.MessageButton()
                    .setLabel('SERVER')
                    .setStyle('LINK')
                    .setURL(`https://discord.gg/${(await message.channel.createInvite({maxAge: 0})).code}`)
            )
        client.api.channels('853697754706739250').messages.post({
            type: 1,
            data: {
                content: ' ',
                embeds: [commandEmbed],
                components: [
                    row
                ]
            }
        }).catch(e => console.log(e))
    }
});

client.on("guildCreate", (guild) => {
    let _info = [
        `> **Name ➜ **\`${guild.name}\``,
        `> **ID ➜ **\`${guild.id}\``,
        `> **Locale ➜ **\`${guild.locale}\``,
        `> **Members ➜ **\`${guild.memberCount}\``,
        `> **Owner ➜ **<@${guild.ownerID}> ${client.emojis.cache.get('860997112434786315')} ${guild.members.cache.get(guild.ownerID).premiumSince!=null?client.emojis.cache.get('860999928217206795'):` `} **|** \`${guild.ownerID}\``
    ]
    const guildCreateEmbed = new Discord.MessageEmbed()
        .setAuthor(`Joined Server`,assets.guildCreate)
        .setDescription(_info.join('\n'))
        .setColor('#57F287')
        .setThumbnail(guild.iconURL({dynamic:true,size:512}))
        .setImage(guild.bannerURL())
    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
            .setLabel('SERVER')
            .setStyle('LINK')
            .setURL(`https://discord.gg/`),
        new Discord.MessageButton()
            .setLabel('LEAVE SERVER')
            .setStyle('DANGER')
            .setCustomID('leave_server')
            .setDisabled(true)
    )
    client.api.channels('853697886335008808').messages.post({
        type: 1,
        data: {
            content: ' ',
            embed: guildCreateEmbed,
            components: [
                row
            ]
        }
    }).catch(e => console.log(e))
})

client.on("guildDelete", (guild) => {
    const DevLogGuildDelete = `${client.emojis.cache.get("853742823371178015")} **SERVER LEFT**\n> \`\`\`\n> GUILD ➜ ${guild.name} | ${guild.id}\n> \`\`\``;
    console.log('ME han expulsado de un servidor')
    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
            .setLabel('SERVER')
            .setStyle('LINK')
            .setURL(`https://discord.gg/`)
    )
    client.api.channels('853697886335008808').messages.post({
        type: 1,
        data: {
            content: DevLogGuildDelete,
            embed: null,
            components: [
                row
            ]
        }
    }).catch(e => console.log(e))
})

// LOGIN WITH "FORTNITE API BOT"
//  client.login('Njg1OTE5ODQ1MjMzMTk3MTAw.XmPqog.-EUlDqnaKAX5TjQJS5AnJWLMG-s').catch(e => console.log(e));
// LOGIN WITH "Feltax"
client.login('NTY4NDM1NjE2MTUzMzM3OTE2.XLiC6w.ReMH4ndYBbjqZVZrSqxhQ81VDdE').catch(e => console.log(e));