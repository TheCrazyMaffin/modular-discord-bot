const chalk = require("chalk");
module.exports = {
    name: "ready",
    function: function () {
        console.log(
            chalk.green(`Logged in as ${chalk.bold(global.Client.user.tag)}`)
        );
        console.log(
            `${chalk.bold.gray(
                `${
                    global.Client.guilds.cache.filter(
                        (guild) => guild.available
                    ).size
                }/${global.Client.guilds.cache.size}`
            )} guilds are available`
        );
    },
};
