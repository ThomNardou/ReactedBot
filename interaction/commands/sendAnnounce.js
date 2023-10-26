const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("annonce")
        .setDescription("fais rejoindre le bot discord dans un vocal"),
    async execute(interaction, client) {

        try {
            const channel = client.channels.cache.get('1167138304152576184');

            interaction.reply({
                content: "✅ Le message à bien été envoyé dans : <#" + channel.id + ">.",
                ephemeral: true
            });
            
            channel.send("test");
        }
        catch (error){
            interaction.reply({
                content: "❌ Une erreur c'est produite : " + error,
                ephemeral: true
            });
        }


    }
}