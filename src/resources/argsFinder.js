module.exports = {
    regex: {
        messageLink: /http(s)?\:\/\/(canary\.)?(ptb\.)?discord(app)?\.com\/channels\/(?<serverId>[0-9]{15,20})\/(?<channelId>[0-9]{15,20})\/(?<messageId>[0-9]{15,20})/g,
    },
    findMessageLinks: function (args) {
        let results = args.matchAll(this.regex.messageLink);
        let resArr = [];
        for (const res of results) {
            let { serverId, channelId, messageId } = res.groups;
            resArr.push({
                serverId,
                channelId,
                messageId,
                raw: res[0],
            });
        }
        return resArr;
    },
};
