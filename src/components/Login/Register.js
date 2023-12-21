import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase/config';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../Language/LanguageContext';
import { useNavigate } from 'react-router-dom';

import {
  addDoc,
  getDoc,
  getFirestore,
  setDoc,
  doc,
  collection,
} from "firebase/firestore";



const languages = [
  { value: '', text: 'Options' },
  { value: 'en', text: 'English' },
  { value: 'kn', text: 'Kannada' },
];

const Register = () => {
  const { t, i18n } = useTranslation();
  const { selectedLanguage, changeLanguage } = useLanguage();
  const [phone, setPhone] = useState('+91');
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [bank, setBank] = useState('');
  const [branch, setBranch] = useState('');
  const navigate = useNavigate();

  const db = getFirestore();


  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [i18n, selectedLanguage]);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
      size: 'invisible',
      callback: (response) => {
        // Handle reCAPTCHA callback if needed
      },
    });
  };

  const handleSend = async (event) => {
    event.preventDefault();
    setHasFilled(true);
    generateRecaptcha();

    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);

      window.confirmationResult = confirmationResult;

    } catch (error) {
      console.error('Error sending code:', error.message);
    }
  };

  const verifyOtp = async (event) => {
    event.preventDefault();
    const enteredOtp = otp;

    if (enteredOtp.length === 6) {
      const confirmationResult = window.confirmationResult;
      try {
        await confirmationResult.confirm(enteredOtp);
        alert(`${t('signin')}`);

        setDoc(doc(db, "Participant", phone), {
          name: name,
          bank: bank,
          branch: branch,
          phone: phone,
        }).then(async () => {
          // setForm({});
    
          setName("");
          setBank("");
          setBranch("");
          setPhone("");
    
          console.log("Pushed");
        });
    
        // Redirect to the home page after successful login
        navigate('/');
      } catch (error) {
        console.error('Error verifying code:', error.message);
        alert(`${t("errorin")}`);
      }
    }
  };

  const handleSubmit = () => {
    // Add your logic for handling the registration here
    // You can use the values of name, phone, bank, and branch

    // For example, you might want to display an alert with the collected data
    alert(`Name: ${name}\nPhone: ${phone}\nBank: ${bank}\nBranch: ${branch}`);
  };

  const handleChange = (e) => {
    const selectedLang = e.target.value;
    changeLanguage(selectedLang);

    i18n.changeLanguage(selectedLang, () => {
      const newUrl = `http://localhost:3001/register/?lng=${selectedLang}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
      window.location.reload();
    });
  };

  return (
    <div className='app__container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <label>{t('Select Language')}</label>
        <select value={selectedLanguage} onChange={(e) => handleChange(e)}>
          {languages.map((language) => (
            <option key={language.value} value={language.value}>
              {t(language.text)}
            </option>
          ))}
        </select>
      </div>
      <Card sx={{ width: '300px', marginTop: '100px' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Typography sx={{ padding: '20px' }} variant='h5' component='div'>
            {hasFilled ? t('OTP') : t('Phone')}
          </Typography>
          <form onSubmit={hasFilled ? verifyOtp : handleSend}>
            {hasFilled ? (
              <TextField
                style={{ margin: '10px' }}
                variant='outlined'
                label={t('OTP')}
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
              />
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-2 w-full  mb-2 md:mr-2 border shadow-2xl rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder={t('Name')}
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium  text-white">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="mt-1 p-2 w-full border shadow-2xl rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Your phone number"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-white">
                    Bank
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-2 w-full border shadow-2xl rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder={t("Bank")}
                    name="bank"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-white">
                    Branch
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-2 w-full border shadow-2xl rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Your branch"
                    name="branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  />
                </div>

              </>
            )}
            {hasFilled?
            <Button type='submit' variant='contained' style={{ width: '240px', marginTop: '20px' }}>
              {t('OTP')}
            </Button>
            :
            <Button type='submit' variant='contained' style={{ width: '240px', marginTop: '20px' }}>
              {t('Send Code') }
            </Button>
}
          </form>
        </CardContent>
      </Card>
      <div id='recaptcha'></div>
    </div>
  );
};

export default Register;