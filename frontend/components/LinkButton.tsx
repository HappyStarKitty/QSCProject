import React from 'react';
import "../pages/index_style.css";
import Image from "next/image";

interface LinkButtonProps {
  imageUrl: string;
  text: string;
  //clickFun: (args?: void) => void;
}

function LinkButton ({imageUrl, text}: LinkButtonProps) {
  return (
    <div className="link_button" >
      <Image src={imageUrl} alt={imageUrl} height={35} width={35} />
      <p color="black">{text}</p>
    </div>
  )
}

export default LinkButton
