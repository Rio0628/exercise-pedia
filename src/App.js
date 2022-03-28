import React, { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsArrowBarLeft } from 'react-icons/bs';
import { SearchRslts, IndExercise, SavedCategory } from './components';
import APIS from './api';
import axios from 'axios';
import gsap from 'gsap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewView: true,
      indExerciseView: false,
      savedCategoryView: false,
      searchRsltsView: false,
      allSavedCategories: [],
      allSavedExercises: [],
    };
    this.sidebarRef = React.createRef();
    this.sidebarAnim = gsap.timeline({ paused: true });
  }


  async retrieveDBoptions (URL) {
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

    APIS.getAllCategories().then(data => this.setState({ allSavedCategories: data.data }) )
    APIS.getAllExercises().then(data => this.setState({ allSavedExercises: data.data}) )

    // Functions calls to retrieve sidebar info
    // this.setState({ bodyPartList: await this.retrieveDBoptions('https://exercisedb.p.rapidapi.com/exercises/bodyPartList')  });

    // this.setState({ targetAreaList: await this.retrieveDBoptions('https://exercisedb.p.rapidapi.com/exercises/targetList')  });

    // this.setState({ equipmentList: await this.retrieveDBoptions('https://exercisedb.p.rapidapi.com/exercises/equipmentList')  });

    this.setState({ appLoaded: true });
  }

  render () {
  
    // console.log(this.state.allSavedCategories);
    // console.log(this.state.allSavedExercises)

    const bringBodypartItemsToView = async (e) => {
      let url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${'cardio'}`;

      // this.setState({ categorySearched: e.target.getAttribute('item') });
      this.setState({ categoryItems: await this.retrieveDBoptions(url) });
      this.setState({ previewView: false });
      this.setState({ indExerciseView: false });
      this.setState({ savedCategoryView: false });
      this.setState({ searchRsltsView: true });
      // console.log(items);
    }

    const bringTargetAreaItemsToView = async (e) => {
      let url = `https://exercisedb.p.rapidapi.com/exercises/target/${'abs'}`;

      // this.setState({ categorySearched: e.target.getAttribute('item') });
      this.setState({ categoryItems: await this.retrieveDBoptions(url) });
      this.setState({ previewView: false });
      this.setState({ indExerciseView: false });
      this.setState({ savedCategoryView: false });
      this.setState({ searchRsltsView: true });
      // console.log(items);
    }

    const bringEquipmentItemsToView = async (e) => {
      let url = `https://exercisedb.p.rapidapi.com/exercises/equipment/${'band'}`;

      // this.setState({ categorySearched: e.target.getAttribute('item') });
      this.setState({ categoryItems: await this.retrieveDBoptions(url) });
      this.setState({ previewView: false });
      this.setState({ indExerciseView: false });
      this.setState({ savedCategoryView: false });
      this.setState({ searchRsltsView: true });
      // console.log(items);
    }

    const bringCategoryItemsToView = (e) => {
      console.log(e.target.getAttribute('category'))

      let catItems = this.state.allSavedExercises.filter(exercise => exercise.category === e.target.getAttribute('category'));

      let category = this.state.allSavedCategories.filter(category => category.name === e.target.getAttribute('category'))

      this.setState({ currentCategory: category[0] });
      this.setState({ categoryItems: catItems });
      this.setState({ previewView: false });
      this.setState({ indExerciseView: false });
      this.setState({ searchRsltsView: false });
      this.setState({ savedCategoryView: true });


      console.log(catItems)
    }
    
    const removeCategory = (e) => {
      
      // console.log(this.state.categoryItems)

      this.state.categoryItems.forEach(exercise => {
        APIS.deleteExercise(exercise.id).then(rslt => console.log(`Exercise ${exercise.id} deleted successfully!`)).catch(err => console.log('Error deleting exercise. Try again.'))
      });


      APIS.deleteCategory(e.target.getAttribute('category')).then(rslt => alert('Category removed successfully!')).catch(err => alert('Error occurred while trying to remove category.'));

      this.setState({ savedCategoryView: false });
      this.setState({ previewView: true });
      
      // console.log(e.target)
      // console.log(e.target.getAttribute('category'))
    }

    const checkIfExerciseIsSaved = () => {

      const item = this.state.allSavedExercises.filter( exercise => exercise.exercise === this.state.currentExercise.name )

      if (item[0]) { this.setState({ currentItemSaved: true }); }
    }

    const showIndExercise = (e) => {
      // console.log(e.target.getAttribute('item'));
      this.setState({ currentItemSaved: false });
      const item = this.state.categoryItems.filter( item => item.id === e.target.getAttribute('item'));
  
      this.setState({ searchRsltsView: false });
      this.setState({ indExerciseView: true });
      this.setState({ currentExercise: item[0] });

      checkIfExerciseIsSaved();
      // console.log(item)
    }

    const saveItemNewCat = (categoryName, categoryDesc) => {
      console.log(this.state.currentExercise)
      const exerciseObj = {
        exercise: this.state.currentExercise.name,
        gif: this.state.currentExercise.gifUrl,
        idExercise: this.state.currentExercise.id,
        category: categoryName
      };

      const newCat = {
        name: categoryName,
        description: categoryDesc
      };

      // REST API CALLS WILL GO HERE 
      APIS.createExercise(exerciseObj).then(msg => console.log('Exercise Saved'));
      APIS.createCategory(newCat).then(msg => console.log('New Category Created!'));

      APIS.getAllCategories().then(data => this.setState({ allSavedCategories: data.data }) );

    }

    const savedItemToView = async (id) => {

      this.setState({ currentItemSaved: false });
      let item = await this.retrieveDBoptions(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`);

      console.log(item)

      this.setState({ currentExercise: item });

      checkIfExerciseIsSaved();

      this.setState({ previewView: false });
      this.setState({ savedCategoryView: false });
      this.setState({ searchRsltsView: false });
      this.setState({ indExerciseView: true });
    }

    const deleteItem = async (id, category) => {
      await APIS.deleteExercise(id).then(rslt => alert('Exercise deleted from DB.')).catch(err => alert('Error deleting exercise from DB.'));

      await APIS.getAllExercises().then(data => this.setState({ allSavedExercises: data.data}) )

      let catItems = this.state.allSavedExercises.filter(exercise => exercise.category === category);

      // this.loadItems();
      this.setState({ categoryItems: catItems });
  
      // window.location.reload();
    }

    return (
      <div className="container">
        
        <div className='nav-bar'>

          <p className='logoApp'>Exercise Pedia</p>

          <div className='menuBtn' onClick={() => this.sidebarAnim.play()} ><GiHamburgerMenu className='icon'/></div>
        
          <div className='searchbarCntr'>
            <input className='searchbar' type='text' placeholder='Search Exercise'/>

            <div className='searchBtn' onClick={bringBodypartItemsToView}><AiOutlineSearch className='logo'/></div>
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
              <p className='indItem' onClick={bringTargetAreaItemsToView}>Item</p>
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
              <p className='indItem' onClick={bringEquipmentItemsToView}>Item</p>
              <p className='indItem'>Item</p>
              <p className='indItem'>Item</p>
              <p className='indItem'>Item</p>
              <p className='indItem'>Item</p>
            </div>

            <p className={this.state.categoriesListInView ? 'savedCategoriesBtn active' : 'savedCategoriesBtn'} onClick={() => { this.setState({ categoriesListInView: !this.state.categoriesListInView }); }}>Saved Categories</p>

            <div className={this.state.categoriesListInView ? 'itemsViewCntr active' : 'itemsViewCntr'} id='lastCntr'>
              { this.state.allSavedCategories.map(item => 
                <p className='indItem' category={item.name} key={item.id} onClick={bringCategoryItemsToView}>{item.name}</p>
              )}
            </div>
          </div>

          { this.state.searchRsltsView ? <SearchRslts items={this.state.categoryItems} showIndExercise={showIndExercise}/> : null }

          { this.state.indExerciseView ?  <IndExercise exercise={this.state.currentExercise} currentItemSaved={this.state.currentItemSaved} allCategories={this.state.allSavedCategories} saveItemNewCat={saveItemNewCat}/> : null }

          { this.state.savedCategoryView ? <SavedCategory items={this.state.categoryItems} category={this.state.currentCategory} removeCategory={removeCategory} savedItemToView={savedItemToView} deleteItem={deleteItem}/> : null }


          {this.state.previewView ? 
            <div className='previewMSGcntr'>
              <p className='previewMSG'>
                Search exercise through searchbar or use sidebar in order to view lists of exercises.
              </p>
            </div>
          : null}

        </div>

        
      </div>
    );
  }
}

export default App;
