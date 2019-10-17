// Require statements
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

// Set up key data from config
const prefix = config.prefix;

// Create a new Discord client
const client = new Discord.Client();
// Get the bot's token from the file it is stored in
const botToken = fs.readFileSync('DiscordToken.txt', 'utf8');

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
		// Checks if a user was mentioned before executing the command
		if(!message.mentions.users.size) {
			// message.reply() automatically tags the message sender in the response
			return message.reply('You have to mention someone to ask to kick them');
		}
		// Gets the first user tagged in the arguments
		const taggedUser = message.mentions.users.first();
		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	} else if (command === 'ping') {
		// Responds to ping with pong
		message.channel.send('pong <@' + message.author.id + '>');
	} else if (command === 'beep') {
		// Responds to beep with boop
		message.reply('boop');
	} else if (command === 'server-info') {
		// Servers are called guilds in the discord.js API
		message.channel.send(`This server is called: ${message.guild.name}\nThe number of users in this server is: ${message.guild.memberCount}`);
	} else if (command === 'user-info') {
		// Gives the user their information
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	} else if (command === 'avatar') {
		if(!message.mentions.users.size) {
			// Gives command sender's avatar url
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
		} else {
			// eslint-disable-next-line no-unused-vars
			const avatarList = message.mentions.users.map(user => {
				// Loops through all mentioned users and gives avatar URL
				return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
			});

			message.channel.send(avatarList);
		}
	}
});
