const fs = require('fs');

module.exports = {
    name: 'cat',
    aliases: ['catpic', 'catpicture'],
    description: 'Sends back a cat pic for cat lovers!',
    cooldown: 5,
    guildOnly: true,
    args: false,
    execute (message, args) {
        const catpics = fs.readdirSync('./catpics').filter(catpic => {
            return catpic.endsWith('.png') || catpic.endsWith('.jpeg') || catpic.endsWith('jpg')
        }); 
        var randomIndex = Math.floor(Math.random() * catpics.length);
        if (catpics.length === 0) {
            message.channel.send("Meow (I don't have anymore cat pics for you)...");
        }
        message.channel.send(`${catpics.length}`);
        message.channel.send("Meow meow (here's a cutie)!", {files: [`./catpics/${catpics[randomIndex]}`]});
    }
};