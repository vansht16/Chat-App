const Group = require('../models/group.model'); // Import MongoDB Group model
const User = require('../models/user.model');   // Import MongoDB User model

module.exports = {
  route: (app) => {
    // Get all groups
    app.get("/api/groups", async (req, res) => {
      try {
        const adminIds = req.query.adminId ? [].concat(req.query.adminId) : null;

        let groups = await Group.find(adminIds ? { adminId: { $in: adminIds } } : {});

        res.json(groups);
      } catch (err) {
        res.status(500).json({ message: "Error retrieving groups" });
      }
    });

    // Get a specific group by its ID
    app.get("/api/groups/:id", async (req, res) => {
      try {
        const group = await Group.findById(req.params.id);

        if (group) {
          res.status(200).json(group);
        } else {
          res.status(404).json({ message: "Group not found" });
        }
      } catch (err) {
        res.status(500).json({ message: "Error retrieving group" });
      }
    });

    // Add a new group
    app.post("/api/groups", async (req, res) => {
      try {
        const newGroup = new Group(req.body);

        // Save new group
        await newGroup.save();

        // Update the admin's groups
        const adminUser = await User.findById(newGroup.adminId);
        if (adminUser) {
          adminUser.groups.push(newGroup._id);
          await adminUser.save();
        }

        res.status(201).json(newGroup);
      } catch (err) {
        res.status(500).json({ message: "Error occurred while creating the group" });
      }
    });

    // Similar changes would be made for updating, deleting, and managing group users
  },
};
