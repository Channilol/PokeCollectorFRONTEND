import './ProductPage.css'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import Cookies from 'js-cookie'

const ProductPage = () => {
    const [product, setProduct] = useState()
    const [discountedPrice, setDiscountedPrice] = useState(0)
    const [finalPrice, setFinalPrice] = useState(0)
    const [isAdded, setIsAdded] = useState(false)
    const [seconds, setSeconds] = useState(3)
    const [newOrder, setNewOrder] = useState({
        ProductId: 0,
        Quantity: 1,
        Price: 0,
        CartId: 0
    })
    let productId = useParams()
    const navigate = useNavigate()
    const loggedUser = useSelector((state) => state.user.user) 
    const userPsw = Cookies.get('userPsw')

    useEffect(() => {
        window.scrollTo(0, 0);
        if (productId.id > 0) {
            getProduct()
            getCartId()
        }
        async function getProduct() {
            try{
                const res = await fetch(`https://localhost:44350/Database/GetProduct?productId=${productId.id}`)
                if(res.ok){
                    const data = await res.json()                  
                    setProduct(data)
                }
            }
            catch(err){
                console.log('Errore nella fetch:',err)
            }
        }
        async function getCartId() {
            if (loggedUser !== '') {
                try {
                    const res = await fetch(`https://localhost:44350/Database/CheckCart?userId=${loggedUser.UserId}`)
                    if(res.ok) {
                        const data = await res.json()
                        if (data !== null) {
                            setNewOrder({...newOrder, CartId: data.CartId})
                        } 
                    }
                }
                catch(err) {
                    console.log('Errore nel recupero carrello:', err)
                }
            }
        }
    },[])

    useEffect(() => {
        if(product !== undefined) { 
            const fullPrice = product.PricePerUnit
            const discount = product.Discount
            if(discount > 0) {
                const discountApplied = Math.round((product.PricePerUnit - ((product.PricePerUnit * product.Discount) / 100)) * 100) / 100;
                setDiscountedPrice(discountApplied)
                setNewOrder({...newOrder, Price: discountApplied})
            } else {
                setDiscountedPrice(fullPrice)
                setNewOrder({...newOrder, Price: fullPrice})
            }
        }
        if(product !== undefined) {
            setNewOrder(prevOrder => ({...prevOrder, ProductId: product.ProductId}))
        }
    },[product])

    const handleMinusQuantity = () => {
        if(newOrder.Quantity > 1) {
            setNewOrder({...newOrder, Quantity: newOrder.Quantity - 1})    
        }
    }

    const handlePlusQuantity = () => {
        if(newOrder.Quantity < 99) {
            setNewOrder({...newOrder, Quantity: newOrder.Quantity + 1})
        }
    }

    useEffect(() => {
        setFinalPrice(Math.round((newOrder.Quantity * discountedPrice) * 100) / 100)
    },[newOrder.Quantity])
    
    useEffect(() => {
        setNewOrder(prevState => ({...prevState, Price: finalPrice}))
    },[finalPrice])

    async function handleSubmit(e) {
        e.preventDefault()
        setNewOrder({...newOrder, ProductId: product.ProductId, Price: finalPrice})
        if(newOrder.ProductId > 0 && newOrder.Quantity > 0 && newOrder.Price > 0 && newOrder.CartId > 0) {
            try {
                const res = await fetch ('https://localhost:44350/Database/AddOrder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newOrder)
                })
                if(res.ok) {
                    setIsAdded(true)
                } else {
                    console.log('Errore nei dati')
                }
            }
            catch(err) {
                console.log('Errore nella registrazione dati:', err)
            }
        }
    }

    useEffect(() => {
        let intervalId
        if(isAdded) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1)
            }, 1000)
            setTimeout(() => {
                navigate('/')
            },3000)
        }
    },[isAdded])

    return (
        <>
        {isAdded ? (<div className='registeredSuccess'>
            <div className='registeredSuccessText'>
                <h2>Prodotto aggiunto al carrello!</h2>
                <h4>Verrai reinderizzato alla home <span className='seconds'>{seconds}</span> secondi.</h4>
            </div>
        </div>) : ''}
        <div className='productPage'>
            {product !== undefined ? (<>
            <h1>{product.Name}</h1>
            <div>
                <div className='productPageLeft'>
                    <img src={product.Image}/>
                </div>
                <div className='productPageRight'>
                    <p><span className='categoryTitle'>Descrizione:</span> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta facere voluptates harum ipsa blanditiis illum, animi impedit modi adipisci tempora, laboriosam itaque voluptatem omnis est earum dignissimos pariatur totam consequuntur!</p>
                    <p><span className='categoryTitle'>Lingua:</span> {product.Language}</p>
                    <p><span className='categoryTitle'>Disponibilità:</span> Si</p>
                    <p><span className='categoryTitle'>Prezzo per unità:</span> {product.Discount > 0 ? (<><span className='fullPriceProduct'>€{product.PricePerUnit}</span> <span className='discountedProduct'>€{discountedPrice}</span></>) : `€${product.PricePerUnit}`}</p>
                    <div className='productPageBot'>
                        <p className='categoryTitle'>Quantità:</p>
                        <button className='minusQuantity' onClick={() => handleMinusQuantity()}>-</button>
                        <input className='inputQuantity' type='number' value={newOrder.Quantity} min={1} max={99} onChange={(e) => {
                            const newValue = parseInt(e.target.value, 10);
                            if (newValue >= 1 && newValue <= 99) {
                                setNewOrder({...newOrder, Quantity: newValue})
                            }
                            }}/>
                        <button className='plusQuantity' onClick={() => {handlePlusQuantity()}}>+</button>
                    </div>
                    <p className='finalPrice'>
                        <span className='categoryTitle'>
                            Prezzo finale: 
                        </span>
                        €{finalPrice > 0 ? finalPrice : discountedPrice}
                    </p>
                    <button className='buyBtn' onClick={(e) => {
                        setNewOrder({...newOrder, ProductId: product.ProductId, Price: finalPrice})
                        handleSubmit(e)
                        }}>
                        Compra
                    </button>
                </div>
            </div>
            </>) : <Spinner/>}
        </div>
        </>
    )
}

export default ProductPage