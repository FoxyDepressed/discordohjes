const { RichEmbed } = require("discord.js");
module.exports = {
    name: "setdesc",
    category: "info",
    description: "set your own description",
    run: async (client, message, args) => {
        const sql = require("sqlite");
        sql.open("./descriptions/descriptions.sqlite");
        var args = message.content.split(" ").slice(1).join(" ");
        if (!args){
            var embed = new RichEmbed()
            .setColor("RANDOM")
            .setTitle("Error")
            .setDescription("No text inserted, cannot add description to database!")
            return message.channel.send(embed);
        }
        sql.get(`SELECT * FROM descriptions WHERE userId = "${message.author.id}"`).then(row => {
            if (!row) {
                sql.run("INSERT INTO descriptions (userId, desc) VALUES (?, ?)", [message.author.id, args]);
            } else {
                sql.run(`UPDATE descriptions SET desc = "${args}" WHERE userId = ${message.author.id}`);
            }
            }).catch(() => {
                console.error;
                sql.run("CREATE TABLE IF NOT EXISTS descriptions (userId TEXT, desc TEXT)").then(() => {
                    sql.run("INSERT INTO descriptions (userId, desc) VALUES (?, ?)", [message.author.id, args]);
                });
        });
            message.reply("Your description has been set successfully!");
        }
    }