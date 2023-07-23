'use client'
import Image from "next/image";


export default function Marcas() {
  return (
    <div className="rounded-xl flex ">
        <Image
          src="/trini.png"
          width={190}
          height={100}
          alt="image 1"
          className="p-2 bottom-3 border border-blue-100 "
        />
      <div className=" flex flex-wrap items-center">
        <Image
          src="/rodmix.png"
          width={188}
          height={70}
          alt="image 2"
          className="p-2 bottom-3 border border-blue-100 "
        />
      </div>
      <div className=" flex flex-wrap items-center">
        <Image
          src="/doninas.jpeg"
          width={250}
          height={100}
          alt="image 3"
          className="p-2 bottom-3 border border-blue-100 "
        />
      </div>
      <div className=" flex flex-wrap items-center ">
        <Image
          src="/schar.jpg"
          width={250}
          height={100}
          alt="image 3"
          className="p-2 bottom-3 border border-blue-100 "
        />
      </div>
    </div>
  );
}