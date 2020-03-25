const fs = require('fs');

const Discord = require('discord.js');
const  {prefix, token} = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// var readme = fs.readFileSync('readme.txt', 'utf8'); // blocking code to read the file
// fs.writeFileSync('writeme.txt', readme);

// var readme2;

// for async functions, we need a callback function for when then function completes
// fs.readFile('readme.txt', 'utf8', function(err, data) {
//     readme2 = data;
// });

// add the commands to client.commands
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) {
        return message.channel.send(`Meow meow meow (I don't understand your command)`);
    }

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); 
    if (!command) return;

    if (command.args && !args.length) {
        return message.channel.send(`Meow... (You didn't bring me food...)`);
    }

    if (command.guildOnly && message.channel.type !== 'text') {
        if (command.name === 'cat') {
            return message.reply(`Meow meow meow (These pics are not for your DMs)`);
        }
        else {
            return message.reply(`Meow meow meow... (I can't do this in the DMs...)`);
        }
    }

    if (command.cooldown !== 0) {
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            // if the expiration time is still later than the 'now' time
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Meow meow ~~ (finding a good pic to send... give me ${timeLeft.toFixed(1)} more second(s))`);
            }
        }
        else {
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
    }

    try {
        command.execute(message, args);
    } catch (err) {
        console.error(err);
        message.reply(`Meow meow meow (Something went wrong)!!`);
    }
});

client.login(token);