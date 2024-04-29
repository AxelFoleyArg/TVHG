module.exports = (sequelize, DataTypes) =>{

    let alias = "Articles"
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
        tablename: "articles",
        timestamps: false
    }

    const Articles = sequelize.define (alias, cols, config)

    return Articles
}