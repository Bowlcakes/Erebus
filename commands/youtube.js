module.exports = {
	name: 'youtube',
	description: 'Sends the link to my youtube channel',
	execute(message, args) {

		message.author.send('https://www.youtube.com/channel/UCseJOwIHCWPNzomDOoc6iLA');
		
	}
}