module.exports = app => {
    const exercises = require('../controllers/exercise.controller');
    let router = require('express').Router();

    router.post('/', exercises.create);
    router.get('/', exercises.findAll);
    router.put('/:id', exercises.update);
    router.delete('/:id', exercises.delete);

    app.use('/api/exercises', router); 
}