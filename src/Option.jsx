import React from "react";
import { Link } from "react-router-dom";

const Option = () => {
  return (
    <div className="option-container">
      <Link to="/add" className="option-link">
        <button className="option-button">Add Task</button>
      </Link>
      <Link to="/read" className="option-link">
        <button className="option-button">Display Task</button>
      </Link>
    </div>
  );
};

export default Option;
