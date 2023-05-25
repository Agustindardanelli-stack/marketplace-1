import Image from "next/image"
export default function productos (){
    return (
         <div className="animate-jump-in animate-once animate-duration-1000 animate-delay-[50ms]">
            <h1>Doninas </h1>
            <Image className='p-3 '
            src="/doninas.png" 
            width={350} 
            height={250}                
            />
            <div>
                <h1>Doninas </h1>
                <Image className='items'
                src="/doninas.png" 
                width={350} 
                height={250}                
                />
            
            </div>
        </div>
    )
}