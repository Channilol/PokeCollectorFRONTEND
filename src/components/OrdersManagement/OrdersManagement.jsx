import './OrdersManagement.css'
import { useState, useEffect } from 'react'

const OrdersManagement = () => {
    const [allOrders, setAllOrders] = useState([])
    const [areOrdersOn, setAreOrdersOn] = useState(false)

    useEffect(() => {
        getAllOrders()
    },[])

    useEffect(() => {
        if(allOrders.length > 0) {
            setAreOrdersOn(true)
        }
    },[allOrders])

    async function getAllOrders() {
        try {
            const res = await fetch('https://localhost:44350/Database/GetAllCarts')
            if(res.ok) {
                const data = await res.json()
                if (data.length > 0) {
                    setAllOrders(data)
                }
            }
        }
        catch (err) {
            console.log('Errore nel backend:', err)
        }
    }

    function convertiDataUnixEpoch(timestamp) {
        var data = new Date(parseInt(timestamp.substr(6)));

        var giorno = ('0' + data.getDate()).slice(-2); 
        var mese = ('0' + (data.getMonth() + 1)).slice(-2); 
        var anno = data.getFullYear();
        var ore = ('0' + data.getHours()).slice(-2); 
        var minuti = ('0' + data.getMinutes()).slice(-2); 
        var secondi = ('0' + data.getSeconds()).slice(-2); 

        var dataFormattata = giorno + '-' + mese + '-' + anno;
        var oraFormattata = ore + ':' + minuti + ':' + secondi;

        return dataFormattata + ' ' + oraFormattata;
    }

    return (
    <div className='ordersManagementBg'>
        <div className='ordersManagement'>
            {areOrdersOn ? (<>
                <h1>In attesa:</h1>
            <ul>
                {allOrders.map(order => {
                    if(order.State === 'IN ATTESA') {
                        return <li>Ordine n.:{order.CartId} | Stato: {order.State} | Spesa totale: {order.Price} | Data ordine: {convertiDataUnixEpoch(order.Date)}</li>
                    }
                })}
            </ul>
            <h1>In lavorazione:</h1>
            <ul>
                {allOrders.map(order => {
                    if(order.State === 'IN LAVORAZIONE') {
                        return <li>Ordine n.:{order.CartId} | Stato: {order.State} | Spesa totale: {order.Price} | Data ordine: {convertiDataUnixEpoch(order.Date)}</li>
                    }
                })}
            </ul>
            <h1>Spediti:</h1>
            <ul>
                {allOrders.map(order => {
                    if(order.State === 'SPEDITO') {
                        return <li>Ordine n.:{order.CartId} | Stato: {order.State} | Spesa totale: {order.Price} | Data ordine: {convertiDataUnixEpoch(order.Date)}</li>
                    }
                })}
            </ul>
            <h1>Consegnati:</h1>
            <ul>
                {allOrders.map(order => {
                    if(order.State === 'CONSEGNATO') {
                        return <li>Ordine n.:{order.CartId} | Stato: {order.State} | Spesa totale: {order.Price} | Data ordine: {convertiDataUnixEpoch(order.Date)}</li>
                    }
                })}
            </ul>
            <h1>Resi:</h1>
            <ul>
                {allOrders.map(order => {
                    if(order.State === 'RESO') {
                        return <li>Ordine n.:{order.CartId} | Stato: {order.State} | Spesa totale: {order.Price} | Data ordine: {convertiDataUnixEpoch(order.Date)}</li>
                    }
                })}
            </ul>
            </>) : ''}
        </div>
    </div>
    )
}

export default OrdersManagement