'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState} from "react";

export default function Banner (){
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800); // Define el ancho de pantalla que consideras como versión móvil
    };

    // Agrega el evento de escucha al tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Limpia el evento de escucha cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <div className={isMobile ? "miClaseCSSMobile" : "miClaseCSS"}
    >
    <div className="shadow-2xl ">
    <Image 
      id="miDiv"
      width={800}
      height={800}
      className="p-10 shadow-2xl "
      src="/Banner_Main.jpg"
      alt="Sin Tac Rio Cuarrto"
    />
    </div>
    </div>
  )
}

