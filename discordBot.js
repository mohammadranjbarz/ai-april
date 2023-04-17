const {Client, Intents} = require('discord.js');
const {analyzeTweets} = require("./openAi");

// Replace 'YOUR_BOT_TOKEN' with your Discord bot token
const BOT_TOKEN = process.env.BOT_TOKEN;


function initBot () {
  const client = new Client();

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('message', async message => {
    console.log('message : ', message.content)
    // Ignore messages from bots
    if (message.author.bot) return;
    message.channel.send('Wait Im analyzing tweets ...')
    message.channel.send(await analyzeTweets(message.content));
    // If the message starts with the command prefix '!'
    // if (message.content.startsWith('!')) {
    //   // Remove the command prefix and split the message into words
    //   const args = message.content.slice(1).trim().split(/ +/);
    //   const command = args.shift().toLowerCase();
    //
    //   // Simple question and answer commands
    //   if (command === 'question') {
    //     const question = args.join(' ');
    //
    //     // Add your custom question and answer logic here
    //     if (question === 'What is the capital of France?') {
    //       message.channel.send('The capital of France is Paris.');
    //     } else {
    //       message.channel.send('I do not know the answer to that question.');
    //     }
    //   }
    // }
  });

  client.login(BOT_TOKEN);
}

module.exports ={
   initBot
}
