const {Client, GatewayIntentBits, Collection, Events, ActivityType} = require('discord.js');
const { AuditLogEvent } = require('discord.js');
const logs = require("discord-logs");

const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();
const interactionCommands = new Collection()
module.exports.interactionCommands = interactionCommands
require("./interaction/commandsManager");
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
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
    member.guild.channels.cache.find(chan => chan.id === "1167138304152576184").send("coucou");
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