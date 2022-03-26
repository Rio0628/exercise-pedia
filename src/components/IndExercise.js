import React, { useState } from 'react';

const IndExercise = (props) => {
    
    // let newCatView = false;
    let [newCatView, setNewCatView] = useState(false), [categoryName, setCategoryName] = useState(''), [categoryDesc, setCategoryDesc] = useState('');
    console.log(categoryName, categoryDesc);
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

            <p className='saveNewCat' onClick={() => { setNewCatView(true) }}>Save To New Category</p>

            { newCatView === true ? 
                <div className='createNewCatCntr'>
                    <div className='elmntsCntr'>
                        <p className='createNewCatHeading'>Create Category</p>

                        <input className='categoryInp' type='text' placeholder='Category Name' onChange={(e) => setCategoryName(e.target.value)}/>

                        <textarea className='descriptionInp' type='text' placeholder='Category Description' onChange={(e) => setCategoryDesc(e.target.value)}/>

                        <p className='createBtn' onClick={() => {props.saveItemNewCat(categoryName, categoryDesc); setNewCatView(false);}}>Create</p>
        
                        <p className='cancelBtn' onClick={() => setNewCatView(false)}>Cancel</p>
                    </div>
                </div> 
            : null }


        </div>
    );
}

export default IndExercise;