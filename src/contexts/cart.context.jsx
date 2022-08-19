import { createContext, useState, useEffect } from 'react'


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    cartItemCount: 0
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartItemCount, setCartItemCount] = useState(0)

    useEffect(() => {
        setCartItemCount(cartItems.reduce((total, item) => total + item.quantity, 0))
    }, [cartItems])


    const addItemToCart = (productToAdd, count = 1) => {
        const existItem = cartItems.find((item) => item.id === productToAdd.id)
        if (existItem) {
            if (existItem.quantity + count <= 0) {
                removeItemFromCart(productToAdd)
                return
            }
            const newItems = cartItems.map(item => item == existItem ? { ...item, quantity: item.quantity + count } : item)
            setCartItems(newItems)
        } else {
            setCartItems([
                ...cartItems,
                {
                    ...productToAdd,
                    quantity: count
                }]
            )
        }
    }
    const removeItemFromCart = (productToRemove) => {
        const newItems = cartItems.filter(item => item.id != productToRemove.id)
        setCartItems(newItems)
    }



    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartItemCount, removeItemFromCart }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}