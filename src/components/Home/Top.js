// Top.js
import React from 'react';
import imge from "../../images/invent.png";
import img from "../../images/logofin.jpg";

const Top = () => {
  return (
    <div className="flex items-center justify-between p-1">
      {/* Company Logo (Left) */}
      <img
        src={imge}
        alt="Company Logo"
        className="object-cover w-2/4 h-1/4" // Adjust the width and height as needed
      />

      {/* Other Images (Right) */}
      <div className="flex items-center">
        {/* Image 1 */}
        <img
          src={img}
          alt="OtherImage"
          className="object-cover w-full sm:w-4/4 lg:w-4/4 h-2/4" // Adjust the width and height as needed
        />
      </div>
    </div>
  );
};

export default Top;