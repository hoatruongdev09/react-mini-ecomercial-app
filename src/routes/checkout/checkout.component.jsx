import './checkout.styles.scss'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

// import CART_ITEM from '../../cart-data.json'

const CheckOut = () => {
    const { cartItems } = useContext(CartContext)

    const calculateCartTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + item.quantity * item.price
        }, 0)
    }
    const total = calculateCartTotal()
    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map(item => (
                    <CheckoutItem key={item.id} item={item} />
                ))
            }
            <span className='total'>
                Total: {total == 0 ? '0' : `$${total}`}
            </span>
        </div>
    )
}

export default CheckOut