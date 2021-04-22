module.exports = {
  name: 'twitch',
  description: 'Sends a link to my twitch',
  execute(message, args) {
    if(!args[0]) {return message.reply("@mention who's twitch link you want")}

    let mention = message.mentions.users.first().id;

    if(mention === 327261354287431680)
    message.author.send('This is my twitch: https://twitch.tv/bowlcakes25');
  }
}