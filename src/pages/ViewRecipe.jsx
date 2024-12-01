import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BaseURL from '../services/baseURL';
import { addTofavAPI } from '../services/allAPI';
import { jsPDF } from "jspdf";



const ViewRecipe = () => {

    const [Recipe,setRecipe] = useState(null)
    const {id} = useParams()
    const allRecipes = useSelector(state=>state.recipes)
    const navigate = useNavigate()

    useEffect(()=>{
        if(allRecipes){
            const selectedrecipe = allRecipes.find((recipe)=>recipe._id == id)
            setRecipe(selectedrecipe)
           
        }
    },[id,allRecipes])
    // console.log(Recipe);
    
    if (!Recipe) {
        return (
          <div className="text-center py-20">
            <h1 className="text-2xl font-semibold text-gray-500">loading...</h1>
          </div>
        );
      }

    const handleAddToFav = async(Recipe)=>{
      const userDetails = sessionStorage.getItem("user")
      const ParseUser = JSON.parse(userDetails)
      const userId = ParseUser._id
      const recipeId = Recipe._id
     if(!userId){
      alert('Login to Add to favorites!!')
      navigate('/login')
      return
     }else{
      try {
        const reqBody = {userId,recipeId}          
        const res = await addTofavAPI(reqBody)
        
        if(res.status === 201){
          alert("Recipe added Successfully")
        }else if(res.status === 400){
          alert("Already Exists In Favourates")
        }
      } catch (error) {
        alert("error while adding to favorites",error)
      }
      
     }
     
    }

    const handleDownloadPDF = (e) => {
      e.preventDefault();
      if (!Recipe) return;
  
      const doc = new jsPDF();
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Recipe Details", 10, 10);
  
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Recipe Name: ${Recipe.recipeName}`, 10, 20);
      doc.text(`Preparation Time: ${Recipe.prepTime} mins`, 10, 30);
      doc.text(`Ingredients:`, 10, 40);
  
      
      const ingredients = Recipe.ingredients.split(", ");
      ingredients.forEach((item, index) => {
        doc.text(`- ${item}`, 15, 50 + index * 10);
      });
  
      doc.text("Instructions:", 10, 60 + ingredients.length * 10);
      doc.text(Recipe.instructions, 15, 70 + ingredients.length * 10, {
        maxWidth: 180, 
      });
  
      doc.save(`${Recipe.recipeName}.pdf`);
    };
          
      

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-72 bg-cover bg-center" style={{ backgroundImage: `url(${BaseURL}/uploads/${Recipe.image})`}}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">{Recipe.recipeName}</h1>
        </div>
      </div>

     
      <div className="max-w-6xl mx-auto py-10 px-5 md:px-10">
        {/* Summary */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-green-dark">Recipe Details</h2>
          <p className="text-gray-600 mt-4">
            <strong>Cuisine:</strong> {Recipe.cuisine} | 
            <strong> Prep Time:</strong> {Recipe.prepTime} mins | 
            <strong> Cook Time:</strong> {Recipe.cookTime} mins | 
            <strong> Calories:</strong> {Recipe.calories}
          </p>
        </div>

        {/* Ingredients */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-green-dark mb-4">Ingredients</h3>
          <ul className="list-disc list-inside space-y-2">
            {Recipe.ingredients.split(', ').map((ingredient, index) => (
              <li key={index} className="text-gray-700">{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-green-dark mb-4">Instructions</h3>
          <ol className="list-decimal list-inside space-y-2">
            {Recipe.instructions.split('.').map((step, index) => (
              <li key={index} className="text-gray-700">{step}</li>
            ))}
          </ol>
        </div>

        <div className="flex items-center space-x-4 mt-6">
          <button onClick={(e)=>handleDownloadPDF(e)} className="bg-gray-800 text-gray-200 px-6 py-2 rounded hover:bg-gray-700">Download Recipe</button>
          <button onClick={()=>handleAddToFav(Recipe)} className="bg-green-500 text-gray-700 px-6 py-2 rounded hover:bg-green-400">Add to Favorites</button>
        </div>
      </div>
    </div>
  );
};

export default ViewRecipe;
