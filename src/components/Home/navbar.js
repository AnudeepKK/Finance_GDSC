// src/HomePage.js
import React, { useState } from 'react';
import { Link as ScrollLink, Element } from 'react-scroll';



const HomePage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 relative">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-xl font-bold">Customer Website</div>

          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden">
            <button onClick={toggleNav} className="text-white focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>

          {/* Navbar Links for Mobile */}
          <div className={`lg:hidden absolute top-full left-0 w-full bg-gray-800 ${isNavOpen ? 'block' : 'hidden'}`}>
            <div className="flex flex-col space-y-2">
              <ScrollLink to="home" smooth={true} duration={500} className="hover:text-gray-300">Home</ScrollLink>
              <ScrollLink to="about" smooth={true} duration={500} className="hover:text-gray-300">About</ScrollLink>
              
              
              {/* Add other navigation links as needed */}
            </div>
          </div>

          {/* Navbar Links for Larger Screens */}
          <div className={`lg:flex space-x-4 hidden ${isNavOpen ? 'block' : 'hidden'}`}>
            <ScrollLink to="home" smooth={true} duration={500} className="hover:text-gray-300">Home</ScrollLink>
            <ScrollLink to="about" smooth={true} duration={500} className="hover:text-gray-300">About</ScrollLink>
            {/* Add other navigation links as needed */}
          </div>
        </div>
      </nav>


    </div>
  );
};

export default HomePage;
