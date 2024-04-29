let db = require('../database/models')

let eventsController = {
    list: function(req, res, next) {
        db.Event.findAll()
        .then(function(events){
            res.render('events', {events})
        })
        .catch(error => res.send(error))
    },

    registerToEvent: function(req, res) {
        let user = req.session.userLogged;
        let event = req.params.id

        console.log(user, event)
    
                db.UserEvent.create({
                  userId: user.id,
                  eventId: event
                }).then(function(userEvent) {
                  return res.redirect("/events");
                }).catch(function(error) {
                  console.log(error);
                  return res.status(500).send("Error interno del servidor");
                });
              },
              
    detail: function(req, res) {
      db.Event.findByPk(req.params.id)
      .then(function(event){
        res.render('event', {event: event})
      });
    }
}
    
      



module.exports = eventsController