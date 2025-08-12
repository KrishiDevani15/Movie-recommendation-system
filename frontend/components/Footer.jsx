import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        textAlign: "center",
        padding: "1rem",
        fontSize: "0.9rem",
        color: "#888",
      }}
    >
      <p className="text-gray-400 font-sans transition-colors duration-300 hover:text-white hover:cursor-pointer">
        © {currentYear} Powered by Atom Ai. Made by Krishi Devani 😊
      </p>
    </footer>
  );
};

export default Footer;
