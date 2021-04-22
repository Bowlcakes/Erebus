module.exports = {
    name: 'notifs',
    description: 'Turns on twitch notifications',
    execute(message, args) {

        let rolename = message.guild.roles.cache.find(r => r.name === "streamnotifs");
        if (!rolename) return message.reply("That role doesn't exist.");

        if (message.member.roles.cache.has(rolename.id)) {
            message.member.roles.remove(rolename.id).catch(console.error);
            message.channel.send("You will no longer receive discord notifications when I go live.");
        } else {
            message.member.roles.add(rolename.id).catch(console.error);
            message.channel.send("You will now receive discord notifications when I go live.");
        };

    }
};