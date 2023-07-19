import Option_mai from "./component/Option_mai"
import Banner from "./component/banner"
import Nosotros from "./component/Nosotros"
import Marcas from "./component/Marcas"
export default function Home() {
  return ( 
    <div>    
    <Option_mai/>
    <Banner/>
    <Nosotros/>
    <div>
      <h1 className="text-2xl text-center hover:underline underline-offset-1" > Nuestras marcas </h1>
      <Marcas/>
    </div>
    </div>
  )
}
