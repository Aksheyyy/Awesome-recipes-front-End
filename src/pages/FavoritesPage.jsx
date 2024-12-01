import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BaseURL from '../services/baseURL';
import { getAllFavAPi, RemoveFavAPi } from '../services/allAPI';
import Aos from 'aos'
import 'aos/dist/aos.css'


const FavoritesPage = () => {

  const [favorites,setFavorites] = useState([])
  

  const fetchAllFavorites = async()=>{
    const userDetails = JSON.parse(sessionStorage.getItem("user"))
    const userId = userDetails._id
    try {
      const res = await getAllFavAPi(userId)
      if(res.status === 201){
        setFavorites(res.data)
      }
    } catch (error) {
      console.log("error fetching data",error);
      
    } 
  }

  useEffect(()=>{
    fetchAllFavorites()
    Aos.init({duration:600})
  },[])

  const handleRemove = async (recipeId)=>{
    // console.log(recipeId);
    try {
      const res = await RemoveFavAPi(recipeId)
      if(res.status === 200){
        alert("recipe deleted successfully")
        fetchAllFavorites() 
      }else{
        alert("Failed to delete recipe")
      }
      
    } catch (error) {
      console.log("error",error);
      
    }
  }



  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Page Header */}
      <header className="bg-green-dark text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Your Favorite Recipes</h1>
          <p className="mt-2 text-gray-200">A curated list of your favorite recipes</p>
        </div>
      </header>

      {/* Favorites List */}
      <div className="max-w-6xl mx-auto py-10 px-4">
        {favorites && favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((favorite) => (
              <div data-aos='fade-right'
                key={favorite.recipeId._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                {/* Recipe Image */}
                <div
                  className="h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${`${BaseURL}/uploads/${favorite.recipeId.image}`})`,
                  }}
                ></div>

                {/* Recipe Details */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-green-dark">
                    {favorite.recipeId.recipeName}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Cuisine:</strong> {favorite.recipeId.cuisine}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Prep Time:</strong> {favorite.recipeId.prepTime} mins
                  </p>

                  {/* View Recipe Button */}
                  <div className="flex items-center space-x-4 mt-4">
                    <Link
                      to={`/view/${favorite.recipeId._id}`}
                      className="bg-green-dark text-white text-center py-2 px-4 rounded hover:bg-green-light"
                    >
                      View
                    </Link>
                    <button
                      onClick={()=>handleRemove(favorite._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">
              No favorite recipes yet!
            </h2>
            <p className="mt-4 text-gray-500">
              Browse and add some recipes to your favorites.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block bg-green-dark text-white px-6 py-2 rounded hover:bg-green-light"
            >
              Back to Recipes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
