require("dotenv").config();
const Discord = require("discord.js");
const cpuStat = require("cpu-stat");
const os = require("os");
async function getCpuUsage() {
    return new Promise((resolve, reject) => {
        cpuStat.usagePercent((err, percent, seconds) => {
            if (err) {
                reject(err);
            } else {
                resolve(percent);
            }
        });
    });
}

module.exports = {
    names: ["ping", "hello", "morning", "status"], //put only lower case. IS CASE SENSITIVE and will only accept lowercase
    permission: "", //Permissions which is required to use this command. (WWO Bot permissions) If "" it wont require any permission
    //As soon as you put a channel ID here the command will work everywhere but in that channel/these channels
    blacklistChannels: [],
    //As soon as you put a channel ID here the command will work nowhere but in that channel/these channels. The blacklist overrides the whitelist.
    whitelistChannels: [],
    function: async function (msg, args) {
        if (msg.channel && msg.author) {
            let emb = new Discord.MessageEmbed();
            emb.setColor(process.env.AMBIENT_COLOR);
            emb.setTimestamp();
            emb.setFooter(msg.author.id);
            emb.setAuthor(msg.author.tag, msg.author.displayAvatarURL());
            emb.setTitle("Bot status");
            emb.addField("Online since", global.Client.readyAt.toString(), true);
            emb.addField("Websocket", `${global.Client.ws.gateway}, Status ${global.Client.ws.status}`, true);
            emb.addField("Websocket ping", `${global.Client.ws.ping}ms`, true);
            emb.addField("Cached users", global.Client.users.cache.size, true);
            emb.addField("Cores", cpuStat.totalCores(), true);
            emb.addField("CPU usage", `${Math.round((await getCpuUsage()) * 100) / 100}%`, true);
            emb.addField("Average clock speed", `${cpuStat.avgClockMHz()}MHz`, true);
            emb.addField("RAM usage", `${Math.floor((os.totalmem() - os.freemem()) / 1000 / 1000)}MB`, true);
            msg.channel.send(emb);
        }
    },
};
