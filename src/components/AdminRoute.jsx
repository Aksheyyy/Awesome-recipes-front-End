import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const AdminRoute = () => {
  const adminToken = sessionStorage.getItem('adminToken');

  
  return adminToken ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
