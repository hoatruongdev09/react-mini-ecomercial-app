import './checkout-item.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

const CheckOutItem = ({ item }) => {

    const { addItemToCart, removeItemFromCart } = useContext(CartContext)

    const { name, imageUrl, price, quantity } = item

    const removeCartItem = () => {
        removeItemFromCart(item)
    }

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div onClick={() => addItemToCart(item, -1)} className='arrow'>&#10094;</div>
                <span className='value'> {quantity} </span>
                <div onClick={() => addItemToCart(item)} className='arrow'>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div onClick={removeCartItem} className='remove-button'>&#10005;</div>
        </div>
    )
}

export default CheckOutItem