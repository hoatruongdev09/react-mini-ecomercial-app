import { createContext, useState, useEffect } from 'react'


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartItemCount: 0
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartItemCount, setCartItemCount] = useState(0)

    useEffect(() => {
        setCartItemCount(cartItems.reduce((total, item) => total + item.quantity, 0))
    }, [cartItems])


    const addItemToCart = (productToAdd) => {
        const existItem = cartItems.find((item) => item.id === productToAdd.id)
        if (existItem) {
            const newItems = cartItems.map(item => item == existItem ? { ...item, quantity: item.quantity + 1 } : item)
            setCartItems(newItems)
        } else {
            setCartItems([
                ...cartItems,
                {
                    ...productToAdd,
                    quantity: 1
                }]
            )
        }
    }



    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartItemCount }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}