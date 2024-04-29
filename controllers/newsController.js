let db = require ("../database/models")

let newsController = { 

    notice: (req, res) =>{
        db.News.findOne({
            where: {id : req.params.id}
        })
        .then(function(notice){
            res.render('news', {notice : notice})
        })
    },

    create: (req, res) => {
        res.render('news-create')
    },

    store: (req, res)=>{
        const currentDate = new Date();
        db.News.create({
            title: req.body.title,
            author: req.body.author,
            synopsis: req.body.synopsis,
            content: req.body.content,
            release_date: currentDate
        })
        .then(function(notice){
            console.log(notice);
            res.render('news', {notice : notice});
        })
    },

    edit: (req, res) =>{
        db.News.findByPk(req.params.id)
        .then(function(notice){
            res.render('news-edit', {notice : notice})
        })
    
        },

    update: (req, res) => {
        let updateData = {
            title: req.body.title,
            author: req.body.author,
            synopsis: req.body.synopsis,
            content: req.body.content,
            };
        
            console.log(updateData);
        
            db.News.update(updateData, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                db.News.findByPk(req.params.id)
                    .then(notice => {
                        res.render('news', { notice : notice});
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        },
        
        delete: (req, res) => {
            const newsId = req.params.id;
        
            db.News.destroy({
              where: {
                id: newsId
              }
            })
              .then(() => {
                res.redirect('/');
              })
              .catch((error) => {
                res.status(500).send('Error al eliminar el artículo');
              });
          }
    }
module.exports = newsController