const discord = require("discord.js");
const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("annonce")
        .setDescription("Envoie un message dans un salon")
        .addChannelOption(option => 
            option.setName("channel")
                .setDescription("Channel que le bot doit rejoindre")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('titre')
                .setDescription('Titre du message')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Contenu du message')
                .setRequired(true)),

    async execute(interaction, client) {

        let title = interaction.options.getString('titre');
        let message = interaction.options.getString('message');
        let channelId = interaction.options.getChannel('channel');

        const channel = client.channels.cache.get(channelId.id);
        let now = new Date();

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
 
        try {
            const embed = new discord.EmbedBuilder()
                .setTitle(title)
                .setDescription(message)
                .setColor('#FF00B6')
                .setImage('https://i.imgur.com/JXj36lU.png')
                .setFooter({
                    text: `${now.toLocaleString('fr-FR', options)}`
            });
            
            interaction.reply({
                content: "✅ Le message à bien été envoyé dans : <#" + channel.id + ">.",
                ephemeral: true
            });

            channel.send({ embeds: [embed] });
        }
        catch (error){
            interaction.reply({
                content: "❌ Une erreur c'est produite : " + error,
                ephemeral: true
            });
        }


    }
}