const Discord = require('discord.js');
const client = new Discord.Client();

const  {prefix, token} = require('./config.json');

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.content === `${prefix}jinesh`) {
        message.channel.send('sucks at apex');
    }
    else if (message.content === `${prefix}brandon`) {
        message.channel.send('is a god at apex');
    }
    else if (message.content === `${prefix}dion`) {
        message.channel.send('is improving in apex');
    }
    else if (message.content === `${prefix}kris`) {
        message.channel.send('is just salty');
    } 
    // startsWith is used if i just want the beginning to 'startWith'
    else if (message.content.startsWith(`${prefix}apex`)) {
        message.channel.send('legends');
    }
});

client.login(token);