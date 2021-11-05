import React, { useState, setState } from "react";
import "./Wrapper.css";
import Card from "./Card";
import Bottom from "./Bottom";
import data from "../data.json";

const computedFeatures = {
  nrOfLikeComputations: 0,
  nrOfDislikeComputations: 0,
  avgLiked: [0, 0],
  avgDisliked: [0, 0],
};

const Wrapper = () => {
  const [products, setProducts] = useState(data);
  const [superlikedProducts, setSuperlikedProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [dislikedProducts, setDislikedProducts] = useState([]);
  const [displayedProduct, setDisplayedProduct] = useState(0);

  const handleChoice = (id, action) => {
    console.log(computedFeatures.avgLiked);
    console.log(computedFeatures.avgDisliked);
    console.log(id)
    switch (action) {
      case "ADD_TO_LIKED_PRODUCTS":
        let nr = computedFeatures.nrOfLikeComputations;
        let selectedProduct = products.filter((product) => product.id === id);

        let x = selectedProduct[0].features[0];
        let y = selectedProduct[0].features[1];

        let newLikedX =
          (nr / (nr + 1)) * computedFeatures.avgLiked[0] + (1 / (nr + 1)) * x;
        let newLikedY =
          (nr / (nr + 1)) * computedFeatures.avgLiked[1] + (1 / (nr + 1)) * y;

        setLikedProducts([...likedProducts], selectedProduct[0]);
        let cleanProducts = products.filter((product) => product.id != id);
        setProducts(cleanProducts);

        let minDist = 1000;
        let minIdx = 0;
        for (let i = 0; i < cleanProducts.length; i++) {
          let runningDist =
            (cleanProducts[i].features[0] - newLikedX) ** 2 +
            (cleanProducts[i].features[1] - newLikedY) ** 2;

          if (
            computedFeatures.avgDisliked[0] != 0 &&
            computedFeatures.avgDisliked[1] != 0
          ) {
            runningDist +=
              -1 *
              (cleanProducts[i].features[0] -
                computedFeatures.avgDisliked[0]) **
                2;
            runningDist +=
              -1 *
              (cleanProducts[i].features[1] -
                computedFeatures.avgDisliked[1]) **
                2;
          }

          if (runningDist < minDist) {
            minDist = runningDist;
            minIdx = i;
          }
        }

        computedFeatures.nrOfLikeComputations = nr + 1;
        computedFeatures.avgLiked = [newLikedX, newLikedY];
        setDisplayedProduct(cleanProducts[minIdx].id);

        console.log(computedFeatures);
        break;
      case "ADD_TO_DISLIKED_PRODUCTS":
        let nrDL = computedFeatures.nrOfDislikeComputations;
        let selectedProductDL = products.filter((product) => product.id === id);

        let xDL = selectedProductDL[0].features[0];
        let yDL = selectedProductDL[0].features[1];

        let newLikedXDL =
          (nrDL / (nrDL + 1)) * computedFeatures.avgDisliked[0] +
          (1 / (nrDL + 1)) * xDL;
        let newLikedYDL =
          (nrDL / (nrDL + 1)) * computedFeatures.avgDisliked[1] +
          (1 / (nrDL + 1)) * yDL;

        setLikedProducts([...dislikedProducts], selectedProductDL[0]);
        let cleanProductsDL = products.filter((product) => product.id != id);
        setProducts(cleanProductsDL);

        let minDistDL = 1000;
        let minIdxDL = 0;
        for (let i = 0; i < cleanProductsDL.length; i++) {
          let runningDistDL =
            (cleanProductsDL[i].features[0] - computedFeatures.avgLiked[0]) ** 2 +
            (cleanProductsDL[i].features[1] - computedFeatures.avgLiked[1]) ** 2;

          if (
            computedFeatures.avgDisliked[0] != 0 &&
            computedFeatures.avgDisliked[1] != 0
          ) {
            runningDistDL +=
              -1 *
              (cleanProductsDL[i].features[0] -
                computedFeatures.avgDisliked[0]) **
                2;
            runningDistDL +=
              -1 *
              (cleanProductsDL[i].features[1] -
                computedFeatures.avgDisliked[1]) **
                2;
          } else {
            computedFeatures.avgDisliked[0] = newLikedXDL
            computedFeatures.avgDisliked[1] = newLikedYDL
          }

          if (runningDistDL < minDistDL) {
            minDistDL = runningDistDL;
            minIdxDL = i;
          }
        }

        computedFeatures.nrOfDislikeComputations = nrDL + 1;
        computedFeatures.avgDisliked = [newLikedXDL, newLikedYDL];
        setDisplayedProduct(cleanProductsDL[minIdxDL].id);

        break;
      case "ADD_TO_SUPERLIKED_PRODUCTS":
        // newLiked = (nr/(nr+3))*avgLiked + (3/(nr+3))*productFeats
        // setlikedProducts = newLiked
        // nrOfLikeComputations = +1
        let nrSL = computedFeatures.nrOfLikeComputations;
        let selectedProductSL = products.filter((product) => product.id === id);

        let xSL = selectedProductSL[0].features[0];
        let ySL = selectedProductSL[0].features[1];

        let newLikedXSL =
          (nrSL / (nrSL + 3)) * computedFeatures.avgLiked[0] +
          (3 / (nrSL + 3)) * xSL;
        let newLikedYSL =
          (nrSL / (nrSL + 3)) * computedFeatures.avgLiked[1] +
          (3 / (nrSL + 3)) * ySL;

        setLikedProducts([...likedProducts], selectedProductSL[0]);
        let cleanProductsSL = products.filter((product) => product.id != id);
        setProducts(cleanProductsSL);

        let minDistSL = 1000;
        let minIdxSL = 0;
        for (let i = 0; i < cleanProductsSL.length; i++) {
          let runningDistSL =
            (cleanProductsSL[i].features[0] - newLikedXSL) ** 2 +
            (cleanProductsSL[i].features[1] - newLikedYSL) ** 2;

          if (
            computedFeatures.avgLiked[0] != 0 &&
            computedFeatures.avgLiked[1] != 0
          ) {
            runningDistSL +=
              -1 *
              (cleanProductsSL[i].features[0] -
                computedFeatures.avgLiked[0]) **
                2;
            runningDistSL +=
              -1 *
              (cleanProductsSL[i].features[1] -
                computedFeatures.avgLiked[1]) **
                2;
          }

          if (runningDistSL < minDistSL) {
            minDistSL = runningDistSL;
            minIdxSL = i;
          }
        }

        computedFeatures.nrOfLikedComputations = nrSL + 1;
        computedFeatures.avgLiked = [newLikedXSL, newLikedYSL];
        setDisplayedProduct(cleanProductsSL[minIdxSL].id);
        break;
      default:
        return null; //people;
    }
  };

  return (
    <div className="outer-wrap">
      <Card id={displayedProduct} handleChoice={handleChoice} />
      <Bottom />
    </div>
  );
};

export default Wrapper;
