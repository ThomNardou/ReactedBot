const {SlashCommandBuilder} = require("discord.js");
const discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Connaitre les infos d'un utilisateur")
        .addStringOption(option => 
            option.setName("pseudo")
                .setDescription("Pseudo du joueur (avec @)")
                .setRequired(false)
        ),

    async execute(interaction) {

        let now = new Date();
        let user = "";
        let test = "";

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        let pseudo = interaction.options.getString("pseudo");

        if (pseudo === null) {
            user = interaction.user;
            test = interaction.member;
        }
        else {
            const userId = pseudo.replace("<@", "").replace(">", "");
            const memberId = pseudo.replace("<@", "").replace(">", "");

            user = interaction.guild.members.cache.get(userId)?.user;
            test = interaction.guild.members.cache.get(memberId);
        }

        let creationDate = user.createdAt;
        const formattedDate = `${creationDate.getDate()}/${creationDate.getMonth() + 1}/${creationDate.getFullYear()}`;

        let joinDate = test.joinedAt;
        const formattedDateJoin = `${joinDate.getDate()}/${joinDate.getMonth() + 1}/${joinDate.getFullYear()}`;

        const embed = new discord.EmbedBuilder()
    
      
        embed
            .setTitle(`*Information de ${user.tag}*`)
            .setDescription(
                `**Date de création du compte :**
                ${formattedDate}
                
                **Date d'entrée :**
                ${formattedDateJoin}`
            )
            .setColor('#00FFB9')
            .setImage('https://i.imgur.com/JXj36lU.png')
            .setFooter({
                text: `${now.toLocaleString('fr-FR', options)}`
        });
        

        interaction.reply({embeds: [embed] });
    }
}