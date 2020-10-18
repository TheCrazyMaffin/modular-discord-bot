module.exports = {
    name: "warn",
    function: function (warnString) {
        console.log(require("chalk").yellow(`[Warn] ${warnString}`));
    },
};
