/* Basic Requires*/
let express = require('express');
let router = express.Router();
let multer = require('multer')
let path = require('path') 
let { body } = require('express-validator');

//Controller Require
let newsController = require('../controllers/newsController')

//Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/news'))
},
filename: (req, file, cbe) => {
  const newFileName = "news" + Date.now() + path.extname(file.originalname);
  cb(null, newFileName)
}
});

const upload = multer({storage : storage});

//Validations
const validations = [
  body('title').notEmpty().withMessage('Tienes que escribir un titulo'),
  body('author').notEmpty().withMessage('Tienes que escribir un autor'),
  body('synopsis').notEmpty().withMessage('Tienes que escribir una sinopsis'),
  body('content').notEmpty().withMessage('Tienes que escribir contenido'),
  body('image').custom((value, {req}) => {
    let file = req.file
    let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];
   

    if(!file) {
      throw new Error ('Tienes que subir una imagen')
    }
    else{
      let fileExtension = path.extname(file.originalname)
      if(!acceptedExtensions.includes(fileExtension)) {
        throw new Error ('Las extensiones de archivo permitidas son JPG, JPEG, PNG o GIF')
    }
    
    }
    return true
  })
]


// Create n' Store //
router.get('/create/', newsController.create)
router.post('/store/', upload.single('image'), validations, newsController.store)

// New's Routes //
router.get('/:id/', newsController.notice)

// Edit n' Update //
router.get('/edit/:id/', newsController.edit)
router.put('/update/:id/',upload.single('avatar'), validations, newsController.update)

router.delete('/delete/:id', newsController.delete)

module.exports = router