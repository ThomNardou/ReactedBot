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



module.exports = {
    data: new SlashCommandBuilder()
        .setName("topmoney")
        .setDescription("permet de connaitre le top money du serveur")
        .addIntegerOption(option => 
            option.setName("nombre")
                .setDescription("limition des résultats")
                .setRequired(true)
        ),
    async execute(interaction) {
        
        let number = interaction.options.getInteger("nombre");

        db.connect(async (err) => {

            if (err) {
              console.error("Error connecting to MySQL:", err);
            } 
            else {

                console.log("Connected to MySQL database.");

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
                    db.query(`SELECT * FROM user_money ORDER BY money DESC LIMIT ${number}`, function (error, results) {
                    
                        if (error) throw error;
                        
                        results.map((res) => {
                            content = content +  "["+ place + "] "+ res.name + " : " + res.money + "\n";
                            ++place;
                        })
                        
                        const embed = new discord.EmbedBuilder()
                            .setTitle("Top Money :")
                            .setDescription(content)
                            .setColor('#FF0059')
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

        });
    }
}