import './UserOrders.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserOrders = () => {
    const [userOrders, setUserOrders] = useState('')
    const loggedUser = useSelector((state) => state.user.user) 
    const navigate = useNavigate()
    
    useEffect(() => {
        if(loggedUser !== '') {
            getUserOrders()
        }
    },[])

    async function getUserOrders() {
        try {
            const res = await fetch(`https://localhost:44350/Database/GetUserCarts?userId=${loggedUser.UserId}`)
            if(res.ok) {
                const data = await res.json()
                setUserOrders(data)
            }
        }
        catch(err) {
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
    <div className='userOrderBg'>
        <div className='userOrder'>
            <h1>Ordini utente</h1>
                {userOrders.length > 0 ? (<table>
                    <thead>
                        <tr>
                            <th>Ordine n.</th>
                            <th>Stato Ordine</th>
                            <th>Spesa Ordine</th>
                            <th>Data Ordine</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userOrders.map(order => {
                            return (<tr className='trOrders' key={order.CartId} onClick={() => navigate(`/Order/${order.CartId}`)}>
                                <td>{order.CartId}</td>
                                <td>{order.State}</td>
                                <td>€{order.TotalPrice}</td>
                                <td>{convertiDataUnixEpoch(order.Date)}</td>
                            </tr>)
                        })}
                        
                    </tbody>
            </table>) : <p>Non hai ancora fatto nessun ordine.</p>}
        </div>
    </div>
    )
}

export default UserOrders