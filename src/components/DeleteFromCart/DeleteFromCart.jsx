import './DeleteFromCart.css'
import { useEffect } from 'react'

const DeleteFromCart = ({ product, handleDelete, refreshItems, refreshPrice, deletedOn }) => {
    
    const handleDeleteProduct = async () => {
        try {
            const res = await fetch(`https://localhost:44350/Database/DeleteOrder?orderId=${product.OrderId}`, {
                method: 'DELETE'
            })
            if(res.ok) {
                console.log('Prodotto eliminato')
            }
            else {
                console.log('Errore nella fetch delete')
            }
        }
        catch(err) {
            console.log('Errore con il backend:', err)
        }
    }

    return (
    <div className='cartDeleteAlertBg'>
        <div className='cartDeleteAlert'>
            <h1>Vuoi davvero eliminare: <br/>{product.Name} x{product.Quantity} dal carrello?</h1>
            <div className='cartDeleteBtns'>
                <button onClick={() => {
                    handleDeleteProduct()
                    handleDelete()
                    deletedOn()
                    refreshItems()
                    refreshPrice()
                }}>Si</button>
                <button onClick={handleDelete}>No</button>
            </div>
        </div>
    </div>
    )
}

export default DeleteFromCart