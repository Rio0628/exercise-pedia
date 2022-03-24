import React, { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsArrowBarLeft } from 'react-icons/bs';
import { SearchRslts, IndExercise, SavedCategory } from './components';
import axios from 'axios';
import gsap from 'gsap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "mario"
    };
    this.sidebarRef = React.createRef();
    this.sidebarAnim = gsap.timeline({ paused: true });
  }


  componentDidMount() {
    // Sidebar appear anim
    this.sidebarAnim.to(this.sidebarRef.current, { opacity: 1, x: 0, duration: 1, ease: 'none'} )
  }

  
  render () {

    // let options = {
    //   method: 'GET',
    //   url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
    //   headers: {
    //     'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    //     'X-RapidAPI-Key': 'b3a01735bbmshff0db8d8ae4e31dp101e3cjsnce8522bd9a34'
    //   }
    // };

    // axios.request(options).then(function (response) {
    //   console.log(response.data);
    // }).catch(function (error) {
    //   console.error(error);
    // });

    return (
      <div className="container">
        
        <div className='nav-bar'>

          <p className='logoApp'>Exercise Pedia</p>

          <div className='menuBtn' onClick={() => this.sidebarAnim.play()} ><GiHamburgerMenu className='icon'/></div>
        
          <div className='searchbarCntr'>
            <input className='searchbar' type='text' placeholder='Search Exercise'/>

            <div className='searchBtn'><AiOutlineSearch className='logo'/></div>
          </div>

        </div>

        <div className='mainCntr'>

          
          <div className='sidebar' ref={this.sidebarRef}>

            <div className='logoReturnBtnCntr'>
              <p className='logoApp'>Exercise Pedia</p>
            
              <div className='returnBtn' onClick={() => this.sidebarAnim.reverse()} ><BsArrowBarLeft className='logo'/></div>
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

            <p className='savedCategoriesBtn'>Saved Categories</p>

            <div className='itemsViewCntr' id='lastCntr'>
              <p className='indItem'>Item</p>
              <p className='indItem'>Item</p>
              <p className='indItem'>Item</p>
              <p className='indItem'>Item</p>
            </div>
          </div>

          {/* <SearchRslts /> */}

          {/* <IndExercise /> */}

          {/* <SavedCategory /> */}

          <div className='previewMSGcntr'>
          <p className='previewMSG'>
            Search exercise through searchbar or use sidebar in order to view lists of exercises.
          </p>
          </div>

        </div>

        
      </div>
    );
  }
}

export default App;
