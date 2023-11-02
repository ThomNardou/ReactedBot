const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const { SlashCommandBuilder } = require("discord.js");
const { StreamType, createAudioPlayer, createAudioResource, joinVoiceChannel } = require("@discordjs/voice");
const ytdl = require("ytdl-core-discord");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("Fais rejoindre le bot dans le vocal"),

    async execute(interaction) {
        if (!interaction.member.voice.channel) {
            return interaction.reply({
                content: "Vous devez être dans un salon vocal pour utiliser cette commande.",
                ephemeral: true
            });
        }

        const voiceConnection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        const stream = ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley', { filter: 'audioonly' });

        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary, volume: 1.0 });

        const player = createAudioPlayer();

        voiceConnection.subscribe(player);

        player.play(resource);

        interaction.reply({
            content: `Le bot a bien rejoint le vocal ${interaction.member.voice.channel}`,
            ephemeral: true
        });
    }
};
