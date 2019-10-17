module.exports = {
	name: 'server-info',
	description: 'Display server information',
	execute(message, args) {
		message.channel.send(`This server is called: ${message.guild.name}\nThe number of users in this server is: ${message.guild.memberCount}`);
	},
};