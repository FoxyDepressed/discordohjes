module.exports = {
    name: "credits",
    aliases: ["creds"],
    category: "info",
    description: "shows bot credits",
    run: async (client, message, args) => {
        return message.channel.send("Bot coded in Javascript by FoXy~#1449 ");
    }
}