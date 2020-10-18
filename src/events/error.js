module.exports = {
    name: "error",
    function: function (errorString) {
        console.error(require("chalk").bold.red(errorString));
    },
};
