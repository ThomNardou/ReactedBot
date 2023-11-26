const {Client, GatewayIntentBits, Collection, Events} = require('discord.js');
const {SlashCommandBuilder} = require("discord.js");
const { StreamType, createAudioPlayer, createAudioResource, joinVoiceChannel, VoiceConnection } = require("@discordjs/voice");
const ytdl = require("ytdl-core");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("fais rejoindre le bot dans le vocal"),

    async execute(interaction) {

        const voiceConnection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        const stream = ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', { filter: 'audioonly' });

        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
        const player = createAudioPlayer();

        // voiceConnection.subscribe(player);

        player.play(resource);  
        

        player.on('stateChange', (oldState, newState) => {
            if (newState.status === 'playing') {
                console.log('Lecture audio en cours.');
            } else if (newState.status === 'idle') {
                console.log('Lecture audio terminée.');
            }
        });
        
        interaction.reply({
            content: `Le bot a bien rejoins le vocal ${interaction.member.voice.channel}`,
            ephemeral: true
        });
        
    }
}