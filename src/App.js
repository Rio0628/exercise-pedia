import React, { Component } from 'react';
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
    // Function to retrieve info from Exercise DB REST API 
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

    return data;
  }

  async componentDidMount() {
    // Sidebar appear anim
    this.sidebarAnim.to(this.sidebarRef.current, { opacity: 1, x: 0, duration: 1, ease: 'none'} )

    // REST APIS calls for saved exercises and categories
    APIS.getAllCategories().then(data => this.setState({ allSavedCategories: data.data }) )
    APIS.getAllExercises().then(data => this.setState({ allSavedExercises: data.data}) )

    // Functions calls to retrieve sidebar info
    // this.setState({ bodyPartList: await this.retrieveDBoptions('https://exercisedb.p.rapidapi.com/exercises/bodyPartList')  });

    // this.setState({ targetAreaList: await this.retrieveDBoptions('https://exercisedb.p.rapidapi.com/exercises/targetList')  });

    // this.setState({ equipmentList: await this.retrieveDBoptions('https://exercisedb.p.rapidapi.com/exercises/equipmentList')  });

    this.setState({ appLoaded: true });
  }

  render () {

    const bringBodypartItemsToView = async (e) => {
      // Bring the items from list from Exercise DB API and display them within search results view 
      let url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${'cardio'}`;

      this.setState({ categoryItems: await this.retrieveDBoptions(url) });
      this.setState({ currentCategoryItems: await this.retrieveDBoptions(url) });
      this.setState({ previewView: false });
      this.setState({ indExerciseView: false });
      this.setState({ savedCategoryView: false });
      this.setState({ searchRsltsView: true });

      this.sidebarAnim.reverse()
    }

    const bringTargetAreaItemsToView = async (e) => {
      // Bring the items from list from Exercise DB API and display them within search results view
      let url = `https://exercisedb.p.rapidapi.com/exercises/target/${e.target.getAttribute('area')}`;

      this.setState({ categoryItems: await this.retrieveDBoptions(url) });
      this.setState({ currentCategoryItems: await this.retrieveDBoptions(url) }) ;
      this.setState({ previewView: false });
      this.setState({ indExerciseView: false });
      this.setState({ savedCategoryView: false });
      this.setState({ searchRsltsView: true });

      this.sidebarAnim.reverse()
      // console.log(items);
    }

    const bringEquipmentItemsToView = async (e) => {
      // Bring the items from list from Exercise DB API and display them within search results view
      let url = `https://exercisedb.p.rapidapi.com/exercises/equipment/${'band'}`;

      this.setState({ categoryItems: await this.retrieveDBoptions(url) });
      this.setState({ currentCategoryItems: await this.retrieveDBoptions(url) });
      this.setState({ previewView: false });
      this.setState({ indExerciseView: false });
      this.setState({ savedCategoryView: false });
      this.setState({ searchRsltsView: true });

      this.sidebarAnim.reverse()
    }

    const bringCategoryItemsToView = (e) => {
      //  Bring the items from category from REST API and display them within category view
      let catItems = this.state.allSavedExercises.filter(exercise => exercise.category === e.target.getAttribute('category'));

      let category = this.state.allSavedCategories.filter(category => category.name === e.target.getAttribute('category'))

      this.setState({ currentCategory: category[0] });
      this.setState({ categoryItems: catItems });
      this.setState({ currentCategoryItems: catItems });
      this.setState({ previewView: false });
      this.setState({ indExerciseView: false });
      this.setState({ searchRsltsView: false });
      this.setState({ savedCategoryView: true });

      this.sidebarAnim.reverse()

    }
    
    const removeCategory = (e) => {
      // Removes category from REST API and deletes exercises within that category
      this.state.categoryItems.forEach(exercise => {
        APIS.deleteExercise(exercise.id).then(rslt => console.log(`Exercise ${exercise.id} deleted successfully!`)).catch(err => console.log('Error deleting exercise. Try again.'))
      });


      APIS.deleteCategory(e.target.getAttribute('category')).then(rslt => alert('Category removed successfully!')).catch(err => alert('Error occurred while trying to remove category.'));

      this.setState({ savedCategoryView: false });
      this.setState({ previewView: true });
      
    }

    const checkIfExerciseIsSaved = () => {
      // Checks if exercise has been saved within database
      const item = this.state.allSavedExercises.filter( exercise => exercise.exercise === this.state.currentExercise.name )

      if (item[0]) { 
        this.setState({ currentSavedItemInfo: item[0] });
        this.setState({ itemSaved: true });
        this.setState({ currentItemSaved: true });
      }
    }

    const showIndExercise = async (e) => {
      // Gets information from certain exercise in order to display all information of it
      this.setState({ currentItemSaved: false });

      const item = this.state.categoryItems.filter( item => item.id === e.target.getAttribute('item'));
  
      this.setState({ searchRsltsView: false });
      this.setState({ indExerciseView: true });
      await this.setState({ currentExercise: item[0] });

      checkIfExerciseIsSaved();
    }

    const saveItem = (category) => {
      // Updates exercise or saves new exercise to DB with a certain category  
      let item;
      if (this.state.currentItemSaved) {
        item = this.state.currentSavedItemInfo;
        item.category = category;

        APIS.updateExercise(item.id, item).then(rslt => alert(`Exercise ${item.id} updated successfully!`)).catch(err => alert('Error updating Exercise. Try again!'))
      } else {
        item = {
          exercise: this.state.currentExercise.name,
          gif: this.state.currentExercise.gifUrl,
          idExercise: this.state.currentExercise.id,
          category: category
        }

        APIS.createExercise(item).then(rslt => alert('Exercise created successfully!')).catch(err => alert('Error creating Exercise!'))
      }
      this.setState({ itemSaved: true });
      this.setState({ currentSavedItemInfo: item });
    }

    const saveItemNewCat = (categoryName, categoryDesc) => {
      // Created new category item and saves it within DB and either creates or updates exercise being saved
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

      if (this.state.currentItemSaved) {
        APIS.updateExercise(this.state.currentSavedItemInfo.id, exerciseObj).then(msg => console.log('Exercise Updated!'));
      } else {
        APIS.createExercise(exerciseObj).then(msg => console.log('Exercise Saved'));
      }

      APIS.createCategory(newCat).then(msg => alert('New category created!'));

      APIS.getAllCategories().then(data => this.setState({ allSavedCategories: data.data }) );

    }

    const savedItemToView = async (id) => {
      // Gets information from certain exercise in order to display all information of it
      this.setState({ currentItemSaved: false });
      let item = await this.retrieveDBoptions(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`);

      await this.setState({ currentExercise: item });

      checkIfExerciseIsSaved();

      this.setState({ previewView: false });
      this.setState({ savedCategoryView: false });
      this.setState({ searchRsltsView: false });
      this.setState({ indExerciseView: true });
    }

    const deleteItem = async (id, category) => {
      // Deletes a certain exercise from DB 
      await APIS.deleteExercise(id).then(rslt => alert('Exercise deleted from DB.')).catch(err => alert('Error deleting exercise from DB.'));

      await APIS.getAllExercises().then(data => this.setState({ allSavedExercises: data.data}) )

      let catItems = this.state.allSavedExercises.filter(exercise => exercise.category === category);

      this.setState({ categoryItems: catItems });
    }

    const filterExerciseList = (e) => {
      // Filters list of exercise according to user input
      let filteredList;
      if (this.state.searchRsltsView) {
        filteredList = this.state.categoryItems.filter( item => item.name.toLowerCase().search(e.target.value) !== -1);
      }
      else {
        filteredList = this.state.categoryItems.filter( item => item.exercise.toLowerCase().search(e.target.value) !== -1);
      }

      this.setState({ currentCategoryItems: filteredList });
    }

    return (
      <div className="container">
        
        <div className='nav-bar'>

          <p className='logoApp'>Exercise Pedia</p>

          <div className='menuBtn' onClick={() => this.sidebarAnim.play()} ><GiHamburgerMenu className='icon'/></div>
        
          { this.state.searchRsltsView || this.state.savedCategoryView ? 
            <input className='searchbar' type='text' placeholder='Filter Exercise' onChange={filterExerciseList}/>
          : null}

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
                <p className='indItem' area={item} item={item} key={item}>{item}</p>
              ) : null} */}
              <p className='indItem' area={'abs'} onClick={bringTargetAreaItemsToView}>Item</p>
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

          { this.state.searchRsltsView ? <SearchRslts items={this.state.currentCategoryItems} showIndExercise={showIndExercise}/> : null }

          { this.state.indExerciseView ?  <IndExercise exercise={this.state.currentExercise} currentSavedItemInfo={this.state.currentSavedItemInfo} currentItemSaved={this.state.currentItemSaved} itemSaved={this.state.itemSaved} allCategories={this.state.allSavedCategories} saveItem={saveItem} saveItemNewCat={saveItemNewCat}/> : null }

          { this.state.savedCategoryView ? <SavedCategory items={this.state.currentCategoryItems} category={this.state.currentCategory} removeCategory={removeCategory} savedItemToView={savedItemToView} deleteItem={deleteItem}/> : null }

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
