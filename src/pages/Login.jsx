import React, { useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import { userloginAPI } from "../services/allAPI";


const Login = () => {
  
  const navigate = useNavigate()
  const [loggedIn,setLoggedIn] = useState(false);

  const [userDetails,setUserDetails] = useState({
    email:"",password:''
  })



  const handleLogin = async(e)=>{
    e.preventDefault()
    if(userDetails.email && userDetails.password){
      try {
        const responce = await userloginAPI(userDetails)
        if(responce.status==200){
          // console.log(responce.data);
          alert(`Welcome ${responce?.data?.user?.username}`)
          sessionStorage.setItem("user", JSON.stringify(responce?.data?.user));
          sessionStorage.setItem('token',responce?.data?.token)
          setLoggedIn(true)
          navigate('/')
        }else if(responce.status==400){
          alert("Incorrect Credentials")
        }
      } catch (error) {
        console.log("Error",error);
      }
    }else{
      alert("Please fill the form Completely")
    }
  }


  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
  <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-10">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 className="text-2xl text-green-500 font-bold text-center mb-4">Awsome Recipes</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={userDetails.email}
            onChange={e=>setUserDetails({...userDetails,email:e.target.value})}
            placeholder="Enter your email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={userDetails.password}
            onChange={e=>setUserDetails({...userDetails,password:e.target.value})}
            placeholder="Enter your password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <button onClick={handleLogin} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md">
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        Don't have an account?{" "}
        <Link to='/register' className="text-orange-500 font-medium hover:underline">
        Register
        </Link>
      </p>
    </div>
  </div>
</div>

  );
};

export default Login;
