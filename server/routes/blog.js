const express = require("express");
const blogRoutes = express.Router();

const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the blogs.
blogRoutes.route("/blog").get(function (req, res) {
  let db_connect = dbo.getDb("myblog");
  db_connect
    .collection("blogs")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single blog by id
blogRoutes.route("/blog/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("blogs")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new blog.
blogRoutes.route("/blog/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    user: req.body.user,
    name: req.body.name,
    likes: req.body.likes,
    posts: req.body.posts,
    followers: req.body.followers,
    date_created: req.body.date_created,
    date_modified: req.body.date_modified,
  };
  db_connect.collection("blogs").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a blog by id.
blogRoutes.route("/blog/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      user: req.body.user,
      name: req.body.name,
      likes: req.body.likes,
      posts: req.body.posts,
      followers: req.body.followers,
      date_created: req.body.date_created,
      date_modified: req.body.date_modified,
    },
  };
  db_connect
    .collection("blogs")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a blog
blogRoutes.route("/blog/delete/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("blogs").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = blogRoutes;