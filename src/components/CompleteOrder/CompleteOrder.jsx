import './CompleteOrder.css'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const CompleteOrder = () => {
    const [newCartData, setNewCartData] = useState({
        CartId: 0,
        UserId: 0,
        State: 'IN ATTESA',
        TotalPrice: 0,
        Date: '',
    })
    const [finalPrice, setFinalPrice] = useState(0)
    const [shippingPrice, setShippingPrice] = useState(10)
    const [noShipment, setNoShipment] = useState(true)
    const [shipmentInfo, setShipmentInfo] = useState('')
    const user = Cookies.get('user');
    const userPsw = Cookies.get('userPsw')
    const loggedUser = useSelector((state) => state.user.user) 
    const navigate = useNavigate()

    useEffect(() => {
        if(loggedUser !== '') {
            getTotalPrice()
            getShipmentInfo()
            getCartData(loggedUser.UserId)
        }
    },[loggedUser])

    useEffect(() => {
        if(finalPrice > 0) {
            setNewCartData({...newCartData, TotalPrice: finalPrice})
        }
    },[finalPrice])

    async function getShipmentInfo() {
        if(loggedUser !== '') {
            try {
                const res = await fetch(`https://localhost:44350/Database/CheckShipmentInfo?userId=${loggedUser.UserId}`)
                if(res.ok){
                    const data = await res.json()
                    if (data !== null) {
                        setNoShipment(false)
                        setShipmentInfo(data)
                    }
                } else {
                    console.log('Errore nella fetch oppure no shipment data')
                }
            }
            catch(err) {
                console.log('Errore di connessione al backend:', err)
            }
        }
    }

    const getTotalPrice = async () => {
        try {
            const res = await fetch(`https://localhost:44350/Database/GetTotalPrice?userId=${loggedUser.UserId}`)
            if(res.ok) {
                const data = await res.json()
                if(data !== null) { 
                    if(data < 90) {
                        setFinalPrice(data + 10)
                    } else {
                        setShippingPrice(0)
                        setFinalPrice(data)
                    }
                }
            }
        }
        catch(err){
            console.log('Errore:', err)
        } 
    }

    async function getCartData(userId) {
        try {
            const res = await fetch(`https://localhost:44350/Database/CheckCart?userId=${userId}`)
            if(res.ok){
                const data = await res.json()
                if(data !== null) {
                    setNewCartData({... newCartData,
                        CartId: data.CartId,
                        UserId: data.UserId,
                        Date: data.Date,
                    })
                }
            }
        }
        catch(err){
            console.log('Errore nel backend:', err)
        }
    }

    async function handleCompleteOrder() {
        console.log(newCartData)
        if(newCartData.TotalPrice > 0){
            try {
                const res = await fetch(`https://localhost:44350/Database/ChangeCart`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newCartData)
                })
                if(res.ok){
                    GetUser(user, userPsw)
                    console.log('Ordine cambiato con successo')
                    navigate('/ProfilePage')
                } else {
                    console.log('Errore nella fetch PUT')
                }
            }
            catch(err){
                console.log('Errore nel backend:', err)
            }
        }
    }

    async function GetUser(userId, password){
        if(userId) {
          try {
            const res = await fetch(`https://localhost:44350/Database/CheckUser?id=${userId}&password=${password}`)
            if(res.ok) {
                console.log('Nuovo carrello creato')
            }
          }
          catch(err) {
            console.log(`Errore nel recupero dati: ${err}`)
          }
        }
      }

    return (
        <div className='completeOrderBg'>
            <div className='completeOrder'>
                <h1>Totale spesa ordini: €{finalPrice}</h1>
                <h1>Spesa di spedizione: €{shippingPrice}</h1>
                <h1>Spesa totale: €{finalPrice}</h1>
                <div className='shipmentInfos'>
                    {noShipment ? (<Link to='/AddUserShipmentInfo'>Non hai un metodo di pagamento impostato. Clicca qui per crearne uno.</Link>) : (<>
                    <h2>Dettagli pagamento:</h2>
                    <div className='shipmentInfoTxt'>
                        <p><span className='shipmentInfoTitle'>Indirizzo:</span> {shipmentInfo.Address}</p>
                        <p><span className='shipmentInfoTitle'>CAP:</span> {shipmentInfo.ZipCode}</p>
                        <p><span className='shipmentInfoTitle'>Città:</span> {shipmentInfo.City}</p>
                        <p><span className='shipmentInfoTitle'>Provincia:</span> {shipmentInfo.Province}</p>
                        <p><span className='shipmentInfoTitle'>Carta n. :</span> {shipmentInfo.CardNumber}</p>
                        <p><span className='shipmentInfoTitle'>Scadenza carta:</span> {shipmentInfo.CardExpiringDate}</p></div>
                    </>)}
                </div>
                {noShipment ? '' : <button className='completeOrderBtn' onClick={() => handleCompleteOrder()}>Completa l'ordine</button>}
            </div>
        </div>
    )
}

export default CompleteOrder