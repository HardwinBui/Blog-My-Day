const express = require("express");

// commentRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /comment.
const commentRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the comments.
commentRoutes.route("/comment").get(function (req, res) {
  let db_connect = dbo.getDb("myblog");
  db_connect
    .collection("comments")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single comment by id
commentRoutes.route("/comment/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("comments")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new comment.
commentRoutes.route("/comment/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    postID: req.body.postID,
    user: req.body.user,
    content: req.body.content,
    likes: req.body.likes,
  };
  db_connect.collection("comments").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a comment by id.
commentRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      postID: req.body.postID,
      user: req.body.user,
      content: req.body.content,
      likes: req.body.likes,
    },
  };
  db_connect
    .collection("comments")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a comment
commentRoutes.route("/comment/delete/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("comments").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = commentRoutes;