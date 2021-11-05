import React from "react";
import "./Bottom.css";
import { FaFilter, FaBuffer } from "react-icons/fa";

const Bottom = () => {
  return (
    <div className="bottom-outer">
      <div className="btn-inner-wrapper">
        <FaFilter className="filter" />
        <div class="vertical-line"></div>
        <FaBuffer className="history" />
      </div>
    </div>
  );
};

export default Bottom;
