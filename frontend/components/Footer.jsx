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
      <a
        href="https://github.com/KrishiDevani15/Movie-recommendation-system"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 font-sans transition-colors duration-300 hover:text-white hover:cursor-pointer"
      >
        © {currentYear} Powered by Atom Ai. Made by Krishi Devani 😊
      </a>
    </footer>
  );
};

export default Footer;
