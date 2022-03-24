const db = require('../models');
const Exercise = db.exercises;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.exercise) { res.status(400).send({ message: 'Content can not be empty!'}); return; }

    // Create Exercise
    const exercise = {
        exercise: req.body.exercise,
        idExercise: req.body.idExercise,
        category: req.body.category
    };

    Exercise.create(exercise).then(data => res.send(data)).catch(err => res.status(500).send({message: err.message || "Some error occured while creating the Exercise"}));
};

exports.findAll = (req, res) => {
    const exercise = req.query.exercise;
    let condition = exercise ? { exercise: { [Op.like]: `%${exercise}%`} } : null;

    Exercise.findAll({ where: condition }).then(data => res.send(data)).catch(err => { res.status(500).send({ message: err.message || 'Some error occurred while reatrieving Exercises.' }); });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Exercise.update(req.body, { where: { id: id } }).then(num => {
        if (num === 1) { res.send({ message: 'Exercise updated succesfully' }) }
        else { res.send({ message: 'Cannot update Exercise. Try again!' }) }
    }).catch(err => res.status(500).send({ message: 'Error updating Exercise' }));
} 

exports.delete = (req, res) => {
    const id = req.params.id;

    Exercise.destroy({ where: { id: id } }).then(num => {
        if (num === 1) { res.send({ message: 'Exercise was deleted successfully!' })}
        else { res.send({ message: 'Could not delete Exercise right now. Try again!' })}
    }).catch(err => res.status(500).send({ message: 'Could not delete Exercise right now. Try again' }) )
}