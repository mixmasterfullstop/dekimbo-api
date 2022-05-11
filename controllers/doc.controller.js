


const db = require("../models/index.js");
const process = require('process');

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
    
     var submission = new CopyleaksURLSubmissionModel(
        'https://guarded-cove-37393.herokuapp.com/docs/H180270P.docx',
        {
    
          sandbox: true,
          webhooks: {
            status: `https://eo4m9dsgm654ocy.m.pipedream.net/submit-url-webhook/{STATUS}`
          }
        }
      );
    copyleaks.loginAsync('htndemzy@gmail.com','9d20a1df-8622-4eba-a73c-ab2db2939ea9').then(loginResult=> {
      
        copyleaks.submitUrlAsync('education', loginResult, Date.now() + 1, submission).then(result => res.send(result), err => {res.send(err)});
        // copyleaks.submitUrlAsync('businesses', loginResult, Date.now() + 2, submission).then(res => logSuccess('submitUrlAsync - businesses', res), err => logError('submitUrlAsync - businesses', err));


    } , err=> {
        console.log(err)
    });


 

    // const document = new Document({
    //   title: req.body.title,
    //   author: req.body.name,
    //   url: 'https://guarded-cove-37393.herokuapp.com/docs/' +req.file.filename,
    //   desc: req.body.desc,
    // });
  
    // document
    //   .save(document)
    //   .then((data) => {
    //     res.send(data);
    //   })
    //   .catch((err) => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occured while creating the Document",
    //     });
    //   });
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
            console.log(req.body) // Call your action on the request here
            res.status(200).end() // Responding is important
          }