import React from 'react';
import "../pages/index_style.css";
import Image from "next/image";

interface LinkButtonProps {
  imageUrl: string;
  text: string;
}

function LinkButton ({imageUrl, text}: LinkButtonProps) {
  return (
    <div className="link_button">
      <Image src={imageUrl} alt={imageUrl} height={40} width={40} />
      <p>{text}</p>
    </div>
  )
}

export default LinkButton
