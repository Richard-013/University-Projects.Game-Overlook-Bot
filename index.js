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
	if(!message.content.startsWith(prefix) || message.author.bot) return;
    
	// Gets everything after the command prefix and splits it whenever there's whitespace (uses Regex)
	const args = message.content.slice(prefix.length).split(/ +/);
	// shift() removes the first element of the array and returns it, here it removes the command name and stores it in the command constant
	const command = args.shift().toLowerCase();

	if (command === 'kick') {
		client.commands.get('kick').execute(message, args);
	} else if (command === 'ping') {
		client.commands.get('ping').execute(message, args);
	} else if (command === 'beep') {
		client.commands.get('beep').execute(message, args);
	} else if (command === 'server') {
		client.commands.get('server').execute(message, args);
	} else if (command === 'avatar') {
		client.commands.get('avatar').execute(message, args);
	}
});
