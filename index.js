console.clear();
let Discord = require("discord.js");
const env = require("dotenv");
let client = new Discord.Client();
const fs = require('fs');
const config = require('./config');
const ytdl = require('ytdl-core');

const memberCounter = require('./counters/members');

const prefix = "-";
const embedFooter = "Developed by Bowlcakes25";
var servers = {};

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.on("ready", () => {
	console.log("Erebos online");
	memberCounter(client);
});
const guild = client.guilds.cache.get('612461490959679677');
let activities = [
	//`${guild.memberCount.toLocaleString} members!`,
	`AHHHHHHHHHHHHH`,
	`Why do I exist`,
	`Occasionally Good Gamers`
	//`${./commands.contents}`
];

let i = 0;
setInterval(() => {
	client.user.setActivity(`${prefix}help | ${activities[i++ % activities.length]}`);
}, 10000)

//welcome messages
const welcomeMessages = [
	"glad you're here",
    "enjoy your stay",
    "make sure you read the rules",
    "to the cum zone"
];

let n = 0;

client.on('guildMemberAdd', guildMember => {
	let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');
	let welcomeChannel = guildMember.guild.channels.cache.find(channel => channel.name === 'welcome');

	function getRandomInt(max) {
		Math.floor(Math.random() * Math.floor(max));
	  }

	if (!welcomeChannel) return console.error("Couldn't find a welcome channel");
	welcomeChannel.send(`Welcome <@${guildMember.user.id}>, ${welcomeMessages[n++ % welcomeMessages.length]}`).catch(console.log());
	if (!welcomeRole) return console.error("couldn't find default role");
	guildMember.roles.add(welcomeRole);

})

const usedCommand = new Set();
//swear detection
client.on('message', message => {
	let bypassRole = message.guild.roles.cache.find(role => role.name === "Black");
	if(!bypassRole) console.log("shits broke");
	if (message.author.bot || message.member.roles.cache.has(bypassRole.id)) return;

	let swearWords = config.swears;

	for (i = 0; i < swearWords.length; i++) {
		if (message.content.toLowerCase().includes(swearWords[i])) {
			message.reply("Please do not use that language here");
			console.log(`${message.author.tag} use a forbidden word in ${message.channel.name} chat: ${message.content}`);
			message.delete();
			//add a warning to the user here
		};
	}
})
//music
client.on('message', message =>{
	let args = message.content.substring(prefix.lenth).split(" ");

	switch(args[0]) {
		case '-play':

			function play(connection, message){
				var server = servers[message.guild.id];

				server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));

				server.queue.shift();

				server.dispatcher.on("end", function(){
					if(server.queue[0]){
						play(connection, message);
					}else {
						connection.disconnect();
					}
				})
			}
			//vc = client.join_voice_channel(message.member.voice.channel);
			if(!args[1]){
				message.channel.send("you need to provide a link");
				return;
			}

			if(!message.member.voice.channel){
				message.channel.send("You must be in a voice channel");
				return;
			}
			if(!servers[message.guild.id]) servers[message.guild.id] = {
				queue: []
			}

			var server = servers[message.guild.id];

			server.queue.push(args[1]);

			if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
				play(connection, message);
			})

	}
})

client.on("message", message => {
	if (message.channel.name === "cringe" && !message.author.bot && !message.content.startsWith(prefix || "yes")) message.channel.send("is that cringe");
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (usedCommand.has(message.author.id)) {
		message.reply("Chill out, there is a 5 second cooldown");
	} else {

		if (command === 'youtube') {
			client.commands.get('youtube').execute(message, args, embedFooter);
		}
		if (command === 'twitch') {
			client.commands.get('twitch').execute(message, args, embedFooter);
		}
		if (command === 'notifs') {
			client.commands.get('notifs').execute(message, args, embedFooter);
		}
		if (command === 'kick') {
			client.commands.get('kick').execute(message, args, embedFooter);
		}
		if (command === 'ban') {
			client.commands.get('ban').execute(message, args, embedFooter);
		}
		if (command === 'unban') {
			client.commands.get('unban').execute(message, args, embedFooter);
		}
		if (command === 'help') {
			client.commands.get('help').execute(message, args, embedFooter);
		}
		if (command === 'mute') {
			client.commands.get('mute').execute(message, args, embedFooter);
		}
		if (command === 'unmute') {
			client.commands.get('unmute').execute(message, args, embedFooter);
		}
		if (command === 'clear') {
			client.commands.get('clear').execute(message, args, embedFooter);
		}
		if (command === 'tempban') {
			client.commands.get('tempban').execute(message, args, embedFooter);
		}
		console.log(args);
		usedCommand.add(message.author.id);
		setTimeout(() => {
			usedCommand.delete(message.author.id);
		}, 5000)


	}
});
//g cut in the future
client.login(config.token);