const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const prefix = "!";

var botMessages = [];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  const channel = client.channels.get('651850244123918395');
  const enchanting = client.emojis.find(emoji => emoji.name === "enchanting");
  const alchemy = client.emojis.find(emoji => emoji.name === "alchemy");
  const choff = client.users.get('184397300481785867');

  if (msg.content.startsWith("!")){
    const args = msg.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'send') {
      msg.delete();

      const exampleEmbed = new Discord.RichEmbed({
        color: 3447003,
        title: '***Girth Profession List***',
        author: {
          name: 'Made by Curse',
          icon_url: 'https://i.imgur.com/9mARKyG.png',
          url: 'https://twitter.com/choff_tv'
        },
        description: '**Instructions:** Use !addEnchanting or !addAlchemy [discord name] [recipe] to add to the list',
        fields: [{
            name: `${enchanting}` + '__**Enchanting**__',
            value: `${choff} Placeholder`,
            inline: true
          },
          {
            name: `${alchemy}` + '__**Alchemy**__',
            value: `${choff} Greater Fire Protection Potion`,
            inline: true
          },
          {
            name: '\u200b',
            value: '\u200b'
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: 'https://i.imgur.com/9mARKyG.png',
          text: 'Still a work-in-progress, DM on discord if something breaks pls'
        }
      })

      channel.send(exampleEmbed);
    }
    if (command === 'addenchanting' || command === 'addalchemy') {
      msg.delete();

      const alreadySentEmbed = channel.messages.get(botMessages[0]);

      const editEmbed = alreadySentEmbed.embeds[0];

      let enchantingField = Object.assign({}, editEmbed.fields[0]);
      let alchemyField = Object.assign({}, editEmbed.fields[1]);
      let emptyField = Object.assign({}, editEmbed.fields[2]);

      const user = getUserFromMention(args[0]);
      const usersAt = client.users.get(user.id);
      args.shift();
      var argsAsString = args.join(' ');

      //embedLikeField.value = '\n <3 <3 <3';
      if (command === 'addenchanting') {
        enchantingField.value += ('\n' + `${usersAt} ` + argsAsString);
      } else {
        alchemyField.value += ('\n' + `${usersAt} ` + argsAsString);
      }

      const newEmbed = new Discord.RichEmbed({
        color: 3447003,
        title: '***Girth Profession List***',
        author: {
          name: 'Made by Curse',
          icon_url: 'https://i.imgur.com/9mARKyG.png',
          url: 'https://twitter.com/choff_tv'
        },
        description: '**Instructions:** Use !addEnchanting or !addAlchemy [discord name] [recipe] to add to the list',
        fields: [enchantingField, alchemyField, emptyField],
        timestamp: new Date(),
        footer: {
          icon_url: 'https://i.imgur.com/9mARKyG.png',
          text: 'Still a work-in-progress, DM on discord if something breaks pls'
        }
      })

      channel.messages.get(botMessages[0]).edit(newEmbed);
    }
  }
  if(msg.author.bot) {

    const receivedEmbed = msg.embeds[0];
    botMessages[0] = msg.id;
    //const newEmbed = new Discord.RichEmbed(receivedEmbed).setTitle('New title');

    //msg.edit(newEmbed);
  }
});

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.get(mention);
	}
}


client.login(auth.token);
