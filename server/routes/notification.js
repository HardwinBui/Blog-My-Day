const express = require("express");
const notificationRoutes = express.Router();

const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the notifications.
notificationRoutes.route("/notification").get(function (req, res) {
  let db_connect = dbo.getDb("mynotification");
  db_connect
    .collection("notifications")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single notification by id
notificationRoutes.route("/notification/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("notifications")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new notification.
notificationRoutes.route("/notification/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    user: req.body.user,
    detail: req.body.detail,
  };
  db_connect.collection("notifications").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a notification by id.
notificationRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      user: req.body.user,
      detail: req.body.detail,
    },
  };
  db_connect
    .collection("notifications")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a notification
notificationRoutes.route("/notification/delete/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("notifications").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = notificationRoutes;