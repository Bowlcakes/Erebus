const Discord = require('discord.js');

module.exports = {
	name: 'ban',
	description: 'bans a user',
	execute(message, args, embedFooter) {
		const victim = message.mentions.users.first();
		if(!victim) return message.reply("You must say who you wish to ban");
		if (!args[1]) return message.reply('You must give a reason');

		const reason = args.slice(1).join(' ') || 'No reason specified.';

		let dmEmbed = new Discord.MessageEmbed()
			.setDescription(`**You've been banned from ${message.guild.name}**`)
			.setColor('#ff0000')
			.addField('Banned by', message.author)
			.addField('Reason', (reason))
			.setFooter(embedFooter)
			.setTimestamp();
		console.log(reason);

		victim.send(dmEmbed);

		if (message.member.permissions.has("BAN_MEMBERS")) {

			if (victim) {
				const memberTarget = message.guild.members.cache.get(victim.id);
				memberTarget.ban();
				message.channel.send('User has been banned, get rekt');
			} else {
				message.channel.send("You couldn't ban that member.");
			}

		} else {
			message.channel.send("You do not have the permissions to do this.");
		}

	}

}