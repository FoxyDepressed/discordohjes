const { Client, Collection } = require("discord.js");
const fs = require("fs");
const botconfig = require("./botconfig.json");
const { config } = require("dotenv");
const chalk = require("chalk");
const Enmap = require("enmap");
const sql = require("sqlite");

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config({
    path: __dirname + "/.env"
});

client.on("message", async message => {
    const prefix = "?";
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command)
        command.run(client, message, args);
});


["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
client.on("guildMemberAdd", async member => {
    console.log(`${member.id} joined the server`);
    let welcomechannel = member.guild.channels.find(`name`, "foxy-logs");
    welcomechannel.send(`LOOK OUT EVERYONE! ${member} has joined!`);
});
client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
  });

  client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
  });
  
client.on("guildMemberRemove", async member => {
    console.log(`${member.id} left the server`);
    let welcomechannel = member.guild.channels.find(`name`, "foxy-logs");
    welcomechannel.send(`GOOD RIDDANCE! ${member} has failed!`);
});

  
client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "me getting developed",
            type: "STREAMING"
        }
    
    }); 
});


client.login(botconfig.token);