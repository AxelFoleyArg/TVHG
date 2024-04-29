function guestMiddleware(req,res,next) {
if(req.session.userLogged) {
    return res.redirect('userProfile')
}
next()
}
// ESTE MIDDLEWARE LO QUE HACES ES LO SIGUIENTE: SI EL USUARIO YA INICIO SESION Y QUIERE ENTRAR A /LOGIN O /REGISTER NO PUEDE, JUSTAMENTE PORQUE YA INICIO SESION


module.exports = guestMiddleware
