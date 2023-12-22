// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t } = useTranslation();
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 text-white">
        <li>
          <Link to="/" className="hover:text-gray-300">
            {t('Login')}
          </Link>
        </li>
        <li>
          <Link to="/register" className="hover:text-gray-300">
            {t("Register")}
          </Link>
        </li>
        <li>
          <Link to="/home" className="hover:text-gray-300">
            {t("Home")}
          </Link>
        </li>
        <li>
          <Link to="/image" className="hover:text-gray-300">
            {t("Image Upload")}
          </Link>
        </li>
        <li>
          <Link to="/tut" className="hover:text-gray-300">
          {t(" Tutorial")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
