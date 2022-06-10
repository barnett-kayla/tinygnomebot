const counter = require('../workers/counter.js');
const countdown = require('../workers/countdown.js');

const TG_PREFIX = '!tg'

module.exports = {
  name: 'messageCreate',
  once: false,
  execute: (msg) => {
    if (msg.author.bot) {
      return;
    }
    //Ping/pong message types
    if (msg.content.toLowerCase().localeCompare('ping') === 0) {
      msg.reply('pong');
      return;
    }
    else if (msg.content.toLowerCase().localeCompare('bloop') === 0) {
      msg.reply('boop');
      return;
    }

    // If the message is a number pass it to the counter
    if (!isNaN(msg.content)) {
      counter(msg);
    }

    // If the message starts with !tg pass it to the countdown
    if (msg.content.indexOf(TG_PREFIX) === 0) {
      if (msg.content.indexOf('countdown') === 3)
      countdown(msg, msg.content.substring(12).trim());
    }
  }
};
