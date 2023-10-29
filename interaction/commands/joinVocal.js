const {Client, GatewayIntentBits, Collection, Events} = require('discord.js');
const {SlashCommandBuilder} = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("fais rejoindre le bot dans le vocal")
        .addChannelOption(option => 
            option.setName("channel")
                .setDescription("Channel que le bot doit rejoindre")
                .setRequired(true)
        ),

    async execute(interaction) {
        const voiceChannel = interaction.options.getChannel('channel');
        const voiceConnection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        if (voiceConnection) {
            interaction.reply({
                content: `Le bot à bien rejoins le vocal ${interaction.options.getChannel('channel')}`,
                ephemeral: true
            });
        }

    }
}