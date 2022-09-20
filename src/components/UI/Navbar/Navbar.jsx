import React from "react";
import { Link } from "react-router-dom";

//Компонент меню

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__links">
        <Link to="/posts">Главная</Link>
      </div>
    </div>
  );
};

export default Navbar;
