module.exports = {
	name: 'kick',
	description: 'kicks a user',
	execute(message, args) {
		const victim = message.mentions.users.first();
		if(!victim) return message.reply("You must say who you wish to kick");
		if (message.member.permissions.has("KICK_MEMBERS")) {

			if (victim) {
				const memberTarget = message.guild.members.cache.get(victim.id);
				memberTarget.kick();
				message.channel.send('User has been kicked');
			} else {
				message.channel.send("You couldn't kick that member.");
			}

		} else {
			message.channel.send("You do not have the permissions to do this.");
		}
	}
}