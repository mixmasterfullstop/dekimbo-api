module.exports = (mongoose) => {
    let schema = mongoose.Schema(
      {
        text: String,
        author:String,


        doc: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'documents'
      },

      },
      { timestamps: true }
    );
  
    const Comment = mongoose.model("comment", schema);
    return Comment;
  };
   