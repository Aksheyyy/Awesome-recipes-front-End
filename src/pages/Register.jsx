import React, { useState } from "react";
import { userRegisterAPI } from "../services/allAPI";
import {Link,useNavigate} from 'react-router-dom'


const Register = () => {

  const navigate = useNavigate()
  const  [user,Setuser] = useState({
    username:'',email:'',password:''
  })


  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(user.username && user.email && user.password){
      try {
        const responce = await userRegisterAPI(user)
        if(responce.status == 200){
          console.log(responce.data);
          alert("Registeraton Successfull Please login")
          Setuser({username:'',email:'',password:''})
          navigate('/login')
        }else if(responce.status == 400){
          alert("Account Already Exists!Please login")
          Setuser({username:'',email:'',password:''})
          navigate('/login')
        }
      } catch (error) {
        console.log("Error:",error);
        alert("Error Registering")
      }
    }else{
      alert("Please fill the form Completely") 
    }
  }
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-10">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-green-600 text-center mb-6">Create an Account</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              id="name"
              value={user.username}
              onChange={e=>Setuser({...user,username:e.target.value})}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={e=>Setuser({...user,email:e.target.value})}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={e=>Setuser({...user,password:e.target.value})}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
           <Link to='/login' className="text-orange-500 hover:underline">
           Login
           </Link>
          </p>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Register;
