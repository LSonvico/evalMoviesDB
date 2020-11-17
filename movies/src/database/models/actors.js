const {sequelize, dataTypes} = require('sequelize');

module.exports = (sequelize, dataTypes) => {
    const actors = sequelize.define('actors', {
        first_name: dataTypes.STRING,
        last_name: dataTypes.STRING,
        rating: dataTypes.INTEGER,
        favorite_movie_id: dataTypes.INTEGER,
    })
    actors.associate = (models => {
        actors.belongsToMany(models.movie, {
            through: 'actor_movie',
        }) 
    });
    return actors;
};