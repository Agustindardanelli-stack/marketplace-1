import React from "react";
import Link from "next/link";
const Option_mai = () => {
  return (
    <div className="grid grid-cols-3 w-screen">
    <div className="col-span-3 flex justify-center h-10">
    <Link href="#productos" className="flex-1 text-center border">Productos</Link>
    <Link href="#Ofertas" className="flex-1 text-center border">Ofertas</Link>
    <Link href="#Categoria" className="flex-1 text-center border">Categoria</Link>
    
  </div>
</div>
  );
};

export default Option_mai;