import './OrdersManagement.css'
import { useState, useEffect } from 'react'
import LittleSpinner from '../LittleSpinner/LittleSpinner'
import { Link, useNavigate } from 'react-router-dom'

const OrdersManagement = () => {
    const [allOrders, setAllOrders] = useState([])
    const [areOrdersOn, setAreOrdersOn] = useState(false)
    const navigate = useNavigate()

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
            <div className='ordersInAttesa'>
                <h1>In attesa</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Ordine n.</th>
                            <th>Spesa Ordine</th>
                            <th>Data Ordine</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {allOrders.map(order => {
                            if(order.State === 'IN ATTESA'){
                                return <tr className='trOrders' key={order.CartId} onClick={() => navigate(`/SeeOrder/${order.CartId}`)}>
                                    <td>{order.CartId}</td>
                                    <td>€{order.TotalPrice}</td>
                                    <td>{convertiDataUnixEpoch(order.Date)}</td>
                                </tr>
                            }
                        })}
                    </tbody>
                </table>
            </div>
            <div className='ordersInLavorazione'>
                <h1>In lavorazione</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Ordine n.</th>
                            <th>Spesa Ordine</th>
                            <th>Data Ordine</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {allOrders.map(order => {
                            if(order.State === 'IN LAVORAZIONE'){
                                return <tr className='trOrders' key={order.CartId} onClick={() => navigate(`/SeeOrder/${order.CartId}`)}>
                                    <td>{order.CartId}</td>
                                    <td>€{order.TotalPrice}</td>
                                    <td>{convertiDataUnixEpoch(order.Date)}</td>
                                </tr>
                            }
                        })}
                    </tbody>
                </table>
            </div>
            <div className='ordersSpediti'>
                <h1>Spediti</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Ordine n.</th>
                            <th>Spesa Ordine</th>
                            <th>Data Ordine</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {allOrders.map(order => {
                            if(order.State === 'SPEDITO'){
                                return <tr className='trOrders' key={order.CartId} onClick={() => navigate(`/SeeOrder/${order.CartId}`)}>
                                    <td>{order.CartId}</td>
                                    <td>€{order.TotalPrice}</td>
                                    <td>{convertiDataUnixEpoch(order.Date)}</td>
                                </tr>
                            }
                        })}
                    </tbody>
                </table>
            </div>
            <div className='ordersConsegnati'>
                <h1>Consegnati</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Ordine n.</th>
                            <th>Spesa Ordine</th>
                            <th>Data Ordine</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {allOrders.map(order => {
                            if(order.State === 'CONSEGNATO'){
                                return <tr className='trOrders' key={order.CartId} onClick={() => navigate(`/SeeOrder/${order.CartId}`)}>
                                    <td>{order.CartId}</td>
                                    <td>€{order.TotalPrice}</td>
                                    <td>{convertiDataUnixEpoch(order.Date)}</td>
                                </tr>
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}

export default OrdersManagement