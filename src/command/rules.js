//  npm Discord
const Discord = require("discord.js");
//  Usuario del Bot de Discord
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});

exports.run = async (client, message, args) => {
    if(message.author.id!=='438390132538605589') return;
    //if(message.channel.id!=='712295197580460193') return;
    message.delete()
    const Rules = new Discord.MessageEmbed()
        .setTitle(`**${message.guild.name}**`)
        .setDescription(`**Bienvenido/a a esta pequeña comunidad de gente. Aqui podras hablar de cualquier tema sin tener que censurarte, aqui eres libre, habla y disfruta como quieras!**`)
        .setColor('#EF9237')
        .setThumbnail(message.guild.iconURL({dynamic: true,format: 'png'}))
    const Rules2 = new Discord.MessageEmbed()
        .setTitle(`**REGLAS I INFORMACIÓN**`)
        .setDescription('**:warning: - Estas reglas son una base y puedes ser sancionado por otros motivos no nombrados a continuacion, se racional a la hora de actuar y no causes problemas. Tambien añadir que al ser un servidor para pasar el rato y divertirse, a la minima seras sancionado si no mantienes un buen ambiente.**')
        .addField('**1# - RESPETO**','**Respeta a todos los usuarios del servidor y no discrimines a nadie por ningun motivo. Tampoco hables de temas personales de otra persona o que afecten a alguien.**',false)
        .addField('**2# - CANALES**','**Usa los canales correctamente, evita usar comandos fuera de sus propios canales y no hagas flood con ellos.**',false)
        .addField('**3# - MULTIMEDIA**','**No compartas ningun tipo de contenido sensible, abusivo o que no cumpla la normativa de Discord.**',false)
        .addField('**4# - NSFW O SIMILARES**','**Queda totalmente prohibido enviar cualquier contenido NSFW fuera de su canal.**',false)
        .addField('**5# - INVITACIONES**','**Evita invitar gente toxica, spammer o que pueda molestar al servidor. Tampoco compartas ni hagas promocion del servidor en aquellos lugares donde no esta permitido.**',false)
        .addField('**6# - CANALES DE VOZ**','**No molestes a otros miembros poniendo musica/sonidos molestos y evita usar moduladores que sean molestos.**',false)
        .setColor('#EF9237')
    const Rules3 = new Discord.MessageEmbed()
        .setTitle(`**CANALES**`)
        .addField(`${client.emojis.cache.get("832907180843204679")} **- NORMAS**`, `Aqui podras revisar la normativa del servidor y informacion de interes.`,false)
        .addField(`${client.emojis.cache.get("832907180990267412")} **- AUTOROLES**`, `Consigue roles que te representen, te gusten o desbloquea funciones.`,false)
        .addField(`${client.emojis.cache.get("832911745265434654")} **- ANUNCIOS**`, `Enterate de todas las novedades del servidor aqui.`,false)
        .addField(`${client.emojis.cache.get("832911745265434654")} **- WALTEN NEWS**`, `Gracias a Walten podras obtener noticias de Fortnite, Apex Legends, Brawl Stars entre otros muchos juegos.`,false)
        .addField(`${client.emojis.cache.get("832907180990267412")} **- GENERAL**`, `Habla con los miembros del servidor y pasa un buen rato.`,false)
        .addField(`${client.emojis.cache.get("832907180990267412")} **- MULTIMEDIA**`, `Comparte tus creaciones, memes o cualquier contenido NSFW que quieras.`,false)
        .addField(`${client.emojis.cache.get("832907180990267412")} **- COMANDOS**`, `Si te gusta jugar con los bots este es tu canal, aqui podras usar cualquiera de los que hay en el servidor.`,false)
        .addField(`${client.emojis.cache.get("832907180990267412")} **- PROMO**`, `Promociona tus canales y redes sociales aqui.`,false)
        .addField(`${client.emojis.cache.get("832907180990267412")} **- SUGERENCIAS**`, `Si tienes cualquier idea para cambiar o mejorar el servidor compartela aqui.`,false)
        .addField(`${client.emojis.cache.get("832914760344403969")} **- FORTNITE**`, `Enterate de todo lo nuevo de Fortnite y sus actualizaciones en estos canales.`,false)
        .addField(`${client.emojis.cache.get("832915749487378433")} **- CHARLAS**`, `Aqui puedes hablar con miembros y divertirte compartiendo tus juegos.`,false)
        .setColor('#EF9237')
    const Rules4 = new Discord.MessageEmbed()
        .setTitle(`**ROLES DEL SERVIDOR**`)
        .addField(`${client.emojis.cache.get("832275998950031370")} **- MIEMBRO**`, `Todos los usuarios tienen este rol y te proporciona acceso al uso del servidor.`,false)
        .addField(`${client.emojis.cache.get("832275998950031370")} **- LLAMA REPORTERA**`, `Los usuarios con este rol tienen permisos para publicar noticias en sus respectivos canales.`,false)
        .addField(`${client.emojis.cache.get("832275355254915123")} **- LLAMA HONORIFICA**`, `Este rol es otorgado a los usuarios que son parte del Staff de Fortnite Hispanohablante.`,false)
        .addField(`${client.emojis.cache.get("832268444682027009")} **- NITRO BOOSTER**`, `¡Mejora el servidor y disfruta de este rol y muchas otras cosas!`,false)
        .addField(`${client.emojis.cache.get("832275664131981313")} **- LLAMA MITICA**`, `Son los maximos Administradores del servidor.`,false)
        .setColor('#EF9237')
    const Rules5 = new Discord.MessageEmbed()
        .setTitle('**PROGRAMA PARTNER**')
        .setDescription('**El primer objetivo como pequeña comunidad es conseguir entrar en el Programa Partner, al cual se puede postular a los 500 miembros. Se agradece la ayuda a la hora de invitar amigos y conocidos al servidor. Cuando se alcance este objetivo se hara un gran sorteo para todos los usuarios como agradecimiento.**')
        .setColor('#7289DA')
        .setThumbnail('https://i.imgur.com/fVvM157.png')
    const Rules6 = new Discord.MessageEmbed()
        .setTitle('**MEJORA EL SERVIDOR**')
        .setDescription('**Se agradece el apoyo y soporte del servidor manteniendolo vivo y con funciones extras al mejorarlo con Nitro, aedmas consigues un asombroso rol y permisos extras.**')
        .setColor('#FF73FA')
        .setThumbnail('https://i.imgur.com/wwJXbul.png')

    message.channel.send(Rules)
    message.channel.send(Rules2)
    message.channel.send(Rules3)
    message.channel.send(Rules4)
    message.channel.send(Rules5)
    message.channel.send(Rules6)
    console.log(message.guild.iconURL())
}