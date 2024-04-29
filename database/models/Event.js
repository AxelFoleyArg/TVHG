const { Sequelize } = require("sequelize");

module.exports =(sequelize, DataTypes) =>{
    let alias = "Event"
    let cols= {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type:DataTypes.STRING
        },
        date: {
            type:DataTypes.STRING
        },
        type: {
            type:DataTypes.STRING
        },
        description: {
            type:DataTypes.STRING
        },
        last_champion: {
            type:DataTypes.STRING
        },
        awards: {
            type:DataTypes.STRING
        },
        played: {
            type: DataTypes.INTEGER
        }

    };

    config = {
        tablename: "events",
        timestamps: false
    }

    const Event = sequelize.define(alias, cols, config)

    Event.associate = (models) => {
        Event.belongsToMany(models.User, {
          through: models.UserEvent,
          foreignKey: 'eventId'
        });
      };
    
    return Event
}