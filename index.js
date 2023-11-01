const {Client, GatewayIntentBits, Collection, Events, ActivityType} = require('discord.js');
const discord = require("discord.js");

const fs = require("node:fs");
const path = require("node:path");
const Jimp = require('jimp');
require("dotenv").config();
const interactionCommands = new Collection()
module.exports.interactionCommands = interactionCommands
require("./interaction/commandsManager");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
})


client.on("ready", () => {

    function randomStatus() {
        let status = [
            "sulfuritium.fr:19132",
            "dsc.gg/sulfuritium"
        ]
        let rstatus = Math.floor(Math.random() * status.length)

        client.user.setActivity({
            name: `${status[rstatus]}`,
            type: ActivityType.Watching,
        });
    };

    setInterval(randomStatus, 3000);
});

client.on("guildMemberAdd", member => {
    let now = new Date();

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const channel = member.guild.channels.cache.find(ch => ch.id === '1168296700599877823');
    const embed = new discord.EmbedBuilder()
        .setTitle("Nouveau Membre : ")
        .setDescription(`Bienvenue à ${member} sur le serveur !\n\n**rejoint le** : ${now.toLocaleString('fr-FR', options)} (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`)
        .setColor('#00FF59')
        .setThumbnail(member.user.displayAvatarURL())

    channel.send({embeds: [embed] });
});

client.on("guildMemberRemove", member => {

    const channel = member.guild.channels.cache.find(ch => ch.id === '1168296700599877823');
    const embed = new discord.EmbedBuilder()
        .setTitle("Au revoir : ")
        .setDescription(`Au revoir à ${member} ! Qui vient de quitter le serveur `)
        .setColor('FF0000')
        .setThumbnail(member.user.displayAvatarURL())

    channel.send({embeds: [embed] });
    
});

registerEvents();
function registerEvents(){
    const eventFiles = fs.readdirSync(path.join(__dirname, "events"));
    for (const eventFile of eventFiles){
        const event = require(path.join(__dirname, "events", eventFile));
        if (event.once){
            client.once(event.name,(...arguments) => {event.run(...arguments)})
        }else {
            client.on(event.name,(...arguments) => {event.run(...arguments,client)})
        }
    }
}
client.login(process.env.TOKEN).then(r => console.log("Connection établie"));