const counter = require('../commands/counter.js');
const tgConfig = require('../commands/tiny_gnome_config.js');

const TG_PREFIX = '!tg'
let definedTGConfig = {
  counterChannelIds: [],
  counterReactEmoji: "🥳",
  counterBreakerRoleNames: [],
  counterMiscountMessage: "Booo <author> you can't count!",
  counterDoubleCountMessage: "Booo <author> you can't count twice in a row!",
};

module.exports = {
  name: 'messageCreate',
  once: false,
  execute: (msg) => {
    console.log('start of messageCreate');
    //Ping/pong message types
    if (msg.content.toLowerCase().localeCompare('ping') === 0) {
      msg.reply('pong');
      return;
    }
    else if (msg.content.toLowerCase().localeCompare('bloop') === 0) {
      msg.reply('boop');
      return;
    }

    //Make updates to tiny gnome config
    if (msg.content.toLowerCase().indexOf(TG_PREFIX) === 0) {
      definedTGConfig = tgConfig(msg, definedTGConfig);
      return;
    }

    //Counting
    counter(msg, definedTGConfig);
  }
};
