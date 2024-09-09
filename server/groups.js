const { users } = require("./users");
const superAdmin = users[0];

const groups = [];

const groupNameAvailable = (groupName) =>
  groups.every((group) => group.name != groupName);

function createGroup(groupName, adminId) {
  groups.push(
    new Group(groups.length + 1, groupName, ["Main", "Announcements"])
  );
}

class Group {
  users = [];
  admins = [superAdmin.id]; 
  channels = ["Main", "Announcements"];

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  addAdmin(userId) {
    this.admins.push(userId);
  }

  addUser(userId) {
    if (!this.users.includes(userId)) {
      this.users.push(userId); 
      users.at(userId - 1).groups.push(this.id); 
    }
  }
}

createGroup("Fitness");
createGroup("Meditation");
createGroup("Programming");

groups.forEach((group) => group.addUser(superAdmin.id)); 

groups[0].addUser(2);
groups[1].addUser(2);
groups[2].addUser(3);

module.exports = { groups, createGroup, groupNameAvailable };