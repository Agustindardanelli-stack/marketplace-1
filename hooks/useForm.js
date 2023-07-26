import { useState } from "react"

export const useForm = (initialFrom = {}) => {

    const [formState,setFormState] = useState(initialFrom)

    

    const onInputChange = ( {target} ) => {
        const { name,value} = target
        setFormState({
            ...formState,
            [ name ]: value
        })
     }

const onResetForm =() =>{
    setFormState(initialFrom)
}
  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  }
  
}
