// Require statements
const Discord = require('discord.js');
const fs = require('fs');

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