const {Client, GatewayIntentBits, Collection, Events} = require('discord.js');
const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("clear un certain nombre de message")
        .addIntegerOption(option => 
            option.setName("nombre")
                .setDescription("supprime un certain nombre de message")
                .setRequired(true)
        ),
    async execute(interaction) {
        let number = interaction.options.getInteger("nombre");

        if (number >= 1 && number <= 100) {

            interaction.channel.bulkDelete(number);

            interaction.reply({
                content: `✅ Vous avez bien supprimé ${number} message(s)`,
                ephemeral: true
            });
        }
        else {
            interaction.reply({
                content: `❌ Le nombre de messages supprimés doit être situé entre 1 et 100`,
                ephemeral: true
            });
        }
    }
}