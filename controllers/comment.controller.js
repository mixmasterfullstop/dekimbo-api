const db = require("../models/index.js");
const Comment = db.comment;



exports.addComment = (req, res,) => {
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty" });
      return;
    }
  
    const comment = new Comment({
      text: req.body.text,
      author: req.body.author,
      doc: req.body.doc,
    });
  
    comment
      .save(comment)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occured while creating the comment",
        });
      });
  };
  
  
  
    
   



exports.findUserComment = (req, res) => {
  Comment.find({author:req.body.author})
    .then((data) => {
   
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error  occured while retrieving properties.",
      });
    });
  }


exports.findAll = (req, res) => {
  Comment.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error  occured while retrieving Jobs.",
      });
    });
};

exports.updateComment = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Comment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Plan with id=${id}`,
        });
      } else res.send({ message: "Comment was updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Plan with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Comment.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Job with id=${id}. Maybe Comment was not found!`,
        });
      } else {
        res.send({
          message: "Comment was  deleted successfully!",
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Comment.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Comment were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while removing all Comment ",
      });
    });
};
