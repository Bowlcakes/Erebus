const Discord = require('discord.js');
const ms = require('ms');
module.exports = {
    name: "tempban",
    description: "temporarily bans a user",
    execute(message, args, embedFooter) {
        if (!args[0]) return message.reply("specify the user you want to temp ban");
        if (!args[1]) return message.reply("you must input a time");
        if (!message.member.permissions.has("BAN_MEMBERS")) message.reply("You do not have the permissions to do this")
        const victim = message.mentions.users.first();

        const reason = args.slice(2).join(' ') || 'No reason specified.';

        let dmEmbed = new Discord.MessageEmbed()
            .setDescription(`You were temp banned in ${message.guild.name}`)
            .setColor('#ff69b4')
            .addField("Banned by", message.author)
            .addField("time", args[1])
            .addField("Reason", reason)
            .setFooter(embedFooter)
            .setTimestamp();

        const memberTarget = message.guild.members.cache.get(victim.id);

        victim.send(dmEmbed);
        message.channel.send(`User has been temporarily banned for ${ms(ms(args[1]))}`);
        memberTarget.ban();

        let victimid = victim.id;

        setTimeout(function () {
            message.guild.members.unban(memberTarget);
            console.log(`${victim} was unbanned`);
            victim.send(new Discord.MessageEmbed()
                .setDescription(`Your ban in ${message.guild.name} has worn off`)
                .addField('Be good', `or it'll happen again`)
                .setFooter(embedFooter)
                .setTimestamp());
        }, ms(args[1]));
    }
}