const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});
const FortniteAPI = require("fortnite-api-io");
const fortniteAPI = new FortniteAPI("1c43003c-41511d50-7062e583-6ea047a7")
const { createCanvas, loadImage, registerFont } = require('canvas')

exports.run = async (client, message, args, Fortnite) => {
    const item = await fortniteAPI.getItemDetails(args[0],"en");
    var i = item.item;
    console.log(i)
    console.log(i.rarity.slice("").trim().split(" ").join("_"))
    console.log(i.price)
    Fortnite.CosmeticsSearchByID(args[0], "en").then(res => {
        console.log('---------------------')
        console.log(res.data)
        console.log(res.data.name)
        console.log(res.data.rarity.value)
        console.log(res.data.images.icon)
        const canvas = createCanvas(512, 512)
        const ctx = canvas.getContext('2d')
        const colors = {
            "common":[
                "#8A8A8A",
                "#CFCFCF",
                "#8A8A8A"
            ],
            "uncommon":[
                "#088800",
                "#0DD000",
                "#088800"
            ],
            "rare":[
                "#0080F0",
                "#009FFF",
                "#0080F0"
            ],
            "epic":[
                "#BF00FF",
                "#EF00FF",
                "#BF00FF"
            ],
            "legendary":[
                "#FF7B00",
                "#FFBB00",
                "#FF7B00"
            ],
            "marvel":[
                "#880000",
                "#FF0000",
                "#880000"
            ],
            "icon":[
                "#316958",
                "#2ee6aa",
                "#316958"
            ],
            "starwars":[
                "#FF7B00",
                "#FFBB00",
                "#FF7B00"
            ],
            "frozen":[
                "#FF7B00",
                "#FFBB00",
                "#FF7B00"
            ],
            "shadow":[
                "#FF7B00",
                "#FFBB00",
                "#FF7B00"
            ],
            "dark":[
                "#FF7B00",
                "#FFBB00",
                "#FF7B00"
            ]
        }
        var gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, colors[res.data.rarity.value][0]);
        gradient.addColorStop(0.5, colors[res.data.rarity.value][1]);
        gradient.addColorStop(1, colors[res.data.rarity.value][2]);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512)
        loadImage(res.data.images.icon).then((image) => {
            ctx.drawImage(image, 0, 0, 512, 512)
            loadImage(`https://cdn.glitch.com/e0a62737-efb4-4dbe-9768-8579bd913488%2Fcard_bottom_mythic.png?v=1603671079787`).then((image) => {
                ctx.drawImage(image, 0, 81, 512, 431)
                // COSMETIC NAME
                ctx.fillStyle = 'white'
                registerFont('Burbank Big Condensed Black 700.ttf', { family: 'Burbank Big Condensed Black' })
                ctx.font = '36px Burbank Big Condensed'
                var n = res.data.name;
                var t = ctx.measureText(n);
                ctx.fillText(n, (512-t.width)/2, 446)
                // COSMETIC PRICE
                ctx.fillStyle = 'white'
                registerFont('Burbank Big Condensed Black 700.ttf', { family: 'Burbank Big Condensed Black' })
                ctx.font = '36px Burbank Big Condensed'
                var n = i.price;
                var t = ctx.measureText(n);
                ctx.fillText(n, 430-t.width, 502)
                const attach = new Discord.MessageAttachment(canvas.toBuffer(), 'cosmetic.png')
                message.channel.send(attach)
/*
const embed = new Discord.RichEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL)
.attachFiles([attach]) o .attachFile(attach)
.setImage('attachment://nombre.png') <- El mismo nombre y formato.
message.channel.send(embed)
*/
            })
        })
    })
}