module.exports = app => {
    const categories = require('../controllers/category.controller');
    let router = require('express').Router();

    router.post('/', categories.create);
    router.get('/', categories.findAll);
    router.delete('/:id', categories.delete);

    app.use('/api/categories', router);
}