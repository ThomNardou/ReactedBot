const {SlashCommandBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("ping la lantence du bot"),
    async execute(interaction, client) {
        interaction.reply({
            content: "baise ta salope de mère",
            ephemeral: false
        });
    }
}