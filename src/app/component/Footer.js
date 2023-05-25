"use client"
import Link from "next/link"
import Image from "next/image"
import { AiFillInstagram } from 'react-icons/ai'
import {HiOutlineMail} from 'react-icons/hi'
import { MdFacebook} from "react-icons/md"
export default function Footer ()  {
    return (
      <footer className="bg-blue-100 border-2 border-gray-300 rounded-lg shadow dark:bg-gray-900 m-4">
       <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">                
          <div>
                <Link href="/">                
                    <Image className='flex flex-wrap text-center border-x-4 border-gray-500' 
                    src="/logonuevo.png" 
                    width={110} 
                    height={124}                
                    />                    
                </Link>
           </div>
                <ul className="flex  mb-6 text-sm font-medium  sm:mb-0 dark:text-gray-400 ">
                    <li>
                        <Link href="/facebook" >
                            <MdFacebook className="text-2xl mr-4 hover:underline md:mr-6  "/>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" >
                            <AiFillInstagram className="text-2xl mr-4 hover:underline md:mr-6  "/>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" >
                            <HiOutlineMail  className="text-2xl mr-4 hover:underline md:mr-6  "/>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="text-lg mr-4 hover:underline md:mr-6 ">Contact</Link>
                    </li>
                </ul>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span class="block text-sm text-gray-500  sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">L´Antonia Sin Tacc</a>. All Rights Reserved.</span>
        </div>
        </footer>


    )
}


