const {movie, genre, actors} = require('../database/models');
const {Op} = require('sequelize');


module.exports = {
    index: async (req, res, next) => {
        try {
        res.render('home')
        // res.redirect("./movies"); 

        } catch (error) {
            console.log (error);
        }
    },
    all: async (req, res, next) => {
        try {
        const moviesJson = await movie.findAll({include:['genre', 'actores']}); //el metodo include se agrega para que los resultados muestren, en este caso, las relaciones entre genre y actores, si llamasemos al metodo movie.findAll({include:{all:true}}) eso traeria todas las relaciones activas al momento.
        const moviesJs = await moviesJson; 
        res.render("movies", {peliculas: moviesJson}); // renderiza la vista 'movies' y envia la variable peliculas con el objeto moviesJson

        } catch (error) {
            console.log (error);
        }
    },
    one : async (req, res, next) => {
        try {
            const moviesJson = await movie.findByPk(req.params.id,{include:['genre', 'actores']});
            const generos = await genre.findAll(); // trae todos los generos
            const actores = await actors.findAll(); // trae todos los actores
            // res.send({pelicula:moviesJson,genre,actores})
            res.render("movieDetail", {pelicula:moviesJson, genre, actores});
            
        } catch(error){
            console.log(error);
        }
    }, 
    new : async (req, res, next) => {
        try {
            const moviesJson = await movie.findAll({
                order: [['release_date', 'DESC']],
                limit: 5
            });
            res.render("newMovies", {peliculas:moviesJson});
            
        } catch(error){
            console.log(error);
        }
    },
    recommended: async (req, res, next) => {
        try {
            const moviesJson = await movie.findAll({
                where: {
                    rating: {[Op.gte]: 8}
                }
            });
            res.render("recommendedMovies", {peliculas:moviesJson});

        } catch(error){
            console.log(error);
        }
    },
    search: async (req, res, next ) => {
        try {
            const moviesjson = await movie.findAll({
             where: {
                 title: {[Op.like]: ('%'+req.body.name+'%')}
            }
        });
        //console.log(moviesjson);
        res.render('search',{peliculas:moviesjson});
       
        }catch(error){
            console.log(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const generos = await genre.findAll(); // trae todos los generos
            const actores = await actors.findAll(); // trae todos los actores

        res.render('createMovie',{generos, actores}); // envia a la vista createMovies todos los generos y todos los actores
       
        }catch(error){
            console.log(error);
        }
    },

    store: async (req, res, next) => {
        try {
            console.log(req.body); // ver que tiene el req.body
            const newMovie = await movie.create(req.body); // crea la pelicula con todos los atributos del req.body, si es que estos son los mismos que en la base de datos
            await newMovie.addActores(req.body.actores); // agrega los actores una vez que la pelicula fue creada
            // res.redirect('/');
            res.send(newMovie)

        }catch (error) {
            console.log(error);
        }
    },

    editmovie: async (req, res, next) => {
        try {
            const movieId = req.params.id;
            const editMovie = await movie.findByPk(movieId, {include: ['genre','actores']}); // trae una pelicula particular
            const generos = await genre.findAll(); // trae todos los generos
            const actores = await actors.findAll(); // trae todos los actores
            res.render ('editMovie', {editMovie, generos, actores})
        
        }catch(error) {
            console.log(error);
        }
    },

    updatemovie: async (req, res, next) => {
        try {
            // console.log(req.body) // ver que tiene el req.body
            const movieId = req.params.id;  
            const saveMovie = await movie.findByPk(movieId, {include: ['genre', 'actores']}); // trae todos los datos de la pelicula
            await saveMovie.removeActores(saveMovie.actores); // sacar todos los actores que tenia previamente la pelicula
            await saveMovie.addActores(req.body.actores); // agregar los nuevos actores (aun asi si son los mismos) a la pelicula 
            await saveMovie.update(req.body) // agrega todos los datos nuevos a la pelicula 
            res.redirect ('/')
        
        }catch(error) {
            console.log(error);
        }
    }, 

    delete: async (req, res, next) => {
        try {
            console.log(req.params.id);
            const movieId = req.params.id;
            const deleteMovie = await movie.findByPk(movieId,{include: ['genre', 'actores']});
            await deleteMovie.removeActores(deleteMovie.actores);
            await deleteMovie.destroy();
            res.redirect('/')

        }catch(error) {
            console.log(error)
        }
    }
}