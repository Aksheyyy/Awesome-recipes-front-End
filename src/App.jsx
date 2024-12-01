import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from "./components/Header"
import Footer from "./components/Footer"
import AddRecipe from "./pages/AddRecipe"
import ViewRecipe from "./pages/ViewRecipe"
import FavoritesPage from "./pages/FavoritesPage"
import AdminDashboard from "./pages/AdminDashboard"
import AdminLogin from "./components/AdminLogin"
import AboutPage from "./components/AboutPage"
import AdminRoute from "./components/AdminRoute"



function App() {
  

  return (
    <>
     <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/view/:id" element={<ViewRecipe/>}/>
          <Route path="/favorites" element={<FavoritesPage/>}/>
          {/* Admin Routes */}

          <Route path="/admin" element={<AdminLogin/>}/>
          <Route path="/admin-route/" element={<AdminRoute/>}>
            <Route path="admindashboard" element={<AdminDashboard/>}/>
            <Route path="admin/584705" element={<AddRecipe/>}/>
            <Route path="admin/edit-recipe/:recipeId" element={<AddRecipe/>}/>
          </Route>  
        </Routes>
      <Footer/>
     </BrowserRouter>
    </>
  )
}

export default App
