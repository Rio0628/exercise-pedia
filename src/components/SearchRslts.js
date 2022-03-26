import React from 'react';

const SearchRslts = (props) => {

    console.log(props.items)

    return (
        <div className='searchRslts'>
            <h3 className='searchRsltsHeading'>Search Results: Something</h3>
        
        
            <div className='rsltsItemsCntr'>

                { props.items.map(item => 

                    <div className='indRsltItem' key={item.id} item={item}>
                        <p className='exerciseName'>{item.name}</p>


                        <img className='gifOfExercise' alt={'Exercise ' + item.name} src={item.gifUrl}>

                        </img>

                        <p className='exerciseTarget'>{item.target}</p>
                    </div>

                ) }

            </div>
        </div>
    );
}

export default SearchRslts;