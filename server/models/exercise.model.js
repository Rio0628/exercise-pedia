module.exports = (sequelize, Sequelize) => {
    const Exercise = sequelize.define('exercise', {
        exercise: { type: Sequelize.STRING },
        gif: { type: Sequelize.STRING },
        idExercise: { type: Sequelize.STRING },
        category: { type: Sequelize.STRING }
    });
    return Exercise;
}

/*
    
    Name Exercise
    Id
    Category

*/