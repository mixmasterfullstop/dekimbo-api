


const db = require("../models/index.js");
const process = require('process');
const Report = db.report;

const Document = db.documents
const { Copyleaks,
    CopyleaksURLSubmissionModel,
    CopyleaksFileSubmissionModel,
    CopyleaksFileOcrSubmissionModel,
    CopyleaksDeleteRequestModel,
    CopyleaksExportModel
} = require('plagiarism-checker');  
const copyleaks = new Copyleaks();


exports.addDocument = async(req, res) => {



  try{
    var submission = new CopyleaksURLSubmissionModel(
      `https://www.gd.dreamhub.co.zw/docs/${req.file.filename}`,
      {
        sandbox: true,
        webhooks: {
          status: `https://www.gd.dreamhub.co.zw/api/doc/submit-url-webhook/{STATUS}/`
        }
      }
    );
const loginResult= await copyleaks.loginAsync('htndemzy@gmail.com','9d20a1df-8622-4eba-a73c-ab2db2939ea9')
   const id = Date.now() + 1
    
     const result = await copyleaks.submitUrlAsync('education', loginResult, id, submission)

      // copyleaks.submitUrlAsync('businesses', loginResult, Date.now() + 2, submission).then(res => logSuccess('submitUrlAsync - businesses', res), err => logError('submitUrlAsync - businesses', err));
      const document = new Document({
        title: req.body.title,
        author: req.body.name,
        url: 'https://www.gd.dreamhub.co.zw/docs/' +req.file.filename,
        desc: req.body.desc,
        scanid:id
      });
    

      await document.save()
      res.json({document,result})
      

  }catch(e){
    res.status(500).send(e.message)
  }
    
  };

exports.findAll = (req, res) => {
    Document.find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error  occured while retrieving Jobs.",
        });
      });
  };
  exports.downloadFile = (req, res, next) => {
	const directoryPath = process.cwd() +'/uploads/'
	const filename = req.params.filename

	res.download(directoryPath + filename, filename, (error) => {
		if (error) {
			return res.send(error)
		}
	})}


    exports.downloadFile = (req, res, next) => {
        const directoryPath = process.cwd() +'/uploads/'
        const filename = req.params.filename
    
        res.download(directoryPath + filename, filename, (error) => {
            if (error) {
                return res.send(error)
            }
        })}
        exports.hook = (req, res) => {
        
         data = req.body
          const report  = new Report({
            scanid:data.scannedDocument.scanId,
            totalWords: data.scannedDocument.totalWords,
            totalExcluded: data.scannedDocument.totalExcluded,
            credit: data.scannedDocument.credit,
            expectedCredits: data.scannedDocument.expectedCredits,
            creationTime: data.scannedDocument.creationTime,
            status:data.status,
            results:data.results,
            notifications: data.notifications,
    
          })
          report
          .save(report)
          .then((data) => {
            console.log(data)
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occured while creating the report",
            });
          });

            res.status(200).end() // Responding is important
         }