import fetch from 'node-fetch';
import { Client, EmbedBuilder } from 'discord.js';
import config from './config.js';
import { GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: Object.values(GatewayIntentBits), });

client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`);
    update();
    setInterval(update, 60000);
});

client.login(config.bot.token);

async function update() {
    const response = await fetch(`${config.api}client?page=1&limit=1`, { headers: { 'Authorization': `Bearer ${config.key}`, 'Content-Type': 'application/json' } });
    const data = await response.json();
    const fields = (await Promise.all(data.data.map(async (server) => {
        if (config.filteredServers.includes(server.attributes.name)) return;

        const w = await fetch(`${config.api}client/servers/${server.attributes.uuid}/resources`, {headers: {'Authorization': `Bearer ${config.key}`,'Content-Type': 'application/json'}});
        const isSuspended = !w.ok;
        const wdata = isSuspended ? null : await w.json();

        return {
            name: `${server.attributes.name}`,
            value: isSuspended ?
                "```Server is suspended```" :
                `\`\`\`Status: ${wdata.attributes.current_state}\nCPU: ${wdata.attributes.resources.cpu_absolute}%\nRAM: ${Math.floor(wdata.attributes.resources.memory_bytes / 1000000)}MB\nDisk: ${Math.floor(wdata.attributes.resources.disk_bytes / 1000000)}MB\`\`\``,
            inline: true
        };
    }))).filter(field => field);

    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Pterodactyl Status', iconURL: 'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_9f7bed1018bc7ad75c94da92c83c76de/pterodactyl-panel.png' })
        .setFooter({ text: `Listening ${config.api}` })
        .setColor("Blue")
        .setTimestamp(new Date())
        .addFields(fields);

    const channel = await client.channels.cache.get(config.bot.channels.status);
    const messages = await channel.messages.fetch({ limit: 10 });
    const lastMessage = messages.filter(x => x.author.id === client.user.id).last();

    if (!lastMessage)await channel.send({ embeds: [embed] });
    else await lastMessage.edit({ embeds: [embed] });
}