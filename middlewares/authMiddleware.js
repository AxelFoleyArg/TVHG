function authMiddleware(req,res,next) {
    

    if(!req.session.userLogged) {
        return res.redirect('/user/login')
    }
    
    
    next()
    }
    // ESTE MIDDLEWARE LO QUE HACES ES LO SIGUIENTE: SI EL USUARIO NO INICIO SESION Y QUIERE ENTRAR A MI PERFIL NO PUEDO PORQUE NO INICIO SESION. PRIMERO SE TIENE QUE LOGGEAR
    
    
    module.exports = authMiddleware
    