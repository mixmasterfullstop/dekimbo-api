module.exports = {
    url: "mongodb://localhost:27017/dekimbo",
  };
  

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = 'mongodb+srv://dekimbo:619619rey@cluster0.xbr1p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
db.documents = require("./doc.model.js")(mongoose);


module.exports = db;