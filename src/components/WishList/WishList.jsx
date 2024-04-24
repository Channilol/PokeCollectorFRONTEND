import './WishList.css'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import ProductCard from '../ProductCard/ProductCard'

const WishList = () => {
    const [wishList, setWishList] = useState([])
    const loggedUser = useSelector((state) => state.user.user)

    useEffect(() => {
        if(loggedUser.UserId > 0) {
            getWishList()
        }
    },[loggedUser])

    async function getWishList() {
        try {
            const res = await fetch(`https://localhost:44350/Database/GetWishlist?userId=${loggedUser.UserId}`)
            if(res.ok) {
                const data = await res.json()
                if(data !== 0) {
                    setWishList(data)
                }
            }
        } catch (err) {
            console.log('Errore nel backend:', err)
        }
    }

    return (
        <div className='wishListBg'>
            <div className='wishList'>
                <h1>Wish list</h1>
                <div>
                    {wishList.length > 0 ? (wishList.map(wish => {
                        return <ProductCard key={wish.ProductId} product={wish}/>
                    })) : <p>La tua Wish List è vuota.</p>}
                </div>
            </div>
        </div>
    )
}

export default WishList