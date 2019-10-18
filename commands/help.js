const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			// Adds an opening message to the data array
			data.push('Here\'s a list of all my commands:');
			// Creates a list of commands in the data array
			data.push(commands.map(command => command.name).join(', '));
			// Adds a closing message to the data array
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			// Sends the data array as a DM
			return message.author.send(data, { split: true })
				.then(() => {
					// If the message was able to send as a DM, tell the user
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					// If the message could not be sent as a DM, tell the user this instead
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
				});
		} else {
			// Help message when one command is specified
			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

			if (!command) {
				return message.reply('that\'s not a valid command!');
			}

			data.push(`**Name:** ${command.name}`);

			if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
			if (command.description) data.push(`**Description:** ${command.description}`);
			if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

			message.channel.send(data, { split: true });
		}
	},
};