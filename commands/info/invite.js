module.exports = {
    name: "invite",
    description: "shows bot invite link",
    category: "info",
    run: async (client, message, args) => {
        return message.channel.send("Bot invite link!:\n\nhttps://discordapp.com/api/oauth2/authorize?client_id=663445067696046100&permissions=2147483127&scope=bot")
    }
}