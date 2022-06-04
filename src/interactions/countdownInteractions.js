const CountdownSettings = require('../models/CountdownSettings');

module.exports = {
  add: (interaction) => {
    const GUILD_ID = interaction.guild.id;
    const USER_ID = interaction.member.id;
    const NAME = interaction.options.getString('name');
    const DATE = interaction.options.getString('date');
    const dateValues = DATE.split('/');
    const today = new Date();
    const futureDate = new Date();
    let daysToGo = 0;

    if (dateValues.length !== 3) {
      interaction.reply('An invalid date was provided. Please specify the date as mm/dd/yyyy');
    }
    futureDate.setMonth(parseInt(dateValues[0] - 1, 10));
    futureDate.setDate(parseInt(dateValues[1], 10));
    futureDate.setFullYear(parseInt(dateValues[2], 10));

    daysToGo = (futureDate.getTime() - today.getTime()) / (1000 * 3600 * 24);

    CountdownSettings.findOne({ guild_id: GUILD_ID, user_id: USER_ID }, (err, settings) => {
      if (err) {
        console.log(err);
        interaction.reply('An error occurred while trying to add the countdown!');
        return;
      }
      if (!settings) {
        settings = new CountdownSettings({
          user_id: USER_ID,
          guild_id: GUILD_ID,
          name: NAME,
          date: DATE
        });
        settings.save(err => {
          if (err) {
            console.log(err);
            interaction.reply({ content: 'An error occurred while trying to add the countdown!', ephemeral: true });
            return;
          }

          interaction.reply({ content: `The ${NAME} countdown was added succesfully! There are ${daysToGo} days to go!`, ephemeral: true });
        });
      }
      else {
        interaction.reply({ content: `You\'re already counting down to ${NAME}! There are ${daysToGo} days to go!`, ephemeral: true });
      }
    });
  },
  delete: (interaction) => {
    const GUILD_ID = interaction.guild.id;
    const USER_ID = interaction.member.id;
    const NAME = interaction.options.getString('name');

    CountdownSettings.deleteOne({ user_id: USER_ID, guild_id: GUILD_ID, name: NAME }, (err) => {
      if (err) {
        console.log(err);
        interaction.reply('An error occurred while trying to delete the countdown!');
        return;
      }
      else {
        interaction.reply({ content: `The ${NAME} countdown was deleted succesfully!`, ephemeral: true });
      }
    })
  }
}
