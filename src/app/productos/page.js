import Image from "next/image"
import Link from "next/link";
// import { MdOutlineShoppingCart } from "react-icons/md";
export default function productos (){

    
    return (
         <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-xl text-center font-semibold tracking-tight text-gray-900 dark:text-white" >Doninas </h1>
            <Image className='p-8 rounded-t-lg0 '
            src="/doninas.png" 
            width={450} 
            height={350}                
            />            
            <div className="flex items-center justify-between " >
                <p className="text-3xl font-bold text-gray-900 dark:text-white">$800.00</p>                                              
                <Link href="#"className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Agregar al carrito</Link>                
            </div>                
           
        </div>
    )
}




