import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartItemCount } = useContext(CartContext)

    const toggleCartWindow = () => { setIsCartOpen(!isCartOpen) }


    return (
        <div className='cart-icon-container' onClick={toggleCartWindow}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartItemCount}</span>
        </div>
    )
}

export default CartIcon