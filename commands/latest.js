const Parser = require('rss-parser');
const rssURL = 'https://www.gameoverlook.com/posts?format=rss';

module.exports = {
	name: 'latest',
	description: 'Gets you the latest post from Game Overlook',
	usage: '[latest]',
	execute(message, args) {
		const parser = new Parser();
		
		parser.parseURL(rssURL, (err, feed) => {
			if (err) throw err;
			const entry = feed.items[0];
			const responseMessage = '\'' + entry.title + '\' by ' + entry.creator + ':\n' + entry.link;
			message.channel.send(responseMessage);
		});
	},
};