let currentCounts = {};
const parseFailureMessage = (failureMsg, msg) => {
  const regex = /<author>/i;
  return failureMsg.replace(regex, msg.author);
}
module.exports = (msg, config) => {
  const nextCount = parseInt(msg.content, 10);
  console.log('counter');
  console.log(config);
  if (isNaN(nextCount) || config.counterChannelIds.findIndex((channelId) => channelId === msg.channelId) === -1) {
    return;
  }

  if (typeof currentCounts[msg.channelId] === 'undefined') {
    currentCounts = {
      ...currentCounts,
      [msg.channelId]: {
        count: 0,
        lastUserId: -1
      },
    };
  }

  const currentCount = currentCounts[msg.channelId].count;
  if (msg.author.id !== currentCounts[msg.channelId].lastUserId) {
    if (nextCount === currentCount + 1) {
      currentCounts[msg.channelId].count++;
      currentCounts[msg.channelId].lastUserId = msg.author.id;
      msg.react(config.counterReactEmoji);
    }
    else {
      currentCounts[msg.channelId].count = 0;
      currentCounts[msg.channelId].lastUserId = -1;
      msg.client.channels.cache.get(msg.channelId).send(`${parseFailureMessage(config.counterMiscountMessage, msg)} Let's try this again starting with 1`);
    }
  }
  else {
    currentCounts[msg.channelId].count = 0;
    currentCounts[msg.channelId].lastUserId = -1;
    msg.client.channels.cache.get(msg.channelId).send(`${parseFailureMessage(config.counterDoubleCountMessage, msg)} Let's try this again starting with 1`);
  }
};
