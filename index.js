"use strict";

require("dotenv").config();

const chalk = require("chalk");
const Discord = require("discord.js");

console.log(chalk.grey("Running startup scripts"));
console.log(chalk.grey("These might run async. Watch the logging output bellow"));

global.Client = new Discord.Client({
    messageCacheMaxSize: 500,
    disableMentions: "everyone", //Remove this line if the bot should be able to ping @everyone
    partials: ["REACTION", "MESSAGE"],
    ws: {
        //Fucking important. You wont receive events if you dont have these.
        intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES"],
    },
});

const fs = require("fs");
const path = require("path");
fs.readdirSync("./src/events").forEach((file) => {
    const event = require(path.join(process.cwd(), "/src/events", file));
    console.log(`${chalk.green(`[${file}]`)} Listening to ${chalk.bold.gray(event.name)} events`);
    global.Client.on(event.name, event.function);
});

global.Client.login(process.env.DISCORD_BOT_TOKEN).catch(console.error);
