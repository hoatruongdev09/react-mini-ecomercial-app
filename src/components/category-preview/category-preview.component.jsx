import './category-preview.styles.scss'
import ProductCard from '../product-card/product-card.component'
import { Link } from "react-router-dom";
const CategoryPreview = ({ title, items }) => {


    return (
        <div className='category-preview-container'>
            <Link to={`${title}`}>
                <h2> <span className='title'>{title.toUpperCase()}</span></h2>
            </Link>
            <div className='products-container'>
                {
                    items.filter((_, index) => index < 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default CategoryPreview