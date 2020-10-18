module.exports = {
    names: ["createparty", "party"], //put only lower case. IS CASE SENSITIVE and will only accept lowercase
    permission: ["MANAGE_ROLES", "MANAGE_MESSAGES"], //Djs PermissionResolvable
    function: async function (msg, args) {
        //Usage: ?party partyRole PartySize Message
        const argsRegex = /<@&(?<roleId>\d{15,25})> (?<playercount>\d{1,10}) (?<message>[\s\S]*?$)/;
        if (!argsRegex.test(args)) return msg.reply("Usage: `?party @partyRole <PartySize> <message>`. Use atEveryone to mention @everyone");
        msg.delete();
        const { message, playercount, roleId } = argsRegex.exec(args).groups;
        const messageReactionFilter = (reaction, user) => reaction.emoji.name == "✅" && !msg.guild.member(user).roles.cache.has(roleId);
        const sentMessage = await msg.channel.send(
            `${message.replace(/ateveryone/gi, "@everyone")}\n\n_React with ✅ to enter. ${playercount} participants._`,
            {
                disableMentions: "none",
            }
        );
        sentMessage.react("✅");
        const ReactionCollector = sentMessage.createReactionCollector(messageReactionFilter, { maxUsers: parseInt(playercount), time: 600000 });
        ReactionCollector.on("end", (collected, reason) => {
            sentMessage.edit(`${message.replace(/ateveryone/gi, "@everyone")}\n\n_The party is over. You cannot enter anymore._`);
            sentMessage.reactions.removeAll();
            collected = collected.array().filter((MesReact) => MesReact.emoji.name == "✅")[0].users.cache;
            collected.forEach((el) => {
                if (el.id == global.Client.user.id) return;
                msg.guild.member(el).roles.add(roleId);
            });
        });
    },
};
