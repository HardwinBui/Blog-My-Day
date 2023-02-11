const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/blog"));
app.use(require("./routes/post"));
app.use(require("./routes/comment"));
app.use(require("./routes/notification"));
app.use(require("./routes/user"));
app.use(require("./routes/image"));
// get driver connection
const dbo = require("./db/conn");

app.get('*.css', function (req, res, next) {
  res.set('Content-Type', 'text/css');
  next();
});

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});

app.get('/', (req, res) => {
  res.sendStatus(200)
})