import './cart-dropdown.styles.scss'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { CartContext } from '../../contexts/cart.context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'


const CartDropdown = () => {
    const { cartItems, setIsCartOpen } = useContext(CartContext)
    const navigate = useNavigate()

    const goToCheckOut = () => {
        setIsCartOpen(false)
        navigate('checkout')
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.length == 0 ? (
                        <span>No product in cart</span>
                    ) : (
                        cartItems.map(item => (
                            <CartItem key={item.id} cartItem={item} />
                        ))
                    )
                }
            </div>
            <Button onClick={goToCheckOut}>
                CHECKOUT
            </Button>
        </div>
    )
}

export default CartDropdown