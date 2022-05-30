module.exports = (msg, config) => {
  let commandParams = msg.content.split(" ");
  if (commandParams.length <= 1) {
    return config;
  }
  switch (commandParams[1]) {
    case 'counter':
      if (typeof commandParams[2] !== 'undefined') {
        switch (commandParams[2]) {
          case 'register':
            console.log('register');
            config.counterChannelIds.push(msg.channelId);
            msg.reply('Success!');
            break;
          case 'counterMiscountMessage':
            console.log('counterMiscountMessage');
            if (typeof commandParams[3] !== 'undefined') {
              config.counterMiscountMessage = commandParams.slice(3).join(' ').trim();
              msg.reply('Success!');
            }
            else {
              msg.reply('You must provide a message!');
            }
            break;
          case 'counterDoubleCountMessage':
            console.log('counterDoubleCountMessage');
            if (typeof commandParams[3] !== 'undefined') {
              config.counterDoubleCountMessage = commandParams[3];
              msg.reply('Success!');
            }
            else {
              msg.reply('You must provide a message!');
            }
            break;
        }
      }
      break;
  }
  return config;
};