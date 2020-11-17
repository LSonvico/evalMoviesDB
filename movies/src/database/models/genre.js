const {sequelize, dataTypes} = require('sequelize');

module.exports = (sequelize, dataTypes) => {
    const genre = sequelize.define('genre', {
        name: dataTypes.STRING,
        ranking: dataTypes.DECIMAL,
        active: dataTypes.INTEGER,
    })
    
    genre.associate = (models => {
        genre.hasMany(models.movie)
    });
    return genre;
};