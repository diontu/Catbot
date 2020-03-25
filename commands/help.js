const {prefix} = require('../config.json');

module.exports = {
    name: 'help',
    alias: [],
    description: 'List of all the commands or info about a specific command.',
    cooldown: 0,
    guildOnly: false,
    args: false,
    execute (message, args) {
        const data = [];
        const {commands} = message.client

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
        }

        return message.author.send(data, {split: true})
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('Meow Meow! (I\'ve sent you a DM with all my commands!)');
            })
            .catch (error => {
                console.error (`Could not send help DM to ${message.author.tag}.\n`, error);
                message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
            });
    }
};