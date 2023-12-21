import React, { useState, useEffect } from "react";
import { storage } from "../firebase/config";
import { ref, uploadBytes,  getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { collection, getDoc, doc,setDoc } from 'firebase/firestore';
import {db} from '../firebase/config';
import { usePhoneNumber } from "./Language/PhoneContext";

export default function ImageUpload() {
  const [aadharImage, setAadharImage] = useState(null);
  const [panImage, setPanImage] = useState(null);
  const [passbookImage, setPassbookImage] = useState(null);
  const [aadharList, setAadharList] = useState([]);
  const [panList, setPanList] = useState([]);
  const [passbookList, setPassbookList] = useState([]);
  const { phoneNumber } = usePhoneNumber();

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
    }
  };
  
  useEffect(() => {
    fetchImageURLs(phoneNumber, "aadhar", setAadharList);
    fetchImageURLs(phoneNumber, "pan", setPanList);
    fetchImageURLs(phoneNumber, "passbook", setPassbookList);
  }, [phoneNumber]);
  

  const uploadImage = async (image, setImage, imageType, endpoint, listRef) => {
    if (image === null) {
      return;
    }
  
    const formData = new FormData();
    formData.append("uploadedImage", image);
  
    // Make Axios request before uploading the image to verify
    try {
      const response = await axios.post(endpoint, formData);
  
      if (response.data.success) {
        const imageRef = ref(storage, `${listRef}/${image.name + v4()}`);
        await uploadBytes(imageRef, image);
  
        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(imageRef);
  
        // Update Firestore with the image URL
        const imageCollectionRef = collection(db, "Participant", phoneNumber, "Image");
  
        // Create or update the document based on imageType
        const imageDocRef = doc(imageCollectionRef, imageType);
        await setDoc(imageDocRef, { imageUrl });
  
        alert("Document verification successful");
  
        // Fetch updated image URLs after successful upload
      } else {
        alert("Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during verification:", error.message);
      alert("Error during verification. Please try again.");
    }
  };
  
  

  return (
    <div>
      <h1 className="text-black-500 text-center text-5xl">{t("upload")}</h1>
      <div className="flex justify-between mt-5 mx-3">
        {/* Aadhar Section */}
        <div className="border border-black p-4">
          <input
            type="file"
            name="aadharImage"
            onChange={(e) => setAadharImage(e.target.files[0])}
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
            className="bg-red-500 px-3 rounded-2xl"
          >
             {t('aadhar')}
          </button>
          {aadharList.map((url) => (
            <div key={url} className="flex mt-2 justify-center">
              <img
                src={url}
                className="h-20 w-20 object-cover"
                alt="Aadhar Card"
              />
            </div>
          ))}
        </div>

        {/* PAN Section */}
        <div className="border border-black p-4">
          <input
            type="file"
            name="panImage"
            onChange={(e) => setPanImage(e.target.files[0])}
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
            className="bg-red-500 px-3 rounded-2xl"
          >
            {t('pan')}
          </button>
          {panList.map((url) => (
            <div key={url} className="flex mt-2 justify-center">
              <img
                src={url}
                className="h-16 w-16 object-cover"
                alt="PAN Card"
              />
            </div>
          ))}
        </div>

        {/* Passbook Section */}
        <div className="border border-black p-4">
          <input
            type="file"
            name="passbookImage"
            onChange={(e) => setPassbookImage(e.target.files[0])}
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
            className="bg-red-500 px-3 rounded-2xl"
          >
            {t('passbook')}
          </button>
          {passbookList.map((url) => (
            <div key={url} className="flex mt-2 justify-center">
              <img
                src={url}
                className="h-16 w-16 object-cover"
                alt="Passbook"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}