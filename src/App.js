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
      text: "mario",
    };
    this.sidebarRef = React.createRef();
    this.sidebarAnim = gsap.timeline({ paused: true });
  }


  async retrieveSidebarOptions (URL) {
    let data, options = {
      method: 'GET',
      url: URL,
      headers: {
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        'X-RapidAPI-Key': 'bfd0a36084mshd6a97588cc72f55p1216b7jsn13b5eaf86e1f'
      }
    };

    await axios.request(options).then(function (response) {
      data = response.data;
    }).catch(function (error) {
      console.error(error);
    });

    // console.log(data)
    return data;
  }

  async componentDidMount() {
    // Sidebar appear anim
    this.sidebarAnim.to(this.sidebarRef.current, { opacity: 1, x: 0, duration: 1, ease: 'none'} )

    // Functions calls to retrieve sidebar info

    // this.setState({ bodyPartList: await this.retrieveSidebarOptions('https://exercisedb.p.rapidapi.com/exercises/bodyPartList')  });

    // this.setState({ targetAreaList: await this.retrieveSidebarOptions('https://exercisedb.p.rapidapi.com/exercises/targetList')  });

    // this.setState({ equipmentList: await this.retrieveSidebarOptions('https://exercisedb.p.rapidapi.com/exercises/equipmentList')  });

    this.setState({ appLoaded: true });
  }

  render () {

    const bringBodypartItemsToView = () => {
      this.setState({ bodypartListInView: !this.state.bodypartListInView });
      if (this.state.bodypartListInView) { this.bodypartListAnim.play(); }
      else { this.bodypartListAnim.reverse(); } 
    }

    const bringTargetareasItemsToView = () => {
      this.setState({ targetAreaListInView: !this.state.targetAreaListInView });
      if (this.state.targetAreaListInView) { this.targetAreaListAnim.play(); }
      else { this.targetAreaListAnim.reverses(); }
    }

    const bringEquipmentItemsToView = () => {
      this.setState({ equipmentListInView: !this.state.equipmentListInView });
      if (this.state.equipmentListInView) { this.equipmentListAnim.play(); }
      else { this.equipmentListAnim.reverse(); }
    }

    const bringCategoriesItemsToView = () => {
      this.setState({ categoriesListInView: !this.state.categoriesListInView });
      if (this.state.categoriesListInView) { this.categoriesListAnim.play(); }
      else { this.categoriesListAnim.reverse(); }
    }
  
    console.log(this.state.bodypartListInView)

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

            <p className={this.state.bodypartListInView ? 'bodypartBtn active' : 'bodypartBtn'} onClick={() => { this.setState({ bodypartListInView: !this.state.bodypartListInView})} }>Bodyparts</p>
  
            <div className={this.state.bodypartListInView ? 'itemsViewCntr active' : 'itemsViewCntr'}>
              {/* { this.state.appLoaded ? this.state.bodyPartList.map(item => 
                <p className='indItem' item={item} key={item}>{item}</p>
              ) : null} */}
              <p className='indItem'>Item</p>
              <p className='indItem'>Item</p>
              <p className='indItem'>Item</p>
            </div>

            <p className={this.state.targetAreaListInView ? 'targetareasBtn active' : 'targetareasBtn'} onClick={() => { this.setState({ targetAreaListInView: !this.state.targetAreaListInView }); }}>Target Areas</p>

            <div className={this.state.targetAreaListInView ? 'itemsViewCntr active' : 'itemsViewCntr'}>
              {/* { this.state.appLoaded ? this.state.targetAreaList.map(item => 
                <p className='indItem' item={item} key={item}>{item}</p>
              ) : null} */}
              <p className='indItem'>Item</p>
              <p className='indItem'>Item</p>
              <p className='indItem'>Item</p>
              <p className='indItem'>Item</p>
              <p className='indItem'>Item</p>
            </div>

            <p className={this.state.equipmentListInView ? 'equipmentBtn active' : 'equipmentBtn'} onClick={() => { this.setState({ equipmentListInView: !this.state.equipmentListInView }); }}>Equipment</p>

            <div className={this.state.equipmentListInView ? 'itemsViewCntr active' : 'itemsViewCntr'}>
              {/* { this.state.appLoaded ? this.state.equipmentList.map(item => 
                <p className='indItem' item={item} key={item}>{item}</p>
              ) : null} */}
              <p className='indItem'>Item</p>
              <p className='indItem'>Item</p>
              <p className='indItem'>Item</p>
              <p className='indItem'>Item</p>
              <p className='indItem'>Item</p>
            </div>

            <p className={this.state.categoriesListInView ? 'savedCategoriesBtn active' : 'savedCategoriesBtn'} onClick={() => { this.setState({ categoriesListInView: !this.state.categoriesListInView }); }}>Saved Categories</p>

            <div className={this.state.categoriesListInView ? 'itemsViewCntr active' : 'itemsViewCntr'} id='lastCntr'>
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
