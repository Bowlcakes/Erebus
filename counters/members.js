module.exports = async (client) =>{
  const guild = client.guilds.cache.get('612461490959679677');
  setInterval(()=>{
    const memberCount = guild.memberCount;
    const channel = guild.channels.cache.get('797962363302707301');
    channel.setName(`Member Count: ${memberCount.toLocaleString()}`)
  }, 5000);


}