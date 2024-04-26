import './News.css'
import { useState, useEffect } from 'react'
import Spinner from '../Spinner/Spinner'
import ProductCard from '../ProductCard/ProductCard'
import LittleSpinner from '../LittleSpinner/LittleSpinner'

const News = () => {
    const [newProducts, setNewProducts] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const getNews = async () => {
            try {
                const res = await fetch('https://localhost:44350/Database/GetNews')
                if(res.ok) {
                    const data = await res.json()
                    setNewProducts(data)
                }
            }
            catch(err) {
                console.log('Errore nel recupero dati:',err)
            }
        }
        setIsLoading(false)
        getNews()
    },[])

    return (
        <div id='newsContainer'>
            <h2>ULTIMI ARRIVI</h2>
            <div className='newProductsContainer'>
                {newProducts.length > 0 ? (newProducts.map(product => {
                    return <ProductCard key={product.ProductId} product={product}/>
                })) : <LittleSpinner/>}
            </div>
        </div>
    )
}

export default News