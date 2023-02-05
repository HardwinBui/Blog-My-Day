const express = require("express");
const userRoutes = express.Router();

const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the users.
userRoutes.route("/user").get(function (req, res) {
  let db_connect = dbo.getDb("myuser");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single user by id
userRoutes.route("/user/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("users")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new user.
userRoutes.route("/user/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    user: req.body.user,
    blogs: req.body.blogs,
    followed_blogs: req.body.followed_blogs,
    date_created: req.body.date_created,
    date_modified: req.body.date_modified,
  };
  db_connect.collection("users").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a user by id.
userRoutes.route("/user/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      user: req.body.user,
      blogs: req.body.blogs,
      followed_blogs: req.body.followed_blogs,
      date_created: req.body.date_created,
      date_modified: req.body.date_modified,
    },
  };
  db_connect
    .collection("users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a user
userRoutes.route("/user/delete/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("users").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = userRoutes;