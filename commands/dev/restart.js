module.exports = {
	name: "restart",
	description: "restarts the bot",
	category: "dev",
	run: async (client, message, args) => {
        if(message.author.id !== "325650502769573888") return message.channel.send(`You are not the owner of ${client.user.username} cannot run this command!`);
        if(!args[0]) return message.channel.send("Please provide a command to restart.");
        let commandName = args[0].toLowerCase()

        try {
            delete require.cache[require.resolve(`./${commandName}.js`)]
            client.commands.delete(commandName);
            const pull = require(`./${commandName}.js`);
            client.commands.set(commandName, pull);
        } catch(e) {
            return message.channel.send(`Could not restart: \`${args[0].toLowerCase()}\``);
        }

        message.channel.send(`The command \`${args[0].toLowerCase()} has been restart!`);
    }
}