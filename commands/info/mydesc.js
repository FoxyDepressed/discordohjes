module.exports = {
    name: "mydesc",
    category: "info",
    description: "shows your description",
    run: async (client, message, args) => {
        const sql = require("sqlite");
        sql.open("./descriptions/descriptions.sqlite");
        sql.get(`SELECT * FROM descriptions WHERE userId = "${message.author.id}"`).then(row => {
            message.reply("Your description is: ```" + row.desc + "```");
        });
    }
}