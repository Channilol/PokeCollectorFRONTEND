import './ProductsManagement.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const ProductsManagement = () => {
    const [products, setProducts] = useState([])
    const [isDeleting, setIsDeleting] = useState(false)
    const [deletingId, setDeletingId] = useState(0)
    const [productIndex, setProductIndex] = useState(1)
    const [isDeleted, setIsDeleted] = useState(false)
    const navigate = useNavigate()
    const loggedUser = useSelector((state) => state.user.user) 
    
    const getProducts = async () => {
        const produtsArray = []
        try {
            const res = await fetch('https://localhost:44350/Database/GetAllProducts')
            if(res.ok){
                const data = await res.json()
                if(data.length > 0) {
                    data.forEach(product => {
                        produtsArray.push(product)
                    });
                }
                setProducts(produtsArray)
            }
        }
        catch(err){
            console.log('Errore nella fetch:',err)
        }
    }
    
    const deleteProduct = async (productId) => {
        try {
            const res = await fetch(`https://localhost:44350/Database/DeleteProduct?id=${productId}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                setIsDeleting(false)
                setDeletingId(0)
                setIsDeleted(true)
                getProducts()
                setTimeout(() => {setIsDeleted(false)},5000)
            }
        }
        catch(err){
            setIsDeleted(false)
            console.log('Errore nella fetch:',err)
        }
    }
    
    useEffect(() => {
        getProducts()
        if(loggedUser.Role !== 'Admin') {
            navigate('/')
        }
    },[])

    useEffect(() => {
        if(isDeleting) {
            window.scrollTo(0, 0);
        }
    },[isDeleting])

    return (
    <div className='productsManagementContainer'>
            {isDeleting ? (<div className='deletingProduct'>
            <div className='deletingProductText'>
                <h2>Sei sicuro di voler eliminare {products[productIndex].Name} ?</h2>
                <button onClick={() => {deleteProduct(deletingId)}}>Si</button>
                <button onClick={() => setIsDeleting(false)}>No</button>
            </div>
            </div>) : ''}
        <div className='productsManagement'>
            <h1>Gestione Prodotti</h1>
            <button className='createBtn' onClick={() => navigate('/NewProductForm')}>Crea nuovo prodotto</button>
            {isDeleted ? (<div className='deletedProductSuccess'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgba(0,0,0,0.5)" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
            <p>Prodotto eliminato con successo</p>
            </div>) : ''}
            <h2>Lista prodotti</h2>
            <div className='managementCardContainer'>
                {products.length > 0 ? products.map(product => {
                    return <div key={product.ProductId} className='managementCard'>
                        <img src={product.Image}/>
                        <div className='managementCardText'>
                            <p>Nome: {product.Name}</p>
                            <p>{product.Type} - {product.Language}</p>                     
                        </div>
                        <div className='managementCardPrice'>
                            <p>Sconto: {product.Discount}%</p>
                            <p>Prezzo: {product.PricePerUnit}€</p>
                        </div>  
                        <div className='managementCardEdit'>
                            <button onClick={() => navigate(`/EditProduct/${product.ProductId}`)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgba(255,255,255,0.8)" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg>
                            </button>
                            <button onClick={() => {
                                setIsDeleting(true)
                                setDeletingId(product.ProductId)
                                const deletingProductIndex = products.findIndex((item) => item.ProductId === product.ProductId)
                                setProductIndex(deletingProductIndex)
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgba(255,255,255,0.8)" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                </svg>
                            </button>
                        </div>  
                    </div>
                }) : ''}
            </div>
        </div>
    </div>
    )
}

export default ProductsManagement