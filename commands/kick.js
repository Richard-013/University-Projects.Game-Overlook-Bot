module.exports = {
	name: 'kick',
	description: 'Suggest kicking user',
	execute(message, args) {
		// Checks if a user was mentioned before executing the command
		if(!message.mentions.users.size) {
			// message.reply() automatically tags the message sender in the response
			return message.reply('You have to mention someone to ask to kick them');
		}
		// Gets the first user tagged in the arguments
		const taggedUser = message.mentions.users.first();
		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	},
};