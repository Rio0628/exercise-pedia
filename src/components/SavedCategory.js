import React from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';

const SavedCategory = (props) => {


    return (
        <div className='savedCategory'>
            <h3 className='savedCategoryHeading'>Category: Something</h3>
            
            <p className='descriptionCategory'>This is the description for the category</p>
        
            <div className='rsltsItemsCntr'>
                
                { props.items.map(item => 
                
                    <div className='indRsltItem' key={item.exercise}>
                    
                        <div className='exerciseNameBtnCntr'>
                            <p className='exerciseName' onClick={() => props.savedItemToView(item.idExercise)}>{item.exercise}</p>

                            <div className='removeBtn' onClick={() => props.deleteItem(item.id, item.category)}><RiDeleteBin7Fill className='logo' /></div>
                        </div>

    
                        <img className='gifOfExercise' src={item.gif} alt={item.exercise} onClick={() => props.savedItemToView(item.idExercise)}></img>

                    </div>
          
                )}
                
            </div>
        </div>
    );
}

export default SavedCategory;