const discord = require("discord.js");
const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("suggestion")
        .setDescription("Permet d'envoyer une suggestion")
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
        let now = new Date();

        const user = interaction.author;

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
                content: "✅ La suggestion à bien été envoyé.",
                ephemeral: true
            });

            let reaction = await client.channels.cache.get('1168296700599877823').send({ embeds: [embed] });
            await reaction.react("✅");
            await reaction.react("❌");
        }
        catch (error){
            interaction.reply({
                content: "❌ Une erreur c'est produite : " + error,
                ephemeral: true
            });
        }


    }
}