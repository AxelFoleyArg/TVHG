/* Basic Requires*/
let express = require('express');
let router = express.Router();
let db = require ('../database/models')


/* GET home page. */
router.get('/', (req, res) => {
  const newsPromise = db.News.findAll({
    order: [['release_date', 'DESC']],
    limit: 5
  });

  const articlesPromise = db.Articles.findAll({
    order: [['release_date', 'DESC']],
    limit: 2
  });

  Promise.all([newsPromise, articlesPromise])
    .then(([news, articles]) => {
      res.render('index', { news, articles });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/gallery', (req, res)=>{
  res.render('gallery')
})
module.exports = router;
