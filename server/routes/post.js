const express = require("express");
 

const postRoutes = express.Router();
 
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
 
// This section will help you get a list of all the posts.
postRoutes.route("/post").get(function (req, res) {
 let db_connect = dbo.getDb("myblog");
 db_connect
   .collection("posts")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single post by id
postRoutes.route("/post/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("posts")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new post.
postRoutes.route("/post/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
    blogID: req.body.blogID,
    title: req.body.title,
    content: req.body.content,
    likes: req.body.likes,
 };
 db_connect.collection("posts").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a post by id.
postRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    blogID: req.body.blogID,
    title: req.body.title,
    content: req.body.content,
    likes: req.body.likes,
   },
 };
 db_connect
   .collection("posts")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a post
postRoutes.route("/post/delete/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("posts").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = postRoutes;