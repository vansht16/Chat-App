const express = require("express");
const app = express();
const cors = require("cors");
const {
  users,
  createUser,
  requests,
  approveUser,
  usernameAvailable,
  groupRequests,
} = require("./users");
const { groups, createGroup, groupNameAvailable } = require("./groups");

app.use(cors());
app.use(express.json());




app.post("/sign-up", (req, res) => {
  const { email, username, password } = req.body;
  console.log(email, password, username);
  
  if (
    !usernameAvailable(users, username) &&
    !usernameAvailable(requests, username)
  ) {
    requests.push({ email, username, password });
    console.log(requests);
    res.json({ status: "request sent" });
  } else res.json({ status: "fail", message: "username already taken" });
  
});

app.get("/requests", (req, res) => {
  res.json(requests);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/join-group", (req, res) => {
  const { userId, groupId, groupName, username } = req.body;
  if (
    !groupRequests.find((g) => g.userId === userId && g.groupId === groupId)
  ) {
    groupRequests.push({ groupName, username, groupId, userId });
  }
  
  res.json({ status: "request sent" });
});

app.get("/join-group-reqs", (req, res) => {
  res.json(groupRequests);
});

app.post("/modify-request", (req, res) => {
  const { type, req: request } = req.body;

  const idx = requests.findIndex((r) => r.username === request.username);
  requests.splice(idx, 1);
  if (type === "approve") {
    users.push(createUser(request.username, request.password, request.email));
    console.log(users.at(-1));
    res.json({ status: "added" });
  } else res.json({ status: "denied" });
});

app.post("/modify-group-request", (req, res) => {
  const {
    type,
    request: { userId, groupId },
  } = req.body;
  console.log(type, userId, groupId);

  if (type === "approve") {
    
    users.find((u) => u.id === userId).groups.push(groupId);
    
    groups.find((g) => g.id === groupId).users.push(userId);
  }

  const idx = groupRequests.findIndex(
    (g) => g.userId === userId && g.groupId === groupId
  );

  groupRequests.splice(idx, 1);

  res.json({ status: "progress" });
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => username === user.username && password === user.password
  );

  if (!user) return res.json({ valid: false });
  res.json({ valid: true, user });
});


app.get("/groups", (req, res) => {
  res.json(groups);
});


app.post("/create-group", (req, res) => {
  const { name, userId: adminId } = req.body;

  if (groupNameAvailable(name)) {
    createGroup(name, adminId);
    const user = users.find((user) => user.id === adminId);
    res.json({ status: "OK", user });
  } else res.json({ status: "fail" });
});

app.post("/delete-user", (req, res) => {
  const { id } = req.body;
  const { groups: userGroups } = users.find((u) => u.id === id);

  const userIdx = users.findIndex((u) => u.id === id);

  
  for (const groupId of userGroups) {
    const group = groups.find((group) => group.id === groupId);
    const userIdxInGroup = group.users.indexOf(id);
    group.users.splice(userIdxInGroup, 1);
  }

  
  users.splice(userIdx, 1);
  res.json({ status: "ok" });
});

app.post("/remove-user", (req, res) => {
  const { userId, groupId } = req.body;

  
  const group = groups.find((group) => group.id === groupId);
  const userIdxInGroup = group.users.indexOf(userId);
  group.users.splice(userIdxInGroup, 1);

  
  const groupIndex = users.at(userId - 1).groups.indexOf(groupId);
  users.at(userId - 1).groups.splice(groupIndex, 1);
  res.json({ status: "ok", user: users.at(userId - 1) });
});



app.listen(3000, () => {
  console.log(`Server listening at port 3000`);
});