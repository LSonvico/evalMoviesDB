const {sequelize, dataTypes} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, dataTypes) => {
    const movie = sequelize.define('movie', {
        title:dataTypes.STRING,
        rating:dataTypes.DECIMAL,
        awards:dataTypes.INTEGER,
        release_date:dataTypes.DATEONLY,
        length:dataTypes.INTEGER,
        genre_id:dataTypes.INTEGER
    })
    
    movie.associate = (models => {
        movie.belongsTo(models.genre);
        movie.belongsToMany(models.actors,{
            as:'actores',
            through: 'actor_movie'
        });
    });
    return movie;
};