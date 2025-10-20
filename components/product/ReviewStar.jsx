'use client';

import React from "react";
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";

const ReviewStar = ({ point }) => {
  const maxStars = 5;
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (i <= Math.floor(point)) {
      stars.push(<FaStar className="size-4 lg:size-5" key={i} />);
    } else if (i - point <= 0.5) {
      stars.push(<FaStarHalfAlt className="size-4 lg:size-5" key={i} />);
    } else {
      stars.push(<FaRegStar className="size-4 lg:size-5" key={i} />);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center text-yellow-500">{stars}</div>
      <p className="text-s">({point.toLocaleString("fa-IR")} - امتیاز)</p>
    </div>
  );
};

export default ReviewStar;
