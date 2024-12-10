import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
    const navigate = useNavigate()
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          About Us
        </h1>

        {/* Section 1 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Welcome to Awesome Recipes
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Awesome Recipes is your ultimate companion for planning meals and exploring new recipes. 
            Whether you're a beginner or a seasoned chef, our platform is designed to simplify your cooking experience. 
            With a vast collection of recipes and a seamless user interface, we aim to bring joy and creativity to your kitchen.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to inspire healthy eating habits, simplify meal preparation, and foster a community of food lovers. 
            By providing curated recipes and powerful tools, we empower users to take control of their diets and lead healthier lives.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Wide variety of recipes catering to all dietary preferences.</li>
            <li>Personalized meal planning tools.</li>
            <li>User-friendly interface and seamless navigation.</li>
            <li>Regular updates and additions to our recipe library.</li>
          </ul>
        </div>
        <div className="text-center mt-8">
          <h3 className="text-lg font-medium text-gray-700">
            Start exploring recipes today!
          </h3>
          <button
            onClick={() =>navigate('/')}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
