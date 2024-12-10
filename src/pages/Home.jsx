import React, { useEffect, useState } from "react";
import { fetchAllRecipes } from "../services/allAPI";
import { useDispatch } from 'react-redux'
import { allrecipes } from "../redux/recipeSlice";
import BaseURL from "../services/baseURL";
import {useNavigate } from "react-router-dom";
import Aos from 'aos'
import 'aos/dist/aos.css'


const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

useEffect(()=>{
  fetchRecipes()
  Aos.init({duration:600})
},[])

const [recipes,setRecipes] = useState([]);
const [searchQuery, setSearchQuery] = useState("");

const [loading, setLoading] = useState(true);

const fetchRecipes = async()=>{
  try {
    const result = await fetchAllRecipes(); 
    setRecipes(result.data)
    setLoading(false)
    dispatch(allrecipes(result.data));
  } catch (error) {
    console.error("Error fetching recipes:", error); 
    setLoading(false)

  }
  
}


const handleClick=(recipeId,e)=>{
  e.preventDefault();
 const authorisedUser = sessionStorage.getItem('token')
 if(!authorisedUser){
  alert("Login to View Recipe")
  navigate('/login')
 }else{
  navigate(`/view/${recipeId}`)
 }
}


const filteredRecipes = recipes.filter((item)=>item.recipeName.toLowerCase().includes(searchQuery.toLowerCase()))


if (loading) {
  return <div>Loading recipes...</div>;
}

  return (
    <div className="bg-cream-light min-h-screen font-poppins">
     
      <div data-aos='fade-up' data-aos-easing="ease-in-sine"
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="bg-white/80 px-6 py-4 rounded-lg shadow-lg w-2/3 sm:w-1/3">
          <h2 className="text-xl font-semibold text-center text-green-600 mb-4">
            Discover Delicious Recipes
          </h2>
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Search for a recipe..."
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-dark"
          />
        </div>
      </div>

      {/* Recipes*/}
      <div className="py-8 px-4 bg-cream-light">
        <h3 className="text-center text-2xl font-bold text-green-600 mb-6">
          Popular Recipes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div data-aos='fade-right' data-aos-easing="ease-in"
                key={recipe._id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
              >
                <img
                  src={`${BaseURL}/uploads/${recipe.image}`}
                  alt="Recipe"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg mb-3 font-semibold text-gray-800">
                    {recipe.recipeName}
                  </h4>
                  <button
                   onClick={(e)=>handleClick(recipe._id,e)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No recipes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
