module.exports = (sequelize, DataTypes) => {

    let alias = "UserEvent"
    let cols= {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
     
      },
      userId: {
        type: DataTypes.INTEGER,
      
      },
      eventId: {
        type: DataTypes.INTEGER,
     
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    };

    let config = {
      tablename: "uservents",
      timestamps: false
  }

  const UserEvent = sequelize.define (alias, cols, config)
  
    return UserEvent;
  };