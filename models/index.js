module.exports = {
    url: "mongodb://localhost:27017/dekimbo",
  };
  

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = 'mongodb://localhost:27017/dekimbo'
db.documents = require("./doc.model.js")(mongoose);


module.exports = db;
