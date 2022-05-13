module.exports = (mongoose) => {
    let schema = mongoose.Schema(
      {
        scanid: Number,
        totalWords: Number,
        totalExcluded: Number,
        credit: Number,
        expectedCredits: Number,
        creationTime: Date,
        status:Number,
        results:{},
        notifications: {},
        



       
      },
      { timestamps: true }
    );
  
    const Report = mongoose.model("report", schema);
    return Report;
  };
   