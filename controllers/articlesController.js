let db = require ("../database/models")

let articlesController = { 

    notice: (req, res) =>{
        db.Articles.findOne({
            where: {id : req.params.id}
        })
        .then(function(notice){
            res.render('article', {notice : notice})
        })
    },

    create: (req, res) => {
        res.render('article-create')
    },

    store: (req, res)=>{
        const currentDate = new Date();
        db.Articles.create({
            title: req.body.title,
            author: req.body.author,
            synopsis: req.body.synopsis,
            content: req.body.content,
            release_date: currentDate
        })
        .then(function(notice){
            res.render('article', {notice : notice});
        })
    },

    edit: (req, res) =>{
        db.Articles.findByPk(req.params.id)
        .then(function(notice){
            res.render('article-edit', {notice : notice})
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
            
            db.Articles.update(updateData, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                db.Articles.findByPk(req.params.id)
                    .then(notice => {
                    res.render('article', { notice : notice});
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        },

        delete: (req, res) => {
            const articleId = req.params.id;
        
            db.Articles.destroy({
              where: {
                id: articleId
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
module.exports = articlesController