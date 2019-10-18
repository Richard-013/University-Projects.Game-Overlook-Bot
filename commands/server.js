module.exports = {
	name: 'server',
	description: 'Display server information',
	guildOnly: true,
	execute(message, args) {
		message.channel.send(`This server is called: ${message.guild.name}\nThe number of users in this server is: ${message.guild.memberCount}`);
	},
};