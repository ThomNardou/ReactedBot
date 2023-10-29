const {Client, GatewayIntentBits, Collection, Events} = require('discord.js');
const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("ping la lantence du bot"),
    async execute(interaction) {
        await interaction.deferReply()
        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;
        
        if (ping >= 500) {
            await interaction.editReply(`❌ le ping est de: ${ping}ms.`)
        }
        else {
            await interaction.editReply(`✅ le ping est de: ${ping}ms.`)
        }
    }
}