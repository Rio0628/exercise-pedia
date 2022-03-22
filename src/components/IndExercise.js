import React from 'react';

const IndExercise = () => {
    return (
        <div className='indExercise'>
            <h3 className='indExerciseName'>Exercise</h3>

            <div className='indExerciseGif'></div>

            <p className='exerciseBodyPart'>Body Part Exercise</p>

            <p className='exerciseTargetArea'>Target Exercise</p>

            <p className='exerciseEquipment'>Equipment Exercise</p>

            <div className='saveExerciseCntr'>
                <select className='selectCat'>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>

                <p className='saveExercise'>Save</p>
            </div>

            <p className='saveNewCat'>Save To New Category</p>

            <div className='createNewCatCntr'>
                <div className='elmntsCntr'>
                    <p className='createNewCatHeading'>Create Category</p>

                    <input className='categoryInp' type='text' placeholder='Category Name'/>

                    <textarea className='descriptionInp' type='text' placeholder='Category Description' />

                    <p className='createBtn'>Create</p>
        
                    <p className='cancelBtn'>Cancel</p>
                </div>
            </div>


        </div>
    );
}

export default IndExercise;