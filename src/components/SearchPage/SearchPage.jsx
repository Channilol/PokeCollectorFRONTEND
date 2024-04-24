import './SearchPage.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LittleSpinner from '../LittleSpinner/LittleSpinner'
import ProductCard from '../ProductCard/ProductCard'

const SearchPage = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    let srcInput = useParams()

    useEffect(() => {
        GetProductsBySrc()
    },[srcInput])

    async function GetProductsBySrc() {
        setIsLoading(true)
        try {
            const res = await fetch(`https://localhost:44350/Database/GetProductBySearch?input=${srcInput.id}`)
            if(res.ok){
                const data = await res.json()
                if(data !== 0) {
                    setProducts(data)
                } else {
                    setProducts([])
                }
            }
            setIsLoading(false)
        } catch (err) {
            console.log('Errore nel backend:', err)
            setIsLoading(false)
        }
    }

    return (
        <>
        <div className='srcPageBg'>
        {isLoading ? <LittleSpinner/> : (
            <div className='srcPage'>
                <h1>Ricerca: {srcInput.id}</h1>
                <div className='srcCards'>
                    {products.length > 0 ? (products.map(p => {
                        return <ProductCard key={p.ProductId} product={p}/>
                    })) : <p>Nessun prodotto trovato.</p>}
                </div>
            </div>
        )}
        </div>
        </>
    )
}

export default SearchPage