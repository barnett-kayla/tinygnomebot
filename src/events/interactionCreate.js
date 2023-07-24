const { Permissions } = require('discord.js');
const CounterInteractions = require('../interactions/counterInteractions');
const CountdownInteractions = require('../interactions/countdownInteractions');
const GroupInteraction = require('../interactions/groupInteraction');
const WeatherInteractions = require('../interactions/weatherInteraction');

module.exports = {
  name: 'interactionCreate',
  once: false,
  execute: (interaction, client) => {
    if (client.commands.has(interaction.commandName)) {
      switch (interaction.commandName) {
        case 'tgcounter':
          //if (interaction.member.permissions.has([Permissions.FLAGS.MODERATE_MEMBERS])) {
            if (interaction.options.getSubcommand() === 'register') {
              CounterInteractions.registertgcounter(interaction);
            }
            else if (interaction.options.getSubcommand() === 'update') {
              CounterInteractions.updatetgcounter(interaction);
            }
          //}
          //else {
            //interaction.reply('You do not have permission to use this command!');
            //return;
          //}
          break;
        case 'tgcountdown':
          if (interaction.member.permissions.has([Permissions.FLAGS.SEND_MESSAGES])) {
            if (interaction.options.getSubcommand() === 'add') {
              CountdownInteractions.add(interaction);
            }
            else if (interaction.options.getSubcommand() === 'delete') {
              CountdownInteractions.delete(interaction);
            }
          }
          else {
            interaction.reply('You do not have permission to use this command!');
            return;
          }
          break;
        case 'tgweather':
          WeatherInteractions.search(interaction);
          break;
        case 'tggroup':
          GroupInteraction.makeGroups(interaction);
          break;
      }
    }
  }
};
