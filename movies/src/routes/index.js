var express = require('express');
var router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/', moviesController.index); // -> /* GET home page. */

router.get('/movies', moviesController.all); // -> /* GET all movies */
router.get('/movies/detail/:id', moviesController.one); // -> /* GET a movie's detail */

router.get('/movies/edit/:id', moviesController.editmovie); // -> /* GET edit movie form */
router.put('/movies/edit/:id/', moviesController.updatemovie); // -> /* PUT edit movie */
router.delete('/movies/delete/:id', moviesController.delete); // -> /* DELETE movie */

router.get('/movies/new', moviesController.new); // -> /* GET the latest 5 movies */ 
router.get('/movies/recommended', moviesController.recommended); // -> /* GET recommended movies */ 

router.get('/movies/search', moviesController.search); // -> /* GET all movies */ 
router.post('/movies/search', moviesController.search); // -> /* POST all movies */ 

router.get('/movies/create', moviesController.create); // -> /* GET create movie form */ 
router.post('/movies/create', moviesController.store); // -> /* POST create movie form */ 

module.exports = router;
