import {configureStore} from '@reduxjs/toolkit'
import recipeSlice from '../redux/recipeSlice'


const store = configureStore({
    reducer:{
        recipes : recipeSlice
    }
})

export default store


