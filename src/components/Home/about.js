// src/AboutUs.js
import React from 'react';

const AboutUs = () => {
  return (
    <div className="about bg-black bg-opacity-50 h-screen flex items-center justify-center">
      <div className="container mx-auto p-8 bg-white shadow-md rounded-md max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">About Us</h1>
        <p className="text-gray-800 leading-7">
          Welcome to the official website of Fine Finance. We are committed to serving
          the public with dedication and transparency. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Quisque sit amet accumsan risus. Integer vel justo nec velit congue suscipit. Nulla facilisi.
          Donec malesuada justo nec sapien pharetra, eu bibendum nunc interdum. Sed vitae quam et nunc
          consequat finibus vel id nunc.
        </p>
        <p className="text-gray-800 mt-4 leading-7">
          Our mission is to provide essential services and information to the citizens with integrity and
          efficiency. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius felis vel ante
          fermentum, ac eleifend libero consequat. Integer nec arcu nec metus bibendum aliquet in non elit.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;