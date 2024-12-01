import BaseURL from "./baseURL"
import commonAPI from "./commonAPI"

//register userAPI
export const userRegisterAPI = async(reqBody)=>{
    return await commonAPI("POST",`${BaseURL}/register`,reqBody)
}

// login userAPI
export const userloginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${BaseURL}/login`,reqBody)
}
//-----------------------------------------------------------------------------------------
// Admin Actions

export const AdminLoginAPI = async(formData)=>{
    return await commonAPI("POST",`${BaseURL}/admin`,formData)
}

export const AddRecipeAPI = async(formData,reqHeader)=>{
    return await commonAPI("POST",`${BaseURL}/add-recipe`,formData,reqHeader)
}

export const deleteRecipeAPI = async(recipeId,reqHeader)=>{
    return await commonAPI("DELETE",`${BaseURL}/recipe/${recipeId}`,{},reqHeader)
}


export const editRecipeAPI = async(reqBody,Rid,reqHeader)=>{
    return await commonAPI("PUT",`${BaseURL}/edit/${Rid}`,reqBody,reqHeader)
}

//-----------------------------------------------------------------------------------------

//fetch all recipes
export const fetchAllRecipes = async()=>{
    return await commonAPI("GET",`${BaseURL}/get-recipes`,'')
}

//fetch a Single Recipe
export const GetSingleRecipeAPI = async(recipeId)=>{
    return await commonAPI("GET",`${BaseURL}/single-recipe/${recipeId}`)
}

// add to favorites
export const addTofavAPI = async(reqBody)=>{
    return await commonAPI("POST",`${BaseURL}/add-to-fav`,reqBody)
}

//get userfavorites
export const getAllFavAPi = async(userId)=>{
    return await commonAPI("GET",`${BaseURL}/favorites/${userId}`)
}


//remove from favorites
export const RemoveFavAPi = async(recipeId)=>{  
    return await commonAPI("DELETE",`${BaseURL}/remove/${recipeId}`)
}