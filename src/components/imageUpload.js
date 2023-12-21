// // import React from "react";
// // import { useState, useEffect } from "react";
// // import { storage } from "../firebase/config";
// // import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
// // import { v4 } from "uuid";

// // import axios from "axios";

// // export default function ImageUpload() {
// //   const [image, setImage] = useState(null);
// //   const [imagelist, setImageList] = useState([]);

// //   const template = "./adhar.jpg";

// //   const imageListRef = ref(storage, "images/");

// //   useEffect(() => {
// //     listAll(imageListRef)
// //       .then((response) => {
// //         // Create an array of promises for all getDownloadURL calls
// //         const promises = response.items.map((item) => getDownloadURL(item));

// //         // Wait for all promises to resolve
// //         return Promise.all(promises);
// //       })
// //       .then((urls) => {
// //         // Update the state with the array of URLs
// //         setImageList((prev) => [...prev, ...urls]);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching image URLs:", error);
// //       });
// //   }, []);

// //   const uploadImage = async () => {
// //     if (image === null) {
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("uploadedImage", image);
// //     console.log(formData);

// //     // Make Axios request before uploading the image
// //     try {
// //       // Adjust the API endpoint and request payload as needed
// //       console.log(template);
// //       const response = await axios.post(
// //         "http://localhost:3000/verifyAadhaarCardEndpoint",
// //         formData
// //       );

// //       console.log(response);

// //       // Check the response from the verification API
// //       if (response.data.success) {
// //         // If verification is successful, proceed with image upload
// //         const imageRef = ref(storage, `images/${image.name + v4()}`);
// //         await uploadBytes(imageRef, image);
// //         alert("File upload successful");
// //       } else {
// //         alert("Verification failed. Please try again.");
// //       }
// //     } catch (error) {
// //       console.error("Error during verification:", error.message);
// //       alert("Error during verification. Please try again.");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1 className="text-black-500 text-center text-5xl">UPLOAD DOCUMENTS</h1>
// //       <div className="flex justify-center mt-5">
// //         <input
// //           type="file"
// //           name="uploadedImage"
// //           onChange={(e) => {
// //             setImage(e.target.files[0]);
// //           }}
// //         ></input>
// //         <button onClick={uploadImage} className="bg-red-500 px-3 rounded-2xl">
// //           Upload
// //         </button>
// //       </div>
// //       {imagelist.map((url) => {
// //         return (
// //           <>
// //             <div className="flex">
// //               <img
// //                 src={url}
// //                 style={{
// //                   height: "100px",
// //                   width: "100px",
// //                   backgroundRepeat: "no-repeat",
// //                 }}
// //               />
// //             </div>
// //           </>
// //         );
// //       })}
// //     </div>
// //   );
// // }

import React, { useState, useEffect } from "react";
import { storage } from "../firebase/config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";


export default function ImageUpload() {
  const [aadharImage, setAadharImage] = useState(null);
  const [panImage, setPanImage] = useState(null);
  const [passbookImage, setPassbookImage] = useState(null);
  const [aadharList, setAadharList] = useState([]);
  const [panList, setPanList] = useState([]);
  const [passbookList, setPassbookList] = useState([]);

  const imageListRef = ref(storage, "images/");

  const aadharListRef = ref(storage, "images/aadhar/");
  const panListRef = ref(storage, "images/pan/");
  const passbookListRef = ref(storage, "images/passbook/");

  useEffect(() => {
    fetchImageURLs("aadhar", setAadharList);
    fetchImageURLs("pan", setPanList);
    fetchImageURLs("passbook", setPassbookList);
  }, []);

  const fetchImageURLs = (imageList, setImageList) => {
    listAll(imageListRef)
      .then((response) => {
        const promises = response.items.map((item) => getDownloadURL(item));
        return Promise.all(promises);
      })
      .then((urls) => {
        setImageList(urls);
      })
      .catch((error) => {
        console.error("Error fetching image URLs:", error);
      });
  };

  const uploadAdharImage = async (image, setImage, imageType) => {
    if (image === null) {
      return;
    }

    const formData = new FormData();
    formData.append("uploadedImage", image);

    // Make Axios request before uploading the image to verify
    try {
      const response = await axios.post(
        "http://localhost:3000/verifyAadhaarCardEndpoint",
        formData
      );


      if (response.data.success) {
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        await uploadBytes(imageRef, image);
        alert("Document verification successful");
        // Fetch updated image URLs after successful upload
        fetchImageURLs(imageType, setImage);
      } else {
        alert("Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during verification:", error.message);
      alert("Error during verification. Please try again.");
    }
  };


  const uploadPanImage = async (image, setImage, imageType) => {
    if (image === null) {
      return;
    }

    const formData = new FormData();
    formData.append("uploadedImage", image);

    // Make Axios request before uploading the image to verify
    try {
      const response = await axios.post(
        "http://localhost:3000/verifyPanEndpoint",
        formData
      );


      if (response.data.success) {
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        await uploadBytes(imageRef, image);
        alert("Document verification successful");
        // Fetch updated image URLs after successful upload
        fetchImageURLs(imageType, setImage);
      } else {
        alert("Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during verification:", error.message);
      alert("Error during verification. Please try again.");
    }
  };


  const uploadPassImage = async (image, setImage, imageType) => {
    if (image === null) {
      return;
    }

    const formData = new FormData();
    formData.append("uploadedImage", image);

    // Make Axios request before uploading the image to verify
    try {
      const response = await axios.post(
        "http://localhost:3000/verifyPassEndpoint",
        formData
      );


      if (response.data.success) {
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        await uploadBytes(imageRef, image);
        alert("Document verification successful");
        // Fetch updated image URLs after successful upload
        fetchImageURLs(imageType, setImage);
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
      <h1 className="text-black-500 text-center text-5xl">UPLOAD DOCUMENTS</h1>
      <div className="flex justify-between mt-5 mx-3">
        {/* Aadhar Section */}
        <div className="border border-black p-4">
          <input
            type="file"
            name="aadharImage"
            onChange={(e) => setAadharImage(e.target.files[0])}
          ></input>
          <button
            onClick={() => uploadAdharImage(aadharImage, setAadharList, "aadhar")}
            className="bg-red-500 px-3 rounded-2xl"
          >
            Upload Aadhar
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
            onClick={() => uploadPanImage(panImage, setPanList, "pan")}
            className="bg-red-500 px-3 rounded-2xl"
          >
            Upload PAN
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
              uploadPassImage(passbookImage, setPassbookList, "passbook")
            }
            className="bg-red-500 px-3 rounded-2xl"
          >
            Upload Passbook
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

// import React, { useState, useEffect } from "react";
// import { storage } from "../firebase/config";
// import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
// import { v4 } from "uuid";
// import axios from "axios";
// import { saveAs } from "file-saver";

// const ImageUpload = () => {
//   const [aadharImage, setAadharImage] = useState(null);
//   const [aadharList, setAadharList] = useState([]);

//   const imageListRef = ref(storage, "images/");

//   useEffect(() => {
//     fetchImageURLs("aadhar", setAadharList);
//   }, []);

//   const fetchImageURLs = (imageList, setImageList) => {
//     listAll(imageListRef)
//       .then((response) => {
//         const promises = response.items.map((item) => getDownloadURL(item));
//         return Promise.all(promises);
//       })
//       .then((urls) => {
//         setImageList(urls);
//       })
//       .catch((error) => {
//         console.error("Error fetching image URLs:", error);
//       });
//   };

//   const uploadImage = async (image, setImage, imageType) => {
//     if (image === null) {
//       return;
//     }

//     const formData = new FormData();
//     formData.append("uploadedImage", image);

//     // Make Axios request before uploading the image to verify
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/verifyAadhaarCardEndpoint",
//         formData
//       );

//       if (response.data.success) {
//         const imageRef = ref(storage, `images/${image.name + v4()}`);
//         await uploadBytes(imageRef, image);
//         alert("File upload successful");
//         // Fetch updated image URLs after successful upload
//         fetchImageURLs(imageType, setImage);
//       } else {
//         alert("Verification failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during verification:", error.message);
//       alert("Error during verification. Please try again.");
//     }
//   };

//   const downloadImageAsPDF = (url, imageName) => {
//     // Convert the image URL to a blob
//     fetch(url)
//       .then((response) => response.blob())
//       .then((blob) => {
//         // Save the blob as a PDF file
//         saveAs(blob, `${imageName}.pdf`);
//       })
//       .catch((error) => {
//         console.error("Error downloading image as PDF:", error);
//       });
//   };

//   return (
//     <div>
//       <h1 className="text-black-500 text-center text-5xl">UPLOAD DOCUMENTS</h1>
//       <div className="flex justify-between mt-5 mx-3">
//         {/* Aadhar Section */}
//         <div className="border border-black p-4">
//           <input
//             type="file"
//             name="aadharImage"
//             onChange={(e) => setAadharImage(e.target.files[0])}
//           ></input>
//           <button
//             onClick={() => uploadImage(aadharImage, setAadharList, "aadhar")}
//             className="bg-red-500 px-3 rounded-2xl"
//           >
//             Upload Aadhar
//           </button>
//           {aadharList.map((url) => (
//             <div key={url} className="flex mt-2 justify-center">
//               <img
//                 src={url}
//                 className="h-20 w-20 object-cover"
//                 alt="Aadhar Card"
//               />
//               <button
//                 onClick={() => downloadImageAsPDF(url, "aadhar")}
//                 className="bg-blue-500 ml-2 px-2 rounded"
//               >
//                 Download PDF
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;
