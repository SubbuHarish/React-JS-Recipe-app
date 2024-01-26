//import logo from './logo.svg';
import React ,{useState,useEffect}from 'react';
import './App.css';
import Recipe from './Recipe';

const App=()=> {

  const APP_ID="f52db53a";
  const APP_KEY="714a342f6b0daffe93160ae84ef8cd18";

 // const exampleReq=`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;


 const[recipes,setRecipes]=useState([]);
 const[search,setSearch]=useState('');
 const[query,setQuery]=useState('chicken');


  useEffect(()=>{
    getRecipes();
  },[query])

  const getRecipes= async ()=>{
    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data=await response.json();
    setRecipes(data.hits);
  }

 

  const updateSearch= e=>{
    setSearch(e.target.value);

  }

  const getSearch= e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');


  }


  return (
    <div className="App">
      <div className="title-name">
        <h1 >Book of Recipe</h1>
      </div>
     <form onSubmit={getSearch} className="search-form">
      <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
      <button  className="search-button" type="submit">Search</button>
     </form>

     <div className="recipes">

     {recipes.map(recipe => (

       <Recipe 
       key={recipe.recipe.label}
       title={recipe.recipe.label} 
       calories={recipe.recipe.calories}
       image={recipe.recipe.image}
       ingredients={recipe.recipe.ingredients}

    /> 
   ))}
      </div>
 
    </div>
  );
}

export default App;
