import React, { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsArrowBarLeft } from 'react-icons/bs';
import { SearchRslts } from './components';

class App extends Component {
  render () {
    return (
      <div className="container">
        
        <div className='nav-bar'>
          <div className='menuBtn'><GiHamburgerMenu className='icon'/></div>
        
          <div className='searchbarCntr'>
            <input className='searchbar' type='text' placeholder='Search Exercise'/>

            <div className='searchBtn'><AiOutlineSearch className='logo'/></div>
          </div>

        </div>

        {/* <div className='sidebar'>

          <div className='logoReturnBtnCntr'>
            <p className='logoApp'>Exercise Pedia</p>
            
            <div className='returnBtn'><BsArrowBarLeft className='logo'/></div>
          </div>

          <p className='bodypartBtn'>Bodyparts</p>

          <div className='itemsViewCntr'>
            <p className='indItem'>Item</p>
            <p className='indItem'>Item</p>
            <p className='indItem'>Item</p>
            <p className='indItem'>Item</p>
          </div>

          <p className='targetareasBtn'>Target Areas</p>

          <div className='itemsViewCntr'>
            <p className='indItem'>Item</p>
            <p className='indItem'>Item</p>
            <p className='indItem'>Item</p>
            <p className='indItem'>Item</p>
          </div>

          <p className='equipmentBtn'>Equipment</p>

          <div className='itemsViewCntr'>
            <p className='indItem'>Item</p>
            <p className='indItem'>Item</p>
            <p className='indItem'>Item</p>
            <p className='indItem'>Item</p>
          </div>

          <p className='savedExercisesBtn'>Saved Exercises</p>

          <div className='itemsViewCntr' id='lastCntr'>
            <p className='indItem'>Item</p>
            <p className='indItem'>Item</p>
            <p className='indItem'>Item</p>
            <p className='indItem'>Item</p>
          </div>
        </div> */}
        
        <SearchRslts />

      </div>
    );
  }
}

export default App;
