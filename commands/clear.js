module.exports = {
	name: 'clear',
	description: 'clears messages',
	async execute(message, args, embedFooter) {
		//checking if the 1st argument is a valid number
		if (!args[0]) return message.channel.send('Please specify how many messages to clear');
		if (isNaN(args[0])) return message.channel.send('Please enter a number');
		if (args[0] > 100) return message.channel.send('You cannot clear more than 100 messages');
		if (args[0] < 0) return message.channel.send('You must input a number more than one');

		await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
			message.channel.bulkDelete(messages)
		})

	}
}