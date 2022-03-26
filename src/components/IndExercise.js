import React from 'react';

const IndExercise = (props) => {
    
    console.log(props.exercise)

    return (
        <div className='indExercise'>
            <h3 className='indExerciseName'>{props.exercise.name}</h3>

            <img className='indExerciseGif' alt={props.exercise} src={props.exercise.gifUrl}></img>

            <p className='exerciseBodyPart'>Body Part: {props.exercise.bodyPart}</p>

            <p className='exerciseTargetArea'>Target: {props.exercise.target}</p>

            <p className='exerciseEquipment'>Equipment: {props.exercise.equipment}</p>

            <div className='saveExerciseCntr'>
                <select className='selectCat'>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>

                <p className='saveExercise'>Save</p>
            </div>

            <p className='saveNewCat'>Save To New Category</p>

            {/* <div className='createNewCatCntr'>
                <div className='elmntsCntr'>
                    <p className='createNewCatHeading'>Create Category</p>

                    <input className='categoryInp' type='text' placeholder='Category Name'/>

                    <textarea className='descriptionInp' type='text' placeholder='Category Description' />

                    <p className='createBtn'>Create</p>
        
                    <p className='cancelBtn'>Cancel</p>
                </div>
            </div> */}


        </div>
    );
}

export default IndExercise;