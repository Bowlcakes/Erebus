module.exports = {
	name: 'unmute',
	description: 'unmutes mentioned user',
	execute(message, args) {
		const target = message.mentions.users.first();
		if (target) {
			let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
			let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

			let memberTarget = message.guild.members.cache.get(target.id);

			memberTarget.roles.add(mainRole);
			memberTarget.roles.remove(muteRole);
			message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
		} else {
			message.channel.reply("Couldn't find that user.")
		}

	}
}