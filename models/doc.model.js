module.exports = (mongoose) => {
    let schema = mongoose.Schema(
      {
        title: String,
        author: String,
        url: String,
        desc:String,
        scanid: String
      },
      { timestamps: true }
    );
  
    const Documents = mongoose.model("documents", schema);
    return Documents;
  };
   