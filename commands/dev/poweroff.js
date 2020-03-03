module.exports = {
	name: "poweroff",
	description: "powers off the bot",
	category: "dev",
	run: async (client, message, args) => {
        if (message.author.id !== '325650502769573888') return;
        message.channel.send(`${client.user.username} Has successfully powered off.`).then(() => {
            process.exit(1);
        });
    }
}