const counter = require('../workers/counter.js');

const TG_PREFIX = '!tg'

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

    //Counting
    counter(msg);
  }
};
