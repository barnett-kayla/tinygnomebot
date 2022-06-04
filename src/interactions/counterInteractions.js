const { Permissions } = require('discord.js');
const CounterSettings = require('../models/CounterSettings');

module.exports = {
  registertgcounter: (interaction) => {
    if (!interaction.member.permissions.has([Permissions.FLAGS.MODERATE_MEMBERS])) {
      interaction.reply('You do not have permission to use this command!');
      return;
    }

    CounterSettings.findOne({ channel_id: interaction.channelId }, (err, settings) => {
      if (err) {
        console.log(err);
        interaction.reply('An error occurred while trying to register the counter to this channel!');
        return;
      }
      if (!settings) {
        settings = new CounterSettings({
          channel_id: interaction.channelId,
          counter_react_emoji: interaction.options.getString('counter_react_emoji'),
          counter_breaker_role_name: interaction.options.getString('counter_breaker_role_name'),
          counter_miscount_message: interaction.options.getString('counter_miscount_message'),
          counter_double_count_message: interaction.options.getString('counter_double_count_message'),
          count: 0,
          last_counter_id: ''
        });

        settings.save(err => {
          if (err) {
            console.log(err);
            interaction.reply({ content: 'An error occurred while trying to register the channel!', ephemeral: true });
            return;
          }

          interaction.reply({ content: 'This channel was successfully registered with the TinyGnome Counter, happy counting!', ephemeral: true });
        });
      } else {
        interaction.reply({ content: 'This channel has already been registered!', ephemeral: true });
      }
    });
  },
  updatetgcounter: (interaction) => {
    if (!interaction.member.permissions.has([Permissions.FLAGS.MODERATE_MEMBERS])) {
      interaction.reply('You do not have permission to use this command!');
      return;
    }

    CounterSettings.findOne({ channel_id: interaction.channelId }, (err, settings) => {
      if (err) {
        console.log(err);
        interaction.reply('An error occurred while trying to update the TinyGnome Counter for this channel!');
        return;
      }

      if (!settings) {
        settings = new CounterSettings({
          channel_id: interaction.channelId,
          counter_react_emoji: interaction.options.getString('counter_react_emoji'),
          counter_breaker_role_name: interaction.options.getString('counter_breaker_role_name'),
          counter_miscount_message: interaction.options.getString('counter_miscount_message'),
          counter_double_count_message: interaction.options.getString('counter_double_count_message'),
          count: 0,
          last_counter_id: ''
        });
      } else {
        console.log(settings);
        console.log('-');
        console.log(interaction);
        settings.counter_react_emoji = interaction.options.getString('counter_react_emoji');
        settings.counter_breaker_role_name = interaction.options.getString('counter_breaker_role_name');
        settings.counter_miscount_message = interaction.options.getString('counter_miscount_message');
        settings.counter_double_count_message = interaction.options.getString('counter_double_count_message');
      }
      console.log(settings);
      settings.save(err => {
        if (err) {
          console.log(err);
          interaction.reply({ content: 'An error occurred while trying to update the channel\'s TinyGnome Counter!', ephemeral: true });
          return;
        }

        interaction.reply({ content: 'This channel\'s TinyGnome Counter was successfully updated, happy counting!', ephemeral: true });
      });
    });
  }
}