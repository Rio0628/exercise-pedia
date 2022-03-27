import React from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';

const SavedCategory = (props) => {

    
    console.log(props.items)

    return (
        <div className='savedCategory'>
            <h3 className='savedCategoryHeading'>Category: Something</h3>
            
            <p className='descriptionCategory'>This is the description for the category</p>
        
            <div className='rsltsItemsCntr'>
                
                { props.items.map(item => 
                
                    <div className='indRsltItem' key={item.exercise}>
                    
                        <div className='exerciseNameBtnCntr' exerciseId={item.idExercise}>
                            <p className='exerciseName'>{item.exercise}</p>

                            <div className='removeBtn' exerciseId={item.id}><RiDeleteBin7Fill className='logo' /></div>
                        </div>

    
                        <img className='gifOfExercise' src={item.gif} alt={item.exercise}></img>

                    </div>
          
                )}
                
            </div>
        </div>
    );
}

export default SavedCategory;