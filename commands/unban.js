module.exports = {
	name: "unban",
	description: 'unbans a user',
	execute(message, args) {

		const victim = args[0]

		if (message.member.permissions.has("BAN_MEMBERS")) {

			if (victim.length === 18) {

				message.guild.members.unban(victim);
				message.channel.send("The user has been unbanned.");

			} else message.channel.send("Make sure you're using the user's id.");

		} else {
			message.channel.send("you don't have the permissions to do that.");
		}

	}
}     