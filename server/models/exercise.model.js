module.exports = (sequelize, Sequelize) => {
    const Exercise = sequelize.define('exercise', {
        exercise: { type: Sequelize.STRING },
        idExercise: { type: Sequelize.BIGINT },
        category: { type: Sequelize.STRING }
    });
    return Exercise;
}

/*
    
    Name Exercise
    Id
    Category

*/