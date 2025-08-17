import React from "react";

const InfoPill = ({ text, image }: InfoPillProps) => {
  console.log("InfoPill Props:", { text, image });
  return (
    <figure className="info-pill">
      <img src={image} alt={text} referrerPolicy="no-referrer" />
      <figcaption>{text}</figcaption>
    </figure>
  );
};

export default InfoPill;
