import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { auth, RecaptchaVerifier, signInWithPhoneNumber, db } from '../../firebase/config';
import { useTranslation } from 'react-i18next';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { usePhoneNumber } from '../Language/PhoneContext';
import { useLanguage } from '../Language/LanguageContext';


const Login = () => {
  const { phoneNumber, setPhoneNumber } = usePhoneNumber();
  const { selectedLanguage, changeLanguage } = useLanguage();
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState('');
  const { t, i18n } = useTranslation();
 
  const navigate = useNavigate();

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
      size: 'invisible',
      callback: (response) => {
        // Handle reCAPTCHA callback if needed
      },
    });
  };

  const languages = [
    { value: '', text: 'Options' },
    { value: 'en', text: 'English' },
    { value: 'kn', text: 'Kannada' },
  ];

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [i18n, selectedLanguage]);


  const handleChange = (e) => {
    const selectedLang = e.target.value;
    changeLanguage(selectedLang);

    i18n.changeLanguage(selectedLang, () => {
      const newUrl = `http://localhost:3001/register/?lng=${selectedLang}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
      window.location.reload();
    });
  };

  const handleSend = async (event) => {
    event.preventDefault();
    setHasFilled(true);
    generateRecaptcha();

    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

      // SMS sent. Prompt user to type the code from the message
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

        const userDocRef = doc(db, 'Participant', phoneNumber);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          console.log(`Document for user ${phoneNumber} exists in Firestore`);
          alert(`${t('signin')}`);
          navigate('/home');
        } else {
          console.log(`Document for user ${phoneNumber} does not exist in Firestore`);
          alert(`${t('notRegistered')}`);
          navigate('/register');
        }
      } catch (error) {
        console.error('Error verifying code:', error.message);
        alert(`${t('errorin')}`);
      }
    }
  };

  return (
    <div className="app__container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '25vh' }}>
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
      <Card sx={{ width: '300px' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Typography sx={{ padding: '20px' }} variant="h5" component="div">
            {hasFilled ? t('OTP') : t('Phone')}
          </Typography>
          <form onSubmit={hasFilled ? verifyOtp : handleSend}>
            {hasFilled ? (
              <TextField
                sx={{ width: '240px' }}
                variant="outlined"
                label="OTP"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
              />
            ) : (
              <TextField
                sx={{ width: '240px' }}
                variant="outlined"
                autoComplete="off"
                label="Phone Number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            )}
            <Button type="submit" variant="contained" sx={{ width: '240px', marginTop: '20px' }}>
              {hasFilled ? t('OTP') : t('Send Code')}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div id="recaptcha"></div>
    </div>
  );
};

export default Login;
