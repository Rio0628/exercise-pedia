const db = require('../models');
const Category = db.categories;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    
    if (!req.body.name) { res.status(400).send({ message: "Content can not be empty!" }); return; };

    // Create category
    const category = {
        name: req.body.name,
        descirption: req.body.description
    };

    Category.create(category).then(data => res.send(data)).catch(err => res.status(500).send({ message: err.message || 'Some error occurred while creating the Category' }))
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = name ? { name: { [Op.like]: `%${name}%`} } : null;
    Category.findAll({ where: condition }).then(data => res.send(data) ).catch(err => res.status(500).send({ message: err.message || 'Error retrieving all categories.' }))
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({ where: { id: id } }).then(num => {
        if (num === 1) { res.send({ message: 'Category deleted successfully!' }) }
        else { res.send({ message: 'Could not delete Category. Error Occurred!' }) }
    }).catch(err => res.status(500).send({ message: 'Could not delete Category. Error Occurred!' }) );
};