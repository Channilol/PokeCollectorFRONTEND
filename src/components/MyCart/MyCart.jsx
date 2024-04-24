import './MyCart.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DeleteFromCart from '../DeleteFromCart/DeleteFromCart'

const MyCart = () => {
    const [cart, setCart] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)
    const [isEmpty, setIsEmpty] = useState(true)
    const [deletingItem, setDeletingItem] = useState()
    const [isDeleting, setIsDeleting] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const loggedUser = useSelector((state) => state.user.user) 
    const navigate = useNavigate()

    useEffect(() => {
        if(loggedUser === ''){
            navigate('/Login')
        } else {
            if(loggedUser.UserId > 0) {
                getCartItems()  
                getTotalPrice()                 
            }
        }
    },[])

    const getCartItems = async () => {
        try {
            const res = await fetch(`https://localhost:44350/Database/GetCartItems?userId=${loggedUser.UserId}`)
            if(res.ok) {
                const data = await res.json()
                if(data !== null) {
                    setIsEmpty(false)
                    setCart(data)
                }else(
                    setIsEmpty(true)
                )
            }
        }
        catch(err){
            console.log('Errore:', err)
        }
    }

    const getTotalPrice = async () => {
        try {
            const res = await fetch(`https://localhost:44350/Database/GetTotalPrice?userId=${loggedUser.UserId}`)
            if(res.ok) {
                const data = await res.json()
                if(data !== null) {
                    setTotalPrice(data)
                }
            }
        }
        catch(err){
            console.log('Errore:', err)
        } 
    }

    const handleDelete = (order) => {
        setDeletingItem(order)
        if(isDeleting) {
            setIsDeleting(false)
        } else {
            setIsDeleting(true)
        }
    }

    const deletingCard = () => {
        if(cart.length > 0) {
            const updatedCart = cart.filter(order => order.OrderId !== deletingItem.OrderId)
            setCart(updatedCart)
        }
    }

    const refreshTotPrice = () => {
        if (totalPrice > 0) {
            setTotalPrice(totalPrice - deletingItem.Price)
        }
    }

    const deletedAlert = () => {
        setIsDeleted(true)
        setTimeout(() => {setIsDeleted(false)},5000)
    }

    return (
        <>
        <div className='cartContainer'>
            {isDeleted ? (<div className='deletedCartProductSuccess'>
                <h3>Il prodotto è stato eliminato dal carrello.</h3>
            </div>) : ''}
            <h1>Carrello</h1>
            {isEmpty ? <p>Carrello vuoto</p> : 
            (<>
                <div className='cartCardsContainer'>
                    {cart.length > 0 ? (cart.map(order => {
                        return (
                        <div className='cartCard' key={order.OrderId}>
                            <div className='cartCardTop'>
                                <div className='cartCardImgDiv'>
                                    <img src={order.Image} />
                                </div>
                                <div className='cartCardText'>
                                    <p className='cartCardName'>{order.Name} ({order.Language})</p>
                                    <p className='cartCardPrice'><span>Quantità: x{order.Quantity}</span> Prezzo: €{order.Price}</p>
                                </div>
                            </div>
                            <div className='cartCardBottom'>
                                <button className='cardCardEdit'>Modifica quantità</button>
                                <button className='cardCardDelete' onClick={() => {
                                    handleDelete(order)
                                    console.log(order)}}>Elimina</button>
                            </div>
                        </div>)
                    })) : <p className='emptyCart'>Il tuo carrello è vuoto.</p>}
                </div>
                <div className='cartTotalPrice'>
                    <h2>Prezzo totale:</h2>
                    <p>€{totalPrice}</p>
                    {totalPrice > 0 ? <button onClick={() => navigate('/CompleteOrder')}>Prosegui con l'ordine</button> : ''}
                </div>
            </>
        )}
        </div>
        {isDeleting ? <DeleteFromCart product={deletingItem} handleDelete={handleDelete} refreshItems={deletingCard} refreshPrice={refreshTotPrice} deletedOn={deletedAlert}/> : ''}
        </>
    )
}

export default MyCart