const users = [];
const requests = [];
const groupRequests = [];

class User {
  roles = [];
  groups = [];
  constructor(username, password, email, id, roles, groups) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.id = id;
    this.roles.push(roles);
  
  }
}

function createUser(username, password, email, role = "CA") {
  return new User(username, password, email, users.length + 1, role);
}

const usernameAvailable = (arr, username) =>
  arr.find((el) => el.username === username);

function approveUser() {}

users.push(createUser("super", "123", "superadmin@gmail.com", "SU"));
users.push(createUser("user1", "123", "user1@gmail.com", "GA"));
users.push(createUser("vansh ", "123", "vansh@gmail.com.com", "CA"));

module.exports = {
  users,
  createUser,
  approveUser,
  usernameAvailable,
  requests,
  groupRequests,
};
