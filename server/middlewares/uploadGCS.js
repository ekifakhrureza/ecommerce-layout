const multer = require('multer')
const Storage = require('@google-cloud/storage')
const config = {
  cloud_bucket: 'ecommerce.ekifakhrureza.com',
  project_id: 'tribal-ethos-200813'
}

const storage = Storage({
  projectId: config.project_id,
  keyFilename: 'My First Project-5de84fe1ee47.json'
})

const bucket = storage.bucket(config.cloud_bucket)

function getPublicUrl (filename) {
  return `https://storage.googleapis.com/${config.cloud_bucket}/${filename}`
}

function sendFileGCS (req, res, next) {
  if(!req.files) {
    return next('upload file could be failed!')
  }
 
  const promisePicture = new Promise((resolve, reject)=>{

    const gcsname = Date.now() + '.' + req.files.link[0].originalname.split('.').pop()
    const file = bucket.file(gcsname)
  
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.files.link[0].mimetype
      }
    })
    
    stream.on('error', (error) => {
      req.files.link[0].cloudStorageError = error
      reject(error)
    })
  
    stream.on('finish', () => {
      req.files.link[0].cloudStorageObject = gcsname
      file.makePublic().then(()=>{
        req.files.link[0].cloudStoragePublicUrl = getPublicUrl(gcsname)
        resolve()
      })
    })
  
    stream.end(req.files.link[0].buffer)
  })

  Promise.all([promisePicture]).then(allready=>{
    next()
    })
    .catch(err=>{
      next(err)
  })
}

module.exports = {
  sendFileGCS
}