
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

var upload = multer({storage: storage});



module.exports = (app) => {
    const doc = require("../controllers/doc.controller.js");
  
  
    let router = require("express").Router();
  
    router.post("/",[upload.single('doc')],doc.addDocument);
    router.post("/hook/",doc.hook);
  
    router.get("/",doc.findAll);
    router.get("/:download", doc.downloadFile);
  
    // router.delete("/:id",[authJwt.verifyToken], location.delete);
  
    // router.delete("/", [authJwt.verifyToken],location.deleteAll);
  
    app.use("/api/doc", router);
  };
  