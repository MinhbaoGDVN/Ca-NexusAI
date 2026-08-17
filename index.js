require("dotenv").config();

const http = require("http");
const {
    Client,
    GatewayIntentBits,
    Events
} = require("discord.js");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8"
    });

    res.end("Ca-NexusAI is online.\n");
});

server.listen(PORT, () => {
    console.log(`HTTP server running on port ${PORT}`);
});

// ================================
// DISCORD CLIENT
// ================================

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// ================================
// BOT READY
// ================================

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ca-NexusAI đã online dưới tên ${readyClient.user.tag}`);
});

// ================================
// MESSAGE TEST
// ================================

client.on(Events.MessageCreate, async (message) => {
    // Bỏ qua tin nhắn của bot
    if (message.author.bot) return;

    // Test bot
    if (message.content === "!ping") {
        await message.reply("Pong! Ca-NexusAI đang hoạt động.");
    }
});

// ================================
// LOGIN
// ================================

if (!process.env.DISCORD_TOKEN) {
    console.error("Không tìm thấy DISCORD_TOKEN!");
    process.exit(1);
}

client.login(process.env.DISCORD_TOKEN);
