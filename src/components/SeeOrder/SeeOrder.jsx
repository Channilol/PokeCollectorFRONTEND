import './SeeOrder.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SeeOrder = () => {
    const [cartOrders, setCartOrders] = useState([])

    let CartId = useParams()

    useEffect(() => {
        console.log(CartId.id)
        if (CartId.id > 0) {
            getCartOrders(CartId.id)
        }
    },[CartId.id])

    async function getCartOrders(cartId) {
        try {
            const res = await fetch(`https://localhost:44350/Database/SeeCartOrders?cartId=${cartId}`)
            if(res.ok) {
                const data = await res.json()
                console.log(data)
                if(data !== null) {
                    setCartOrders(data)
                }
            }
        } catch (err) {
            console.log('Errore nel backend:', err)
        }
    }

    return (<>
    <div className='seeOrderBg'>
        <div className='seeOrder'>
            <button>Modifica ordine</button>
            <button>Elimina ordine</button>
        </div>
    </div>    
    </>)
}

export default SeeOrder