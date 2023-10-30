const {Client, GatewayIntentBits, Collection, Events} = require('discord.js');
const {SlashCommandBuilder} = require("discord.js");
const discord = require("discord.js");
const mysql = require("mysql");

const db = mysql.createConnection({
    host: `${process.env.HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
});

db.connect(async (err) => {

    if (err) {
      console.error("Error connecting to MySQL:", err);
    } 
    else {
        console.log("Connected to MySQL database.");
    }

});

module.exports = {
    data: new SlashCommandBuilder()
        .setName("class")
        .setDescription("permet de connaitre la classe d'un joueur")
        .addStringOption(option => 
            option.setName("pseudo")
                .setDescription("Pseudo du joueur")
                .setRequired(true)
        ),

    async execute(interaction) {
        
        let pseudo = interaction.options.getString("pseudo");
        let content = "";

        let now = new Date();

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        try
        {
            db.query(`SELECT * FROM players WHERE name LIKE "${pseudo}%"`, function (error, results) {

                if (error) {
                    interaction.reply({
                        content: `❌ Le Pseudo que vous avez rentrez n'existe pas`,
                        ephemeral: true
                    });
                    return;
                }
                
                results.map((res) => {
                    content = content + res.class;
                });
                
                const embed = new discord.EmbedBuilder()
                    .setTitle(`Classe de ${pseudo} : `)
                    .setDescription(content)
                    .setColor('#9E00FF')
                    .setImage('https://i.imgur.com/JXj36lU.png')
                    .setFooter({
                        text: `${now.toLocaleString('fr-FR', options)}`
                });

                interaction.reply({ embeds: [embed] });
                
            });
        }
        catch(err) {
            console.log(err);
        }
            
        
    }
}