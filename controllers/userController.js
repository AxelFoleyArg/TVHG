let db = require("../database/models")
let { validationResult } = require ("express-validator")
const bcryptjs = require('bcryptjs')
const { unsubscribe } = require("../routes/users")

let userController = {

    register: function(req, res, next){
        res.render('register')
      },

      login:function(req, res, next){
        res.render('login')
      },

      processLogin: (req, res) => {
        db.User.findOne({ where: { email: req.body.email }})
      
            .then((userToLogin) => {
                if (userToLogin) {
                    let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
                    if (isOkThePassword) {
                        req.session.userLogged = userToLogin
                        // el siguiente if hace que si el usuario tildo la opcion de recordar usuario, cuando cierra el navegador sigue en sesion
                        if (req.body.recordar_usuario) {
                            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 })
                        }
                        res.render('user', {'user': userToLogin})
                    } else {
                        res.render('login', {
                            errors: {
                                email: {
                                    msg: 'Las credenciales son invalidas'
                                }
                            }
                        })
                    }
                } else {
                    res.render('login', {
                        errors: {
                            email: {
                                msg: 'No se encuentra el email registrado en la base de datos'
                            }
                        }
                    })
                }

            })

    },
    
    list: function (req, res){
        db.User.findAll()
        .then (function(users){
            res.render('players', {users})
        })
        .catch(error => res.send(error))
      },
    
    rank: function(req, res, next){
        db.User.findAll({
         order: [['points', 'DESC']]
        })
        .then (function(users){
         res.render('ranking', {users})
        })
        .catch(error => res.send(error))
       },

    processRegister: function(req, res, next){
           const resultValidation = validationResult(req)

          if(resultValidation.errors.length > 0){
            return res.render('register',{errors : resultValidation.mapped(),
            oldData: req.body
            })
          }

          db.User.findOne({ where: { email: req.body.email } })
          .then((user) => {
              if (user) {
                  return res.render('register', {
                      errors: {
                          email: { msg: 'Este email ya esta registrado' }
                      },
                      oldData: req.body
                  })
              } else {
                  db.User.create({
                      name: req.body.name,
                      surname: req.body.surname,
                      email: req.body.email,
                      steam: req.body.steam,
                      password: bcryptjs.hashSync(req.body.password, 10),
                      avatar: req.file.filename
                  })
                  .then (function(user){
                      res.render('user', {'user': user})
                  })
              }
          })
        },

     edit: function(req, res){
        db.User.findByPk(req.params.id)
        .then(function(user){
        res.render('user-edit', {user: user})
        })
     },

     update: (req, res) => {
        let updateData = {
          name: req.body.name,
          surname: req.body.surname,
          steam: req.body.steam,
          civ: req.body.civ,
          description: req.body.description
        };
          
        // Verificar si se cargó una nueva imagen
        if (req.file) {
          updateData.avatar = req.file.filename;
        }
          
        console.log(updateData)
        db.User.update(updateData, {
          where: {
            id: req.params.id
          }
        })
        .then(() => {
          db.User.findByPk(req.params.id)
            .then(user => {
              res.render('user', { user });
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
      },
    
    show: async (req, res) => {
        let user = req.session.userLogged;
    
        try {
            // Actualizar los datos del usuario
            await db.User.update({},
                {
                    where: { id: user.id },
                    limit: 1,
                });
    
            // Volver a buscar el usuario en la base de datos
            let updatedUser = await db.User.findOne({
                where: { id: user.id },
                limit: 1,
            });
    
            if (!updatedUser) {
                res.redirect('/');
            } else {
                res.render('user', { user: updatedUser });
            }
        } catch (error) {
            console.error(error);
            res.redirect('/');
        }
    },

    showthis: (req,res)=>{
        db.User.findByPk(req.params.id)
        .then(function(user){
            res.render('usertoshow', {user: user})
        })
    },
    
    logout: (req, res) => {
        res.clearCookie('userEmail')
        req.session.destroy()
        res.redirect('/')
        },

}

module.exports = userController


