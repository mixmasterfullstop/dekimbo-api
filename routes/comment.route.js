module.exports = (app) => {
    const comment = require("../controllers/comment.controller");
 
  
  
    let router = require("express").Router();
  
    router.post("/",comment.addComment);
  
    router.get("/all",comment.findAll);
    router.get("/",comment.findUserComment);
    router.put("/:id",comment.updateComment);
    router.delete("/:id", comment.delete);
    router.delete("/",comment.deleteAll);
    app.use("/api/comment", router);
  };
  