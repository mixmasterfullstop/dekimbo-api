


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
    
     console.log(req.file)
    var submission = new CopyleaksFileSubmissionModel(
        'aGVsbG8gd29ybGQ=',
        req.file.filename,
        {
          sandbox: true,
          webhooks: {
            status: 'http://127.0.0.1:8090/api/doc//submit-file-webhook/200'
          }
        }
      )
   
    copyleaks.loginAsync('htndemzy@gmail.com','9d20a1df-8622-4eba-a73c-ab2db2939ea9').then(loginResult=> {
        copyleaks.submitFileAsync('education', loginResult, Date.now() + 1, submission).then(result => console.log(result), error => { console.log(error) });
        // copyleaks.submitFileAsync('businesses', loginResult, Date.now() + 2, submission).then(result => logSuccess('submitFileAsync - businesses', result), error => logError('submitFileAsync - businesses', error));
    } , err=> {
        console.log(err)
    });


  res.send('done')

    const document = new Document({
      title: req.body.title,
      author: req.body.name,
      url: 'https://afternoon-lowlands-61668.herokuapp.com/api/document/' +req.body.url,
      desc: req.body.desc,
    });
    try {
  
    }catch(err) {
      res.send(400);
    }
    document
      .save(document)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occured while creating the Document",
        });
      });
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
