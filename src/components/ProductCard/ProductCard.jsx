import './ProductCard.css'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({product}) => {
    const discountedPrice = Math.round((product.PricePerUnit - ((product.PricePerUnit * product.Discount) / 100)) * 100) / 100;
    const navigate = useNavigate()
    
    return (
        <div onClick={() => navigate(`/Product/${product.ProductId}`)} className='newProductCard' key={product.ProductId}>
            <div className='newProductCardImg'>
                <img src={product.Image} />
            </div>
            <div className='newProductCardText'>
                <p>{product.Name} ({product.Language})</p>
                <div className='newProductCardTextBot'>
                    <div className='newProductCardBotLeft'>
                        {product.Discount > 0 ? (<>
                        <p className='fullPrice'>€{product.PricePerUnit}</p>
                        <p className='discountedPrice'>€{discountedPrice}</p>
                        </>) : <p>€{product.PricePerUnit}</p>}
                    </div> 
                </div>
            </div>
            <button className='addBtn'>+ Aggiungi</button>
        </div>
    )
}

export default ProductCard