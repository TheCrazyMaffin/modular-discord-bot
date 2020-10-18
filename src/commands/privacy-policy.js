module.exports = {
    names: ["privacy", "legal", "tos"], //put only lower case. IS CASE SENSITIVE and will only accept lowercase
    permission: "",
    function: function (msg, args) {
        //Put something here
        msg.channel.send("No privacy policy defined. The host of this bot has to modify `src/commands/privacy-policy.js`");
    },
};
