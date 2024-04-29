let express = require ('express')
let router = express.Router()

const leaderboardController = require ('../controllers/leaderboardController')

router.get('/', leaderboardController.show)

module.exports = router;