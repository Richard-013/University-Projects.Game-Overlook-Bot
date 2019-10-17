module.exports = {
	name: 'avatar',
	description: 'Get avatar URLs of mentioned users or yourself',
	execute(message, args) {
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
	},
};