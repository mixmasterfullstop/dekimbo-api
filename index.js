const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
let app = require("express")();
const dotenv = require('dotenv');
let port = process.env.PORT || 8090;
let http = require("http").Server(app);
let io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Expose-Headers", "X-Total-Count, Content-Range");
  next();
});
dotenv.config();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/docs',express.static('uploads'))

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to dekimbo api." });
});

require("./routes/doc.route")(app);


http.listen(port, () => {
  console.log(`Server is  running on port ${port}`);
});

