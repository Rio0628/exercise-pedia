import React, { useState } from 'react';

const IndExercise = (props) => {
    
    let category;

    // Conditionals to set category value to first category of DB 
    if ( props.allCategories.length ) category = props.allCategories[0].name
    else category = '';
    
    // Conditional to set category as the set category value for saved exercise
    if (props.currentSavedItemInfo || props.itemSaved) { category = props.currentSavedItemInfo.category; console.log('this works')}

    let [newCatView, setNewCatView] = useState(false), 
        [categoryName, setCategoryName] = useState(''), 
        [categoryDesc, setCategoryDesc] = useState(''),
        [newCatInp, setNewCatInp] = useState(category),
        [currentItemSaved, setCurrentItemSaved] = useState(props.currentItemSaved)
    ;

    const checkInput = async (e) => {
        // Sets the input of select category element and displays certain styling for save button according to value of input
        if (e.target.value === category) {  setCurrentItemSaved(true); console.log('works') }
        else { setCurrentItemSaved(false); console.log('works 2') }

        await setNewCatInp(e.target.value);
    }

    const itemSavedToNewCat = () => {
        // Calls save item to new cat function and bring the new cat view out of view
        category = categoryName;

        props.saveItemNewCat(categoryName, categoryDesc); 
        setNewCatView(false); 
        setCurrentItemSaved(true);
    
    }


    return (
        <div className='indExercise'>
            <h3 className='indExerciseName'>{props.exercise.name}</h3>

            <img className='indExerciseGif' alt={props.exercise} src={props.exercise.gifUrl}></img>

            <p className='exerciseBodyPart'><span>Body Part:</span> {props.exercise.bodyPart}</p>

            <p className='exerciseTargetArea'><span>Target:</span> {props.exercise.target}</p>

            <p className='exerciseEquipment'><span>Equipment:</span> {props.
            exercise.equipment}</p>

            { props.allCategories.length ? 
                <div className='saveExerciseCntr'>
                    <select className='selectCat' defaultValue={category} onChange={checkInput}>
                        { props.allCategories.map(category => 
                            <option key={category.name}>{category.name}</option>
                        )}
                    </select>

                    <p className={ currentItemSaved === true ? 'saveExercise active' : 'saveExercise' } onClick={() => { props.saveItem(newCatInp); setCurrentItemSaved(true);}}>{ currentItemSaved ? 'Saved' : 'Save'  }</p>
                </div>
            : null }

            <p className='saveNewCat' onClick={() => { setNewCatView(true) }}>Save To New Category</p>

            { newCatView === true ? 
                <div className='createNewCatCntr'>
                    <div className='elmntsCntr'>
                        <p className='createNewCatHeading'>Create Category</p>

                        <input className='categoryInp' type='text' placeholder='Category Name' onChange={(e) => setCategoryName(e.target.value)}/>

                        <textarea className='descriptionInp' type='text' placeholder='Category Description' onChange={(e) => setCategoryDesc(e.target.value)}/>

                        <p className='createBtn' onClick={itemSavedToNewCat}>Create</p>
        
                        <p className='cancelBtn' onClick={() => setNewCatView(false)}>Cancel</p>
                    </div>
                </div> 
            : null }


        </div>
    );
}

export default IndExercise;