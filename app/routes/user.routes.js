module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Retrieve all User
  router.get("/", users.findAll);

  // Retrieve a single User with id
  router.get("/:pseudo", users.findOne);

  // Update a User with id
  router.put("/:pseudo", users.update);

  // Delete a user with id
  router.delete("/:pseudo", users.delete);

  // Delete all users
  router.delete("/", users.deleteAll);

  app.use('/api/users', router);
};