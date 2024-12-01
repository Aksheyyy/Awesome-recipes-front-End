import React, { useEffect, useState } from "react";
import { deleteRecipeAPI, fetchAllRecipes } from "../services/allAPI"; 
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const result = await fetchAllRecipes(); 
      setRecipes(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (recipeId) => {
    const token = sessionStorage.getItem('adminToken');
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipeAPI(recipeId, reqHeader); 
        alert("Recipe deleted successfully!");
        fetchRecipes(); 
      } catch (error) {
        console.error("Error deleting recipe:", error);
        alert("Failed to delete recipe. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.clear(); 
    navigate("/admin"); 
  };

  if (loading) {
    return <div>Loading recipes...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      
      <div className="mb-4 text-right">
        <Link
          to="/admin-route/admin/584705"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add New Recipe
        </Link>
      </div>

      {/* Recipes Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Recipe Name</th>
              <th className="px-4 py-2">Preparation Time</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <tr key={recipe._id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{recipe.recipeName}</td>
                <td className="px-4 py-2">{recipe.prepTime} mins</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => navigate(`/admin-route/admin/edit-recipe/${recipe._id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
