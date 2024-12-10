import React, { useEffect, useState } from "react";
import { AddRecipeAPI, editRecipeAPI, GetSingleRecipeAPI } from "../services/allAPI";
import { useNavigate, useParams } from "react-router-dom";
import BaseURL from "../services/baseURL";

const AddRecipe = () => {
  const {recipeId} = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState({
    recipeName: "",
    ingredients: "",
    instructions: "",
    prepTime: "",
    cookTime: "",
    difficulty: "",
    cuisine: "",
    calories: "",
    image: null,
    rating: "",
    MealType: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [oldImage, setOldImage] = useState(null); 


  useEffect(() => {
    const getRecipe = async () => {
      try {
        if (recipeId) {
          const res = await GetSingleRecipeAPI(recipeId); 
          const selectedRecipe = res.data;
  
          if (selectedRecipe) {
            setRecipe({ ...selectedRecipe, image: null }); 
            setImagePreview(`${BaseURL}/uploads/${selectedRecipe.image}`);
            setOldImage(selectedRecipe.image); 
          }
        }
      } catch (error) {
        console.error("Failed to fetch the recipe:", error);
      }
    };
  
    getRecipe();
  }, [recipeId]);

 


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === "file") {
      
      const file = files[0];
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: value,
      }));
    }
  };
    

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const finalImage = recipe.image || oldImage

    const formData = new FormData();
    formData.append("recipeName", recipe.recipeName);
    formData.append("ingredients", recipe.ingredients);
    formData.append("instructions", recipe.instructions);
    formData.append("prepTime", recipe.prepTime);
    formData.append("cookTime", recipe.cookTime);
    formData.append("difficulty", recipe.difficulty);
    formData.append("cuisine", recipe.cuisine);
    formData.append("calories", recipe.calories);
    if(typeof finalImage === "object"){
      formData.append("image",finalImage)
    }else{
      formData.append("Image",oldImage)
    }
    formData.append("rating", recipe.rating);
    formData.append("MealType", recipe.MealType);

    try {
      const token = sessionStorage.getItem('adminToken')
      const reqHeader = {
          "Authorization" : `Bearer ${token}`
      }
        if(recipeId){
          const result = await editRecipeAPI(formData,recipeId,reqHeader)
          if(result.status==200){
            alert("Updated successfullly")
            navigate('/admin-route/admindashboard')
          }else{
            alert("failed to Edit recipe")
          }
        }else{
          const res = await AddRecipeAPI(formData,reqHeader)
          if(res.status==200){
            alert("Recipe Added Successfully")
            navigate('/admin-route/admindashboard')
          }else{
            alert("failed to add recipe")
          }
        }
    } catch (error) {
        console.log("Error adding recipes:",error);
        alert("Failed to add recipe. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-cream-light flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-dark">
          {recipeId? "Edit Recipe" : " Add Recipe"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Recipe Name</label>
            <input
              type="text"
              name="recipeName"
              value={recipe.recipeName}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-green-light focus:border-green-light"
              required
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-gray-700 font-medium">Ingredients</label>
            <textarea
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
              rows="3"
              placeholder="Comma-separated list"
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-green-light focus:border-green-light"
              required
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-gray-700 font-medium">Instructions</label>
            <textarea
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              rows="5"
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-green-light focus:border-green-light"
              required
            />
          </div>

          {/* Prep Time */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium">Prep Time (mins)</label>
              <input
                type="number"
                name="prepTime"
                value={recipe.prepTime}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-green-light focus:border-green-light"
                required
              />
            </div>

            {/* Cook Time */}
            <div className="flex-1">
              <label className="block text-gray-700 font-medium">Cook Time (mins)</label>
              <input
                type="number"
                name="cookTime"
                value={recipe.cookTime}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-green-light focus:border-green-light"
                required
              />
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-gray-700 font-medium">Difficulty</label>
            <select
              name="difficulty"
              value={recipe.difficulty}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-green-light focus:border-green-light"
              required
            >
              <option value="" disabled>Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Cuisine */}
          <div>
            <label className="block text-gray-700 font-medium">Cuisine</label>
            <input
              type="text"
              name="cuisine"
              value={recipe.cuisine}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-green-light focus:border-green-light"
              required
            />
          </div>

          {/* Calories */}
          <div>
            <label className="block text-gray-700 font-medium">Calories</label>
            <input
              type="number"
              name="calories"
              value={recipe.calories}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-green-light focus:border-green-light"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 font-medium">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-green-light focus:border-green-light"
              required={!recipeId}
            />
            {imagePreview || recipe.image ? (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Recipe Preview"
                  className="h-32 w-full object-cover rounded"
                />
              </div>
            ):null}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-gray-700 font-medium">Rating (out of 5)</label>
            <input
              type="number"
              name="rating"
              value={recipe.rating}
              onChange={handleChange}
              max="5"
              min="0"
              step="0.1"
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-green-light focus:border-green-light"
              required
            />
          </div>

          {/* Meal Type */}
          <div>
            <label className="block text-gray-700 font-medium">Meal Type</label>
            <select
              name="MealType"
              value={recipe.MealType}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-green-light focus:border-green-light"
              required
            >
              <option value="" disabled>Select Meal Type</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
              <option value="Dessert">Dessert</option>
              <option value="Soup">Soup</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-dark text-white py-2 px-6 rounded hover:bg-green-light transition"
            >
                {recipeId? "Update Recipe" : " Add Recipe"}
              
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
