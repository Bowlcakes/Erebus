const Discord = require("discord.js");

module.exports = {
	name: 'help',
	description: 'helps',
	execute(message, args, embedFooter) {

		let helpEmbed = new Discord.MessageEmbed()
			.setDescription("**Help Commands**")
			.setColor("#0000ff")
			//.addField("Social", `Displays social commands`)
			.addField("Fun", `Displays commands for fun/misc. commands`)
			.addField("Moderation", `Displays moderation commands`)
			.setFooter("-help <category>")
			.setTimestamp();

		let funEmbed = new Discord.MessageEmbed()
			.setDescription("**Fun commands**")
			.setColor('#ff00ff')
			.addField("Getavatar", `sends embed with your avatar(you can also mention another user)`)
			.setFooter(embedFooter)
			.setTimestamp();

		//    let socialEmbed = new Discord.MessageEmbed()
		//  .setDescription("**Social Commands**")
		//  .setColor("#ff0000")
		//  .addField("Youtube", `DMs a link to my youtube`)
		//  .addField("Twitch", `DMs a link to my twitch`)
		//  .addField("Notifs", `Toggles discord pings for when I stream on twitch`)
		//  .setFooter(embedFooter)
		//  .setTimestamp();

		let moderationEmbed = new Discord.MessageEmbed()
			.setDescription("**Mod Commands**")
			.setColor("#00e1ff")
			.addField("Ban", `Bans mentioned user`)
			.addField("Unban", `Unbans user using their user id`)
			.addField("Tempban", `Bans then unbans any user for a set ammount of time`)
			.addField("Kick", `Kicks mentioned user`)
			.addField("Mute", `Mutes mentioned user`)
			.addField("Unmute", `Unmutes mentioned user`)
			.addField("Clear", `Clears messages(-clear <#>)`)
			.setFooter(embedFooter)
			.setTimestamp();

		if (!args[0]) return message.channel.send(helpEmbed);
		if (args[0] === "social") return message.channel.send(socialEmbed);
		if (args[0] === "fun") return message.channel.send(funEmbed);
		if (args[0] === "moderation" || "mod") return message.channel.send(moderationEmbed);
	}
}