module.exports = {
    names: ["nuke"], //put only lower case. IS CASE SENSITIVE and will only accept lowercase
    permission: "MANAGE_ROLES", //Djs PermissionResolvable
    function: function (msg, args) {
        const idRegex = /\d{15,25}/;
        if (!args.match(idRegex)) return msg.reply("No role found!");
        const roleId = idRegex.exec(args)[0];
        if (!msg.guild.roles.cache.has(roleId)) return msg.reply("This role does not exist!");
        msg.guild.roles.cache
            .get(roleId)
            .members.array()
            .forEach((memb) => {
                memb.roles.remove(roleId);
            });
        msg.reply("Removing the roles for all members!");
    },
};
