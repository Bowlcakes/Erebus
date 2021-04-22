let Discord = require('discord.js');
const ms = require('ms');
module.exports = {
	name: 'mute',
	description: 'mutes mentioned user',
	execute(message, args, embedFooter) {
		const target = message.mentions.users.first();

		if (target.id === message.author.id) { return message.channel.send("You cannot mute yourself"); }
		if (target) {
			let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
			let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
			if (!muteRole) return message.reply("The mute role does not exist.");
			let memberTarget = message.guild.members.cache.get(target.id);
			let guildName = message.guild.name;

			let mutedEmbed = new Discord.MessageEmbed()
				.setDescription(`**You've been muted in ${guildName}**`)
				.setColor("#000000")
				.addField('Muted by', message.author)
				.setFooter(embedFooter)
				.setTimestamp()

			let timedMuteEmbed = new Discord.MessageEmbed()
				.setDescription(`**You've been muted in ${guildName}**`)
				.setColor('#000000')
				.addField('Muted by', message.author)
				.addField('Time', args[1])
				.setFooter(embedFooter)
				.setTimestamp();

			let muteTimeoutEmbed = new Discord.MessageEmbed()
				.setDescription(`**You're mute in ${guildName} has worn off**`)
				.setColor("#00ff00")
				.addField("Be good", `or I'll do it again`)
				.setFooter(embedFooter)
				.setTimestamp();

			if (!args[1]) {
				memberTarget.roles.remove(mainRole);
				memberTarget.roles.add(muteRole);
				message.channel.send(`<@${memberTarget.user.id}> has been muted`);
				memberTarget.send(mutedEmbed);
			} else {
				memberTarget.roles.remove(mainRole);
				memberTarget.roles.add(muteRole);
				message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);
				memberTarget.send(timedMuteEmbed);

				setTimeout(function () {
					memberTarget.roles.add(mainRole);
					memberTarget.roles.remove(muteRole);
					message.guild.channels.cache.get('798369919723896903').send(`<@${memberTarget.user.id}> has been unmuted`);
					memberTarget.send(muteTimeoutEmbed);
				}, ms(args[1]));
			}
		} else {
			message.channel.send("Couldn't find that user.");
		}


	}
}