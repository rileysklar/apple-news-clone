import React from "react";
import "./header.css";

const getDate = () => {
  const currentDate = new Date();
  const fullMonth = currentDate.toLocaleString("default", { month: "long" });
  const day = currentDate.getDate();
  const formattedDate = `${fullMonth} ${day}`;
  return formattedDate;
};

const Header = () => {
  const formattedDate = getDate();

  return (
    <div className="header">
      <div className="inner">
        <div className="left-container">
          <div className="identity">
            <span className="logo"></span>
            <h1>News</h1>
          </div>
          <h2 className="date">{formattedDate}</h2>
        </div>
        <div className="hamburger hide-me">
          <img src="public/burger.svg" alt="Burger" />
        </div>
      </div>
    </div>
  );
};

export default Header;
