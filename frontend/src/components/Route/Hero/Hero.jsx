import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
      style={{
        backgroundImage:
          "url(https://i.imghippo.com/files/Zq3d31728412845.jpg)",
        backgroundSize: "cover",        // Ensures the image covers the entire container
        backgroundPosition: "center",   // Centers the image within the container
      }}
    >
      {/* Content */}
      <div className={`${styles.section} w-[90%] 800px:w-[60%] mx-auto text-left`}>
        <h1
          className={`text-[30px] leading-[1.2] 800px:text-[50px] text-[#3d3a3a] font-bold capitalize`}
        >
        </h1>
        <p className="pt-4 text-[14px] 800px:text-[16px] font-[Poppins] text-[#000000ba] leading-relaxed">
        </p>
      </div>

      {/* Button centered at the bottom */}
      <div className="absolute bottom-6 w-full flex justify-center">
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} py-3 px-6 bg-[#ff5722] hover:bg-[#e64a19] transition-all rounded-full shadow-lg`}>
            <span className="text-white font-[Poppins] text-[16px] font-medium">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
