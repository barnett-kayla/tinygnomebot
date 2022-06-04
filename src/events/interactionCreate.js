const CounterInteractions = require('../interactions/counterInteractions');

module.exports = {
  name: 'interactionCreate',
  once: false,
  execute: (interaction, client) => {
    if (client.commands.has(interaction.commandName)) {
      switch (interaction.commandName) {
        case 'registertgcounter':
          CounterInteractions.registertgcounter(interaction);
          break;
        case 'updatetgcounter':
          CounterInteractions.updatetgcounter(interaction);
          break;
      }
    }
  }
};