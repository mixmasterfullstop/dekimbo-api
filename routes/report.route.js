module.exports = (app) => {
    const report = require("../controllers/report.controller.js");
  
    let router = require("express").Router();
  
    router.post("/update/:id",report.updateReport);
  
    router.get("/",report.findAll);
    router.get("/:id",report.findOne);
  
    router.delete("/:id", report.delete);
  
    router.delete("/",report.deleteAll);
  
    app.use("/api/report", router);
  
  };
  