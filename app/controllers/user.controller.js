const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  if (!req.body.pseudo) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

const date1 = new Date(req.body.dateInsc);
const date2 = new Date(req.body.lastCommunication);

  // Create a User
  const user = {
    pseudo: req.body.pseudo,
    datInsc: date1,
    lastCommunication: date2,
    email: req.body.email,
    rank: req.body.rank,
    points: req.body.points,
    code: req.body.code,
    coins: req.body.coins,
    parraine: req.body.parraine,
    info: req.body.info
  };

  

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating a user."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const pseudo = req.query.pseudo;
  var condition = pseudo ? { pseudo: { [Op.iLike]: `%${pseudo}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Find a single user with an id
exports.findOne = (req, res) => {
  const pseudo = req.params.pseudo;

  User.findOne({ where: {pseudo: pseudo} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with pseudo=" + pseudo
      });
    });
};

// Update a Users by the id in the request
exports.update = (req, res) => {
   const pseudo = req.params.pseudo;

  User.update(req.body, {
    where: { pseudo: pseudo }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with pseudo=${pseudo}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with pseudo=" + pseudo
      });
    });
};

// Delete a users with the specified id in the request
exports.delete = (req, res) => {
  const pseudo = req.params.pseudo;

  User.destroy({
    where: { pseudo: pseudo }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with pseudo=${pseudo}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with pseudo=" + pseudo
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};



