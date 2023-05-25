"use client"
import { MdOutlineShoppingCart } from "react-icons/md";
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);
  return (
    <div>
      <Head>
        <title>L´Antonia Sin Tacc</title>
        <meta
          name="description"
          content="Autoservicio para celiacos en rio cuarto"
        />
        <link  className="outline hover:outline-offset-2" rel="icon" href="/logo.ico" />     
      </Head>
      <nav className="w-full text-black shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between  md:py-3 md:block">
              <Link href="/">                
                <Image className='items  ' 
                src="/logonuevo.png" 
                width={110} 
                height={124}                
                />
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-black"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'block' : 'hidden'
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-black text-xl ">
                  <Link href="/">
                  <h1 className="text-lg  underline hover:underline-offset-4">Home</h1>
                  </Link>
                </li>
                <li className="text-black text-xl ">
                  <Link href="/Contact">                                      
                    <h1 className="text-lg  underline hover:underline-offset-4">Contacto </h1>
                  </Link>
                </li>
                <li className="text-black text-xl ">
                  <Link href="/login">
                    <h3 className="text-lg  underline hover:underline-offset-4 ">Login</h3>                     
                  </Link>
                </li>
                <li className="text-black text-xl">                  
                  <MdOutlineShoppingCart className="text-2xl outline hover:outline-offset-2  outline-1 "/>
                </li>
                <li className="text-black">                                
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      
    </div>
    
  );
}