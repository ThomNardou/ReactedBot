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
        .setName("money")
        .setDescription("permet de connaitre l'argent que possède un joueur en particulier")
        .addStringOption(option => 
            option.setName("pseudo")
                .setDescription("Pseudo du joueur à chercher")
                .setRequired(true)
        ),

    async execute(interaction) {
        
        let pseudo = interaction.options.getString("pseudo");

        let content = "";
        let place = 1;

        let now = new Date();

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        try
        {
            db.query(`SELECT * FROM user_money WHERE name LIKE "${pseudo}%"`, function (error, results) {
                
                if (results !== null) {
                    results.map((res) => {
                        content = content + res.money + "$\n";
                    })
                    
                    const embed = new discord.EmbedBuilder()
                        .setTitle(`Argent de ${pseudo} :`)
                        .setDescription(content)
                        .setColor('#3A00FF')
                        .setImage('https://i.imgur.com/JXj36lU.png')
                        .setFooter({
                            text: `${now.toLocaleString('fr-FR', options)}`
                    });
    
                    interaction.reply({ embeds: [embed] });
                }
                else {
                    const embed = new discord.EmbedBuilder()
                        .setTitle(`Aucun pseudo trouvé :`)
                        .setDescription("Le pseudo recherché n'existe pas")
                        .setColor('#3A00FF')
                        .setImage('https://i.imgur.com/JXj36lU.png')
                        .setFooter({
                            text: `${now.toLocaleString('fr-FR', options)}`
                    });
    
                    interaction.reply({ embeds: [embed] });
                }
            });
        }
        catch(err) {
            console.log(err);
        }
            
        
    }
}