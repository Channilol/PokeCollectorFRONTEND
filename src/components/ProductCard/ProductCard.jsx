import './ProductCard.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const ProductCard = ({product}) => {
    const [isLiked, setIsLiked] = useState(false)
    const discountedPrice = Math.round((product.PricePerUnit - ((product.PricePerUnit * product.Discount) / 100)) * 100) / 100;
    const loggedUser = useSelector((state) => state.user.user) 
    const navigate = useNavigate()

    useEffect(() => {
        if(loggedUser.UserId > 0){
            checkWishList()
        }
    },[loggedUser])

    async function checkWishList() {
        try {
            const res = await fetch(`https://localhost:44350/Database/CheckWishList?userId=${loggedUser.UserId}&productId=${product.ProductId}`)
            if(res.ok) {
                const data = await res.json()
                if (data === 1) {
                    setIsLiked(true)
                }
            }
        } catch (err) {
            console.log('Errore nel backend:', err)
        }
    }

    async function addToWishList() {
        try {
            const res = await fetch(`https://localhost:44350/Database/AddToWishList?userId=${loggedUser.UserId}&productId=${product.ProductId}`)
            if(res.ok) {
                setIsLiked(true)
            }
        } catch (err) {
            console.log('Errore nel backend:', err)
        }
    }

    async function removeFromWishList() {
        try {
            const res = await fetch(`https://localhost:44350/Database/RemoveFromWishList?userId=${loggedUser.UserId}&productId=${product.ProductId}`, {
                method: 'DELETE'
            })
            if(res.ok) {
                setIsLiked(false)
            }
        } catch (err) {
            console.log('Errore nel backend:', err)
        }
    }
    
    const handleIsLiked = () => {
        if(isLiked) {
            removeFromWishList()
        } else {
            addToWishList()
        }
    }

    return (
        <div className='newProductCard' key={product.ProductId}>
            <div className='newProductCardImg' onClick={() => navigate(`/Product/${product.ProductId}`)}>
                <img src={product.Image} />
            </div>
            <div className='newProductCardText'>
                <p onClick={() => navigate(`/Product/${product.ProductId}`)}>{product.Name} ({product.Language})</p>
                <div className='newProductCardTextBot'>
                    <div className='newProductCardBotLeft'>
                        {product.Discount > 0 ? (<>
                        <p className='fullPrice'>€{product.PricePerUnit}</p>
                        <p className='discountedPrice'>€{discountedPrice}</p>
                        </>) : <p>€{product.PricePerUnit}</p>}
                    </div> 
                </div>
            </div>
            {loggedUser !== '' ? (<button className='likeBtn'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={isLiked ? 'heartBtn active' : 'heartBtn'} viewBox="0 0 16 16" onClick={() => handleIsLiked()}>
                    <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1"/>
                </svg>
            </button>) : ''}
            <button className='addBtn' onClick={() => navigate(`/Product/${product.ProductId}`)}>+ Aggiungi</button>
        </div>
    )
}

export default ProductCard