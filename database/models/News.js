module.exports = (sequelize, DataTypes) =>{

    let alias = "News"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        title: {
            type: DataTypes.STRING
        },

        author: {
            type: DataTypes.STRING
        },

        synopsis:{
            type: DataTypes.STRING
        },

        content: {
            type: DataTypes.STRING
        },

        release_date: {
            type: DataTypes.DATE
        }

    };

    let config = {
        tablename: "news",
        timestamps: false
    }

    const News = sequelize.define (alias, cols, config)

    return News
}