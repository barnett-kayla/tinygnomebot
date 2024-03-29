const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: [
    new SlashCommandBuilder()
      .setName('tgcounter')
      .setDescription('The TinyGnome Counter configuration commands')
      .addSubcommand(command =>
        command
          .setName('register')
          .setDescription('Register the current channel to be used with the TinyGnome Counter')
          .addStringOption(option => option
            .setName('counter_react_emoji')
            .setDescription('The emoji to be used when reacting to a counted number. Must be an escaped emoji')
            .setRequired(false)
          )
          .addStringOption(option => option
            .setName('counter_breaker_role_name')
            .setDescription('The role to be added to the user that breaks the count')
            .setRequired(false)
          )
          .addStringOption(option => option
            .setName('counter_miscount_message')
            .setDescription('The message to display when someone sends a number out of order')
            .setRequired(false)
          )
          .addStringOption(option => option
            .setName('counter_double_count_message')
            .setDescription('The message to display when someone counts twice in a row')
            .setRequired(false)
          ))
      .addSubcommand(command =>
        command
          .setName('update')
          .setDescription('Update the current channel\'s TinyGnome Counter settings')
          .addStringOption(option => option
            .setName('counter_react_emoji')
            .setDescription('The emoji to be used when reacting to a counted number. Must be an escaped emoji')
            .setRequired(false)
          )
          .addStringOption(option => option
            .setName('counter_breaker_role_name')
            .setDescription('The role to be added to the user that breaks the count')
            .setRequired(false)
          )
          .addStringOption(option => option
            .setName('counter_miscount_message')
            .setDescription('The message to display when someone sends a number out of order')
            .setRequired(false)
          )
          .addStringOption(option => option
            .setName('counter_double_count_message')
            .setDescription('The message to display when someone counts twice in a row')
            .setRequired(false)
          )),
    new SlashCommandBuilder()
      .setName('tgcountdown')
      .setDescription('Manage a TinyGnome Countdown')
      .addSubcommand(command =>
        command
          .setName('add')
          .setDescription('Add a new countdown')
          .addStringOption(option =>
            option
              .setName('name')
              .setDescription('The name of the countdown to be added')
              .setRequired(true)
          )
          .addStringOption(option =>
            option
              .setName('date')
              .setDescription('The date to countdown to. Format as mm/dd/yyyy')
              .setRequired(true)
          ))
      .addSubcommand(command =>
        command
          .setName('delete')
          .setDescription('Delete an existing countdown')
          .addStringOption(option =>
            option
              .setName('name')
              .setDescription('The name of the countdown to be deleted')
              .setRequired(true)
          )),
    new SlashCommandBuilder()
      .setName('tgweather')
      .setDescription('View weather information')
      .addIntegerOption(option => option
        .setName('zip_code')
        .setDescription('The zipcode to look up weather for')
        .setRequired(false)
      )
      .addStringOption(option => option
        .setName('location_name')
        .setDescription('The location name to look up weather for')
        .setRequired(false)
      )
      .addStringOption(option => option
        .setName('degree_type')
        .setDescription('The degree type to be used when displaying temprature information')
        .setRequired(false)
      ),
    new SlashCommandBuilder()
      .setName('tggroup')
      .setDescription('Create groups of people')
      .addStringOption(option => option
        .setName('group_by')
        .setDescription('How do you want to group people?')
        .addChoices(
          { name: 'Channel', value: 'CHANNEL' },
          { name: 'Role', value: 'ROLE' },
          { name: 'Manual List', value: 'MANUAL' }
        )
        .setRequired(true)
      )
      .addNumberOption(option => option
        .setName('number_of_groups')
        .setDescription('How many groups should be created. Use this if there should be a set number of groups.')
        .setRequired(false)
      )
      .addNumberOption(option => option
        .setName('number_of_people_per_group')
        .setDescription('How many people should be in each group. Use this if groups should be a certain size.')
        .setRequired(false)
      )
      .addChannelOption(option => option
        .setName('channel')
        .setDescription('The channel to pull users from')
        .setRequired(false)
      )
      .addRoleOption(option => option
        .setName('role')
        .setDescription('The role to pull users from')
        .setRequired(false)
      )
      .addStringOption(option => option
        .setName('users_list')
        .setDescription('The users to be broken into groups')
        .setRequired(false)
      )
      .addNumberOption(option => option
        .setName('total_people')
        .setDescription('How many people total when creating a manual list of users')
        .setRequired(false)
      )
  ]
};
