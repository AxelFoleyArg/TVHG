//Base requires
let express = require ('express')
let router = express.Router();
let userLoggedMiddleware = require ('../middlewares/userLoggedMiddleware')

//DB Model Requires

const eventsController = require('../controllers/eventsController')

//Routes

router.get('/', eventsController.list)
router.get('/:id/', eventsController.detail)

router.post('/inscription/:id', eventsController.registerToEvent)

  module.exports = router
