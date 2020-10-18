module.exports = {
    name: "debug",
    function: function (debugString) {
        if (process.env.DEBUG == "TRUE") {
            console.log(require("chalk").gray.dim(`[Debug] ${debugString}`));
        }
    },
};
