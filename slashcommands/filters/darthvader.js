const delay = require('delay');
const { MessageEmbed } = require('discord.js');
const { darthvader } = require('../../settings/filter');

module.exports = { 
    name: "darthvader",
    description: "Turning on darthvader filter",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],

    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply("Turning on **Darthvader**. This may take a few seconds...");

        const player = client.manager.get(interaction.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        await player.setFilter('filters', darthvader);

        const darthvaderd = new MessageEmbed()
            .setAuthor({ name: "Turned on: Darthvader", iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif' })
            .setColor('#000001');

        await delay(5000);
        msg.edit({ content: " ", embeds: [darthvaderd] });
   }
};