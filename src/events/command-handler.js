const fs = require("fs");
const path = require("path");
module.exports = {
    name: "message",
    function: function (message) {
        if (message.author && message.content && !message.author.bot && message.content.startsWith(process.env.DISCORD_BOT_PREFIX)) {
            const command = message.content.substring(process.env.DISCORD_BOT_PREFIX.length).split(" ")[0].toLowerCase();
            fs.readdirSync(path.join(process.cwd(), "/src/commands")).forEach(async (file) => {
                const commandModule = require(path.join(process.cwd(), "/src/commands/", file));
                if (commandModule.names.includes(command)) {
                    message.reply = async function (messageText, deleteTimeout = 5000) {
                        let re = await message.channel.send(messageText);
                        setTimeout(() => {
                            message.delete();
                            re.delete();
                        }, deleteTimeout);
                    };
                    function executeCommand() {
                        commandModule.function(message, message.content.substring(process.env.DISCORD_BOT_PREFIX.length).substring(command.length + 1));
                    }
                    if (!message.member) return;
                    if (message.member.hasPermission(commandModule.permission)) {
                        executeCommand();
                    } else {
                        message.reply("Insufficient permissions");
                    }
                }
            });
        }
    },
};
