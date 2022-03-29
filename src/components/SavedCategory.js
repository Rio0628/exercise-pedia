import React from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';

const SavedCategory = (props) => {

    // console.log(props.category)

    return (
        <div className='savedCategory'>

            <div className='headingRemoveBtnCntr'>
                <h3 className='savedCategoryHeading'>Category: {props.category.name}</h3>

                <p className='removeCategoryBtn' category={props.category.id} onClick={props.removeCategory}>Remove</p>
            </div>
            
            <p className='descriptionCategory'>Description: {props.category.description}</p>
        
            <div className='rsltsItemsCntr'>
                
                { props.items.map(item => 
                
                    <div className='indRsltItem' key={item.exercise}>
                    
                        <div className='exerciseNameBtnCntr'>
                            <p className='exerciseName' onClick={() => props.savedItemToView(item.idExercise)}>{item.exercise}</p>

                            <div className='removeBtn' test1='test' onClick={() => {props.deleteItem(item.id, item.category)}}><RiDeleteBin7Fill className='logo' /></div>
                        </div>

    
                        <img className='gifOfExercise' src={item.gif} alt={item.exercise} onClick={() => props.savedItemToView(item.idExercise)}></img>

                    </div>
          
                )}
                
            </div>
        </div>
    );
}

export default SavedCategory;