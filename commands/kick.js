module.exports = {
	name: 'kick',
	description: 'Suggest kicking user',
	args: true,
	usage: '<user>',
	guildOnly: true,
	execute(message, args) {
		// Gets the first user tagged in the arguments
		const taggedUser = args[0];
		message.channel.send(`You wanted to kick: ${taggedUser}`);
	},
};