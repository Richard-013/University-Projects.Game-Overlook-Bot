// Require statements
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

// Set up key data from config
const prefix = config.prefix;

// Get the bot's token from the file it is stored in
const botToken = fs.readFileSync('DiscordToken.txt', 'utf8');

// Create a new Discord client
const client = new Discord.Client();
// Creates a collection of commands
client.commands = new Discord.Collection();
// Reads a list of all the command files in the commands directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// Sets a new item in the collection of commands
	// The command name acts as the key, whilst the exported command itself is the value
	client.commands.set(command.name, command);
}

// When the client is ready, run this code
// This event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// Use the token to allow the bot to login to Discord
client.login(botToken);

client.on('message', message => {
	// If a message is not a command and or it is from a bot, then ignore it
	if(message.author.bot) return;

	if (message.content.startsWith(prefix)) {
		// Gets everything after the command prefix and splits it whenever there's whitespace (uses Regex)
		const args = message.content.slice(prefix.length).split(/ +/);
		// shift() removes the first element of the array and returns it, here it removes the command name and stores it in the command constant
		const commandName = args.shift().toLowerCase();

		// Checks if a command exists, or if one has an alias to match commandName
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		// If the command doesn't exist then do nothing
		if (!command) {
			return;
		}

		// Checks if a command is a server-only command and sends a message if it is used in DMs
		if (command.guildOnly && message.channel.type !== 'text') {
			return message.reply('I can\'t execute that command inside DMs!');
		}

		// If a command requires arguments and no arguments are passed, return an message to tell the user this
		// Also tells the user what the proper usage is i.e. what arguments to provide
		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;

			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;

			return message.channel.send(reply);
		}

		try {
			// Use command variable to find and execute command
			command.execute(message, args);
		} catch (err) {
			console.error(err);
			message.reply('Yikes, that command encountered an error, try it again later');
		}
	} else {
		// Additional non-command features here
	}
    
	
});
