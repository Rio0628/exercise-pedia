import React from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';

const SavedCategory = () => {
    return (
        <div className='savedCategory'>
            <h3 className='savedCategoryHeading'>Category: Something</h3>
            
            <p className='descriptionCategory'>This is the description for the category</p>
        
            <div className='rsltsItemsCntr'>
                <div className='indRsltItem'>
                    
                    <div className='exerciseNameBtnCntr'>
                        <p className='exerciseName'>Exercise</p>

                        <div className='removeBtn'><RiDeleteBin7Fill className='logo' /></div>
                    </div>


                    <div className='gifOfExercise'>

                    </div>

                    <p className='exerciseTarget'>Target</p>
                </div>

            </div>
        </div>
    );
}

export default SavedCategory;