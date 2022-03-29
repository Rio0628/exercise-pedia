import React, { useState } from 'react';

const IndExercise = (props) => {
    
    // let newCatView = false;
    let newCatInp = props.currentSavedItemInfo.category;
    let [newCatView, setNewCatView] = useState(false), 
        [categoryName, setCategoryName] = useState(''), 
        [categoryDesc, setCategoryDesc] = useState(''),
        [currentItemSaved, setCurrentItemSaved] = useState(props.currentItemSaved);

    const checkInput = async (e) => {
    
        newCatInp = e.target.value;

        console.log(e.target.value)
        console.log(newCatInp)

        if (newCatInp === props.currentSavedItemInfo.category) {  setCurrentItemSaved(true); console.log('works') }
        else { setCurrentItemSaved(false); console.log('works 2') }
    
    }


    return (
        <div className='indExercise'>
            <h3 className='indExerciseName'>{props.exercise.name}</h3>

            <img className='indExerciseGif' alt={props.exercise} src={props.exercise.gifUrl}></img>

            <p className='exerciseBodyPart'>Body Part: {props.exercise.bodyPart}</p>

            <p className='exerciseTargetArea'>Target: {props.exercise.target}</p>

            <p className='exerciseEquipment'>Equipment: {props.exercise.equipment}</p>

            <div className='saveExerciseCntr'>
                <select className='selectCat' defaultValue={props.currentSavedItemInfo.category} onChange={checkInput}>
                    { props.allCategories.map(category => 
                        <option key={category.name}>{category.name}</option>
                    )}
                    <option>awd</option>
                    <option>awaswdd</option>
                    <option>adsfadsfawaswdd</option>
                </select>

                <p className={ currentItemSaved ? 'saveExercise active' : 'saveExercise' } onClick={() => props.saveItem(newCatInp)}>{ currentItemSaved ? 'Saved' : 'Save'  }</p>
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