import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({isLoggedIn,setIsLoggedIn}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const navigate = useNavigate();


  const handleLogout = () => {
    sessionStorage.clear();
    setDropdownOpen(false);
    setIsLoggedIn(false)
    navigate('/login');
  };

  return (
    <nav className="bg-white  shadow-lg relative">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        <a href="/" className="text-2xl font-bold text-green-600">
          Awesome Recipes
        </a>

        
        <div className={`hidden md:flex space-x-6`}>
          <Link to="/" className="text-gray-700 hover:text-teal-600">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-teal-600">
            About
          </Link>
          <Link to="/favorites" className="text-gray-700 hover:text-teal-600">
            Favorites
          </Link>
          {isLoggedIn? (
            <div className="relative z-50">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-gray-700 hover:text-teal-600"
              >
              User
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-teal-600">
              Login
            </Link>
          )}
        </div>

        {/* Mobile */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Links */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 space-y-2 z-50">
          <Link to="/" className="block text-gray-700 hover:text-teal-600">
            Home
          </Link>
          <Link to="/admin" className="block text-gray-700 hover:text-teal-600">
            About
          </Link>
          <Link to="/favorites" className="block text-gray-700 hover:text-teal-600">
            Favorites
          </Link>
          {isLoggedIn? (
            <button
              onClick={handleLogout}
              className="block w-full text-left text-gray-700 hover:text-teal-600"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="block text-gray-700 hover:text-teal-600">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
