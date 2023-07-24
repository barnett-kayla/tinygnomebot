require("dotenv").config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const IDLECHAT_ID = '109834809538248704';

module.exports = {
  name: 'ready',
  once: true,
  execute: (client) => {
    console.log('readying');
    const CLIENT_ID = client.user.id;

    const rest = new REST({
      version: '9',
    }).setToken(process.env.TOKEN);

    (async () => {
      try {
        console.log('Started refreshing application (/) commands.');
        let commandsToRegister = [];
        client.commands.forEach((command) => {
          commandsToRegister.push(command.toJSON());
        });
        if (process.env.ENV === "production") {
          await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID),
            { body: commandsToRegister },
          );
        }
        else {
          await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, IDLECHAT_ID),
            { body: commandsToRegister },
          );
        }

        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }
    })();
    console.log('logged in and ready to go!');
  }
};
