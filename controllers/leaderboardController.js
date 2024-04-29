let db = require ('../database/models')

let leaderboardController = {
    show: function(req, res) {
        res.render('leaderboard')
    }
}

module.exports = leaderboardController