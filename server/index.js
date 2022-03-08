const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const pool = require("./config/db");

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./routes/index")); //  use express router

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
    return;
  }
  console.log(`Server is running on port : ${port}`);
});
