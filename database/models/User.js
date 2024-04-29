
module.exports = (sequelize, dataTypes) => {

    let alias = "User"
    let cols= {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING
        },
        surname: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        steam:{
            type: dataTypes.STRING
        },
        phone:{
            type: dataTypes.INTEGER
        },
        password:{
            type: dataTypes.INTEGER
        },

        points:{
            type: dataTypes.INTEGER
        },
        avatar:{
            type:dataTypes.STRING
        },
        civ:{
            type:dataTypes.STRING
        },
        category:{
            type:dataTypes.STRING
        },
        teamplay:{
            type:dataTypes.INTEGER
        },
        start:{
            type:dataTypes.INTEGER
        },
        imperial:{
            type:dataTypes.INTEGER
        },
        tactics:{
            type:dataTypes.INTEGER
        },
        palmares:{
            type:dataTypes.STRING
        },
        description: {
            type:dataTypes.STRING
        },
        admin: {
            type:dataTypes.INTEGER
        }
    };
    let config = {
        tablename: "users",
        timestamps: false
    }

    const User = sequelize.define (alias, cols, config)

    User.associate = (models) => {
        User.belongsToMany(models.Event, {
          through: models.UserEvent,
          foreignKey: 'userId'
        });
      };

    return User
}