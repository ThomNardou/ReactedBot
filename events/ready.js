const {Events} = require("discord.js");
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "sulfuritium",
});

module.exports = {
    name: Events.ClientReady,
    once: false,
    async run(event){
       
    }
}