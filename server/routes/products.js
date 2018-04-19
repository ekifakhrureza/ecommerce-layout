const express = require('express')
const router = express.Router()
const multer = require('multer')

const {getAll,getOne,add,update,remove} =  require('../controllers/product.controller')
const {sendFileGCS} = require('../middlewares/uploadGCS')
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 50 * 1024 * 1024
    }
  })
router.get('/',getAll)
router.get('/:id',getOne)
router.post('/add',upload.fields([{name: 'link', maxCount: 1}]),sendFileGCS, add)
router.put('/update/:id/:qty',update)
router.delete('/delete/:id',remove)

module.exports = router
