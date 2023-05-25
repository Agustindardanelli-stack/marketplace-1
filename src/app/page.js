import Image from 'next/image'
import  NavBar from './component/Navbar'
import Option_main from './component/Option_mai'
import { images } from '../../next.config'
import Banner from './component/banner'
export default function Home() {
  return (
    <div>
    <NavBar/>
    <Option_main/>
    <Banner></Banner>
    <h1></h1>
    </div>
    
  )
}
