const divideIntoGroups = (users, numGroups, even) => {
  const groups = [];
  for (let n = 0; n < numGroups; n++) {
    groups.push([]); //Setup the groups   
  }
  while (users.length > 1) {
    for (let n = 0; n < numGroups; n++) {
      let randomUserIndex = Math.floor(Math.random() * users.length);
      groups[n].push(users[randomUserIndex].trim());
      users.splice(randomUserIndex, 1);
    }
  }
  if (!even) {
    groups[0].push(users[0]);
  }
  return groups;
}

const listGroups = (groups, interaction) => {
  let message;
  groups.forEach((group, index) => {
    message = message.concat(`Group ${index + 1}: ${group.forEach(person => person)}\n`);
  });
  interaction.reply(message);
}

module.exports = {
  groupByPeople: (users, numberOfPeople, interaction) => {
    //split evenly
    const numGroups = Math.floor(users.length / numberOfPeople);
    const groups = divideIntoGroups(users, numGroups, users.length % numberOfPeople === 0);
    listGroups(groups, interaction);
  },
  groupByGroup: (users, numberOfGroups, interaction) => {
    //split evenly
    const groups = divideIntoGroups(users, numberOfGroups, users.length % numberOfGroups === 0);
    listGroups(groups, interaction);
  }
}