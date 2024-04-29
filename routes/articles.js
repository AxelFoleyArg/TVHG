/* Basic Requires*/
let express = require('express');
let router = express.Router();
let multer = require('multer')
let path = require('path') 
let { body } = require('express-validator');

//Controller Require
let articlesController = require('../controllers/articlesController')

//Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/articles'))
},
filename: (req, file, cbe) => {
  const newFileName = "article" + Date.now() + path.extname(file.originalname);
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
router.get('/create', articlesController.create)
router.post('/store', upload.single('image'), validations, articlesController.store)

// Articles's Routes //
router.get('/:id/', articlesController.notice)

// Edit n' Update //
router.get('/edit/:id/', articlesController.edit)
router.put('/update/:id', upload.single('image'), validations, articlesController.update)

// Delete it //
router.delete('/delete/:id', articlesController.delete)


module.exports = router