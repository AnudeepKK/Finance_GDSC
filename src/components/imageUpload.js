import React, { useState, useEffect } from "react";
import { storage } from "../firebase/config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { where, query, collection, getDocs, getDoc, doc,setDoc } from 'firebase/firestore';
import {db} from '../firebase/config'
import { usePhoneNumber } from "./Language/PhoneContext";


export default function ImageUpload() {
  const { phoneNumber } = usePhoneNumber();
  console.log("Phone Number:", phoneNumber);
  const [aadharImage, setAadharImage] = useState(null);
  const [panImage, setPanImage] = useState(null);
  const [passbookImage, setPassbookImage] = useState(null);
  const [aadharList, setAadharList] = useState([]);
  const [panList, setPanList] = useState([]);
  const [passbookList, setPassbookList] = useState([]);
   

  const { t } = useTranslation();

  const fetchImageURLs = async (phoneNumber, imageType, setImageList) => {
    try {
      const imageCollectionRef = collection(db, "Participant", phoneNumber, "Image");
      const imageTypeRef = doc(imageCollectionRef, imageType);
  
      const imageDoc = await getDoc(imageTypeRef);
  
      if (imageDoc.exists()) {
        const { imageUrl } = imageDoc.data();
        setImageList([imageUrl]);
      } else {
        setImageList([]); // No image found for the given type
      }
    } catch (error) {
      console.error("Error fetching image URLs:", error);
      console.log(phoneNumber)
    }
  };
  
  useEffect(() => {
    
    fetchImageURLs(phoneNumber, "aadhar", setAadharList);
    fetchImageURLs(phoneNumber, "pan", setPanList);
    fetchImageURLs(phoneNumber, "passbook", setPassbookList);
  }, []);
  

  const uploadImage = async (image, setImage, imageType, endpoint, listRef) => {
    if (image === null) {
      return;
    }
  
    const formData = new FormData();
    formData.append("uploadedImage", image);
    try {
      const response = await axios.post(endpoint, formData);
  
      if (response.data.success) {
        const imageRef = ref(storage, `${listRef}/${image.name + v4()}`);
        await uploadBytes(imageRef, image);
  
        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(imageRef);
        const imageCollectionRef = collection(db, "Participant", phoneNumber, "Image");
        const imageDocRef = doc(imageCollectionRef, imageType);
        await setDoc(imageDocRef, { imageUrl });
  
        alert(`${t('alertdoc')}`);
  
        // Fetch updated image URLs after successful upload
      } else {
        alert(`${t("faildoc")}`);
      }
    } catch (error) {
      console.error("Error during verification:", error.message);
      console.log(phoneNumber)
      alert(`${t('faildoc1')}`);
    }
  };
  
  

  return (
    <div className="container mx-auto p-8">
    <h1 className="text-5xl text-center text-gray-800 mb-8">{t("upload")}</h1>
    <div className="flex justify-between space-x-4">
      {/* Aadhar Section */}
      <div className="border border-gray-500 p-4 flex flex-col items-center">
        <input
          type="file"
          name="aadharImage"
          onChange={(e) => setAadharImage(e.target.files[0])}
          className="mb-4"
        ></input>
        <button
          onClick={() =>
            uploadImage(
              aadharImage,
              setAadharList,
              "aadhar",
              "http://localhost:3000/verifyAadhaarCardEndpoint",
              "images/aadhar"
            )
          }
          className="bg-red-500 px-4 py-2 rounded-2xl text-white"
        >
          {t('aadhar')}
        </button>
        {aadharList.map((url) => (
          <div key={url} className="flex mt-2 justify-center">
            <img
              src={url}
              className="object-contain h-45 w-45"
              alt="Aadhar Card"
            />
          </div>
        ))}
      </div>
  
      {/* PAN Section */}
      <div className="border border-gray-500 p-4 flex flex-col items-center">
        <input
          type="file"
          name="panImage"
          onChange={(e) => setPanImage(e.target.files[0])}
          className="mb-4"
        ></input>
        <button
          onClick={() =>
            uploadImage(
              panImage,
              setPanList,
              "pan",
              "http://localhost:3000/verifyPanEndpoint",
              "images/pan"
            )
          }
          className="bg-red-500 px-4 py-2 rounded-2xl text-white"
        >
          {t('pan')}
        </button>
        {panList.map((url) => (
          <div key={url} className="flex mt-2 justify-center">
            <img
              src={url}
              className="object-contain h-45 w-45"
              alt="PAN Card"
            />
          </div>
        ))}
      </div>
  
      {/* Passbook Section */}
      <div className="border border-gray-500 p-4 flex flex-col items-center">
        <input
          type="file"
          name="passbookImage"
          onChange={(e) => setPassbookImage(e.target.files[0])}
          className="mb-4"
        ></input>
        <button
          onClick={() =>
            uploadImage(
              passbookImage,
              setPassbookList,
              "passbook",
              "http://localhost:3000/verifyPassEndpoint",
              "images/passbook"
            )
          }
          className="bg-red-500 px-4 py-2 rounded-2xl text-white"
        >
          {t('passbook')}
        </button>
        {passbookList.map((url) => (
          <div key={url} className="flex mt-2 justify-center">
            <img
              src={url}
              className="object-contain h-45 w-45"
              alt="Passbook"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
  

  
  );
}