const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.loadFromPath("./config/aws.json");

exports.s3_UploadOne = (req, res) => {
  if (!req.file) {
    res.send("Non hai selezionato nessuna immagine!");
    console.log("Non hai selezionato nessuna immagine!");
  } else {
    console.log('Inizio Sequenza Upload...');

    let uploadedFile = req.file;


    // Create S3 service object
    s3 = new AWS.S3({
      apiVersion: "2006-03-01"
    });

    // call S3 to retrieve upload file to specified bucket
    var uploadParams = {
      Bucket: "graffitisbucket",
      Key: "",
      Body: "",
      ContentType: uploadedFile.mimetype,
      ACL: "public-read",
    };

    // Configure the file stream and obtain the upload parameters
    var stream = fs.createReadStream(uploadedFile.path);
    uploadParams.Body = stream;
    uploadParams.Key = "static/graffIMGS/" + uploadedFile.filename;

    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.error("Errore: ", err);
      }
      if (data) {
        console.log("Immagine Caricata su Bucket S3! ", data.Location);
        // res.status(200).redirect("/");
        console.log('Coookie inviato lato server');
        res.status(200).cookie('imgKey', data.Key).json({
          status: 'success',
          key: data.Key
        });
      }
    });
  }
}

exports.s3_DeleteOne = (req, res) => {
  console.log('Inizio Sequenza Rimozione Upload su ' + req.query.key.replace(/%2F/gi, '/'));
  var deleteParams = {
    Bucket: 'graffitisbucket',
    Key: req.query.key.replace(/%2F/gi, '/')
  };

  s3.deleteObject(deleteParams, function (err, data) {
    if (err) console.log(err, err.stack); // error
    else {
      console.log('Immagine Rimossa da Bucket S3!'); // deleted
      res.cookie('imgKey', null).status(204).json({
        status: 'success',
        msg: 'image removed'
      });
    }
  });
}