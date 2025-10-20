import React from "react";
import { STATIC_FILES } from "@/apiUrl";

const Image = ({ src, alt, className }) => {
  return <img src={STATIC_FILES+src} alt={alt} className={className} />;
};

export default Image;
