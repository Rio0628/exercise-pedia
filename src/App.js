import React, { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';

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
        
        <div className='infoCntr'>

        </div>
      </div>
    );
  }
}

export default App;
