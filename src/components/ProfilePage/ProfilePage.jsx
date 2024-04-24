import './ProfilePage.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
    const [shipmentInfo, setShipmentInfo] = useState()
    const [noShipment, setNoShipment] = useState(true)
    const loggedUser = useSelector((state) => state.user.user) 
    const navigate = useNavigate()

    useEffect(() => {
        if(loggedUser === ''){
            navigate('/Login')
        }
        getShipmentInfo()
    },[])

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

    return (
        <div className='profilePageBg'>
            <div className='profilePage'>
                <h1>Pagina profilo</h1>
                <p><span className='profileTitle'>Nome:</span>{loggedUser.Name}</p>
                <p><span className='profileTitle'>Cognome:</span> {loggedUser.Surname}</p>
                <p><span className='profileTitle'>Email:</span> {loggedUser.Email}</p>
                <p className='profileTitle'>Metodo di pagamento:</p>
                {noShipment ? (<p>Nessun metodo di pagamento impostato.</p>) : (<p>Metodo di pagamento attivo: {shipmentInfo.CardNumber}</p>)}
                <button onClick={() => navigate('/AddUserShipmentInfo')}>Aggiungi metodo di pagamento</button>
                <button onClick={() => navigate('/UserOrders')}>Visualizza i tuoi ordini</button>
            </div>
        </div>
    )
}

export default ProfilePage