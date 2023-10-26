const {Client, GatewayIntentBits, Collection, Events} = require('discord.js');
const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("annonce")
        .setDescription("Envoie un message dans un salon")
        .addStringOption(option =>
            option.setName('message')
                .setDescription('test')
                .setRequired(true)),
    async execute(interaction, client) {

        let message = interaction.options.getString('message');

        try {
            const channel = client.channels.cache.get('1167138304152576184');

            interaction.reply({
                content: "✅ Le message à bien été envoyé dans : <#" + channel.id + ">.",
                ephemeral: true
            });

            channel.send(message);
        }
        catch (error){
            interaction.reply({
                content: "❌ Une erreur c'est produite : " + error,
                ephemeral: true
            });
        }


    }
}