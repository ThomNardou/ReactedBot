const discord = require("discord.js");
const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sondage")
        .setDescription("Permet de créer un sondage")
        .addStringOption(option =>
            option.setName('titre')
                .setDescription('Titre du message')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('optiona')
                .setDescription('Première Option')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('optionb')
                    .setDescription('Deuxième option')
                    .setRequired(true)),


    async execute(interaction, client) {

        let title = interaction.options.getString('titre');
        let firstOption = interaction.options.getString('optiona');
        let secondOption = interaction.options.getString('optionb');
        const channel = client.channels.cache.get('1167138304152576184');
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
                .setDescription(`1️⃣ : ${firstOption}\n\n2️⃣ : ${secondOption}`)
                .setColor('#6800FF')
                .setImage('https://i.imgur.com/JXj36lU.png')
                .setFooter({
                    text: `${now.toLocaleString('fr-FR', options)}`
                });
            
            interaction.reply({
                content: "✅ Le Sondage à bien été envoyé dans : <#" + channel.id + ">.",
                ephemeral: true
            });

            let reaction = await channel.send({ embeds: [embed] });
            await reaction.react("1️⃣");
            await reaction.react("2️⃣");
        }
        catch (error){
            interaction.reply({
                content: "❌ Une erreur c'est produite : " + error,
                ephemeral: true
            });
        }


    }
}