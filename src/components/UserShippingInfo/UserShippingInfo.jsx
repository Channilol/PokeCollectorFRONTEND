import './UserShippingInfo.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserShippingInfo = () => {
    const [newPayment, setNewPayment] = useState({
        UserId: '',
        Address: '',
        ZipCode: '',
        City: '',
        Province: '',
        CardNumber: '',
        CardExpiringDate: '',
        CardCCV: '',
        IsActive: 'SI'
    })
    const [isError, setIsError] = useState(false)
    const loggedUser = useSelector((state) => state.user.user) 
    const navigate = useNavigate()

    useEffect(() => {
        if(loggedUser.UserId > 0){
            setNewPayment({...newPayment, UserId: loggedUser.UserId})
        }
    },[loggedUser])

    async function handleSubmit(e){
        e.preventDefault()
        if(newPayment.UserId > 0 && newPayment.Address !== '' && newPayment.ZipCode !== '' && newPayment.City !== '' && newPayment.Province !== '' && newPayment.CardNumber > 0 && newPayment.CardExpiringDate !== '' && newPayment.CardCCV > 0 && newPayment.IsActive === 'SI') {
            try {
                const res = await fetch('https://localhost:44350/Database/CreateShipmentInfo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newPayment)
                })
                if(res.ok) {
                    console.log('Metodo creato con successo')
                    navigate('/ProfilePage')
                }
            }
            catch(err){
                console.log('Errore con il backend',err)
            }
        }
        else {
            setIsError(true)
        }
    }

    return (
        <div className='paymentInfo'>
            {isError ? <p>Compila correttamente i dati!</p> : ''}
            <form className='newPaymentForm' onSubmit={(e) => {handleSubmit(e)}}>
                <h1>Aggiunti metodo di pagamento</h1>
                <div className='newPaymentFormGroup'>
                    <p>Indirizzo</p>
                    <input type='text' value={newPayment.Address} onChange={(e) => setNewPayment({...newPayment, Address: e.target.value})}/>
                </div>
                <div className='newPaymentFormGroup'>
                    <p>Codice Postale</p>
                    <input type='number' value={newPayment.ZipCode} onChange={(e) => setNewPayment({...newPayment, ZipCode: e.target.value})}/>
                </div>
                <div className='newPaymentFormGroup'>
                    <p>Città</p>
                    <input type='text' value={newPayment.City} onChange={(e) => setNewPayment({...newPayment, City: e.target.value})}/>
                </div>
                <div className='newPaymentFormGroup'>
                    <p>Provincia</p>
                    <input type='text' value={newPayment.Province} onChange={(e) => setNewPayment({...newPayment, Province: e.target.value})}/>
                </div>
                <div className='newPaymentFormGroup'>
                    <p>Numero carta</p>
                    <input type='number' value={newPayment.CardNumber} onChange={(e) => setNewPayment({...newPayment, CardNumber: e.target.value})}/>
                </div>
                <div className='newPaymentFormGroup'>
                    <p>Data scadenza carta</p>
                    <input type='text' value={newPayment.CardExpiringDate} onChange={(e) => setNewPayment({...newPayment, CardExpiringDate: e.target.value})}/>
                </div>
                <div className='newPaymentFormGroup'>
                    <p>CCV Carta</p>
                    <input type='number' value={newPayment.CardCCV} onChange={(e) => setNewPayment({...newPayment, CardCCV: e.target.value})}/>
                </div>
                <button className='addPaymentInfo'>Salva metodo di pagamento</button>
            </form>
        </div>
    )
}

export default UserShippingInfo