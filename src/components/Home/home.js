// Home.js
import React, { useState, useEffect } from 'react';
import Chatbot from './chat';
import HomePage from './navbar';
import AboutUs from './about';
import { usePhoneNumber } from '../Language/PhoneContext';
import { firestore } from '../../firebase/config';
import { getDoc, doc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const { phoneNumber } = usePhoneNumber();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      if (phoneNumber) {
        try {
          // Assuming you have the necessary Firebase functions to fetch user data
          // Replace the following logic with your Firestore data fetching code
          const userDocRef = doc(firestore, 'Participant', phoneNumber);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userDataFromFirestore = userDocSnapshot.data();
            setUserData(userDataFromFirestore);
          } else {
            // Handle the case where the user data is not found
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
          // Handle the error as needed
        }
      }
    };

    fetchData();
  }, [phoneNumber]);

  return (
    <div>
      <HomePage />
      {/* Your Home Page Content */}
      <div className="relative h-screen">
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

        {/* Content */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-4xl font-bold mb-4"> {t("Welcome")} </h1>
          <p className="text-lg">{t("home1")}</p>

          {/* Display user information with styling */}
          <div className="bg-gray-800 p-4 rounded-md mt-4">
            <p className="text-xl font-bold text-white"> {t("UI")} </p>
            <div className="text-left text-white mt-2">
              {userData ? (
                <>
                  <p>
                    <span className="font-bold">Name:</span> {userData.name}
                  </p>
                  <p>
                    <span className="font-bold">Number:</span> {userData.phone}
                  </p>
                  <p>
                    <span className="font-bold">Bank:</span> {userData.bank}
                  </p>
                </>
              ) : (
                <p> {t('dl')} </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Include Chatbot Component */}
      <Chatbot />
      <AboutUs />

      {/* Include HomePage Component */}
    </div>
  );
};

export default Home;
