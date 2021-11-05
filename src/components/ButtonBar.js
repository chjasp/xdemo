import React from "react";
import "./ButtonBar.css";
import { FaStar, FaHeart } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const ButtonBar = ({ id, handleChoice }) => {
  return (
    <div className="btn-wrapper">
      <button
        className="dislike"
        type="button"
        onClick={() => handleChoice(id, "ADD_TO_DISLIKED_PRODUCTS")}
      >
        <ImCross className="cross" />
      </button>
      <button
        className="superlike"
        type="button"
        onClick={() => handleChoice(id, "ADD_TO_SUPERLIKED_PRODUCTS")}
      >
        <FaStar className="star" />
      </button>
      <button
        className="like"
        type="button"
        onClick={() => handleChoice(id, "ADD_TO_LIKED_PRODUCTS")}
      >
        <FaHeart className="heart" />
      </button>
    </div>
  );
};

export default ButtonBar;
