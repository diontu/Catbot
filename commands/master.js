module.exports = {
    name: 'master',
    aliases: [],
    description: 'The Catbot is the master...',
    cooldown: 0,
    guildOnly: false,
    args: false,
    execute (message, args) {
        message.channel.send('Meow~ (Yes, I am your master...)');
    }
};