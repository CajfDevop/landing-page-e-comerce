import { createContext, useState } from 'react'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {
    const [countCart, setCountCart] = useState(0)

    return(
        <ShoppingCartContext.Provider value={{
            countCart,
            setCountCart
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}