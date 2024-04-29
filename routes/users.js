//Base Requires
let express = require('express');
let router = express.Router();
let multer = require('multer')
let path = require('path') 
const { body } = require('express-validator');
let db = require("../database/models")

//Controller Require
const userController = require('../controllers/userController')

//Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/avatars'))
  },

  filename: (req, file, cb) => {
    console.log(file)
    const newFileName = 'avatar' + Date.now() + path.extname(file.originalname);
    cb(null, newFileName)
  }
});

const upload = multer({ storage: storage }); 

//Validations
const validations = [
  body('email').notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
               .isEmail().withMessage('Tienes que escribir un formato de corro válido'),
  body('name').notEmpty().withMessage('Tienes que escribir un nombre'),
  body('surname').notEmpty().withMessage('Tienes que escribir un apellido'),
  body('steam').notEmpty().withMessage('Tienes que escribir un usuario de Steam'),
  body('avatar').custom((value, {req}) => {
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
  }),

 body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

  body('confirm')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('La contraseña no coincide');
      }
      return true;
    })
]

//Register Routes
router.get('/register', userController.register)
router.post("/store", upload.single('avatar'), validations, userController.processRegister)

//Login Routes
router.get('/login', userController.login),
router.post('/login', userController.processLogin)
router.get('/profile', userController.show)
router.get('/profile/:id/', userController.showthis)

//Profile Routes
router.get('/profile-edit/:id/', userController.edit)
router.put('/profile-edit/:id/', upload.single('avatar'), validations, userController.update)

//Logout Routes
router.get('/logout', userController.logout);

// Other Routes
router.get('/', userController.list),
router.get("/ranking", userController.rank),

module.exports = router;

