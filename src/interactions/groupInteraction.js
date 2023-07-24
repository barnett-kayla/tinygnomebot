const Grouper = require('../workers/grouper');

module.exports = {
  makeGroups: (interaction) => {
    const groupType = interaction.options.getString('group_by');
    const numberOfGroups = interaction.options.getNumber('number_of_groups');
    const numberOfPeople = interaction.options.getNumber('number_of_people_per_group');
    const channel = interaction.options.getChannel('channel');
    const role = interaction.options.getRole('role');
    const totalNumPeople = interaction.options.getNumber('total_people');
    let users;
   
    if (groupType === 'ROLE') {
      if (!role) {
        interaction.reply('You did not supply a role to use for groups!');
      }
      users = role.members.map(m => '<@' + m.user.id + '>');
    }

    if (groupType === 'CHANNEL') {
      if (!channel) {
        interaction.reply('You did not supply a channel to use for groups!');
      }
      users = channel.members.map(m => '<@' + m.user.id + '>');
    }

    if (groupType === 'MANUAL') {
      if (totalNumPeople != users.length) {
        interaction.reply('You did not enter the right number of users!');
      }

      if (numberOfGroups > 0 && numberOfPeople > 0) {
        interaction.reply('Please only specify a number of groups or a number of people per group');
      }
      users = interaction.options.getString('users').trim().split(',');
    }

    if (users.length === 0) {
      interaction.reply('No users were found to be grouped!');
    }

    if (numberOfGroups > 0) {
      Grouper.groupByGroup(users, numberOfGroups, interaction);
    }
    else if (numberOfPeople > 0) {
      Grouper.groupByPeople(users, numberOfPeople, interaction);
    }
  }
}
