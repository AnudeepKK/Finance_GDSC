// src/AboutUs.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
    const { t } = useTranslation();
  return (
    <div className="about bg-black bg-opacity-50 h-screen flex items-center justify-center">
      <div className="container mx-auto p-8 bg-white shadow-md rounded-md max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">About Us</h1>
        <p className="text-gray-800 leading-7">
          {t('abt1')}
        </p>
        <p className="text-gray-800 mt-4 leading-7">
        {t('abt2')}
        </p>
      </div>
    </div>
  );
};

export default AboutUs;