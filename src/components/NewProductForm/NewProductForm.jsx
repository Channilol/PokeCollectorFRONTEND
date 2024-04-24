import './NewProductForm.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NewProductForm = () => {
    const [newProduct, setNewProduct] = useState({
        Name: '',
        PricePerUnit: 0,
        CategoryId: 0,
        Discount: 0,
        Language: 'IT',
        Image: '',
        Descrizione: '',
        Disponibilita: 'SI',
    })
    const [isError, setIsError] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const navigate = useNavigate()
    const loggedUser = useSelector((state) => state.user.user) 

    useEffect(() => {
        if(loggedUser.Role !== 'Admin') {
            navigate('/')
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(newProduct.Name !== '' && newProduct.PricePerUnit > 0 && newProduct.CategoryId > 0 && newProduct.Discount >= 0 && newProduct.Discount <= 100 && newProduct.Language !== '' && newProduct.Disponibilita === 'SI' || newProduct.Disponibilita === 'NO') {
            setIsError(false)
            try {
                const res = await fetch('https://localhost:44350/Database/AddProduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newProduct)
                })
                if(res.ok) {
                    setIsRegistered(true)
                    setNewProduct({
                        Name: '',
                        PricePerUnit: 0,
                        CategoryId: 0,
                        Discount: 0,
                        Language: 'IT',
                        Image: '',
                        Descrizione: '',
                        Disponibilita: 'SI',
                     })
                     setTimeout(() => {setIsRegistered(false)},5000)
                }
            }
            catch(err){
                setIsError(true)
                console.log('Errore nella registrazione del prodotto:', err)
            }
        }
        else {
            setIsError(true)
        }
    }

    return (
        <>
        <div className='newProductFormContainer'>
            <div className='backLinkDiv'>
                <Link to='/ProductsManagement' className='backLink'>Gestione Prodotti</Link>
                <p>&gt; <span>Nuovo Prodotto</span></p>
            </div>
            {isRegistered ? (<div className='registerSuccessAlert'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgba(0,0,0,0.5)" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                <p>Prodotto registrato con successo!</p>
            </div>) : ''}
            {isError ? (
                <div className='registerErrorAlert'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#7e1715" viewBox="0 0 16 16">
                        <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                    <p>Errore nella registrazione del prodotto</p>
                </div>
            ) : ''}
            <form className='newProductForm' onSubmit={(e) => {handleSubmit(e)}}>
                <h1>Nuovo prodotto</h1>
                <div className='newProductFormGroup'>
                    <p>
                    Nome
                    </p>
                    <input type='text' id='newProductName' value={newProduct.Name} onChange={(e) => {setNewProduct({...newProduct, Name: e.target.value})}} required/>
                </div>
                <div className='formCenter'>
                    <div className='formCenterLeft'>
                        <div className='newProductFormGroup'>
                            <p>
                            Prezzo
                            </p>
                            <input type='number' id='newProductPrice' className='inputPrice' value={newProduct.PricePerUnit} onChange={(e) => {setNewProduct({...newProduct, PricePerUnit: e.target.value})}} required/>
                        </div>
                        <div className='newProductFormGroup'>
                            <p> 
                            Sconto
                            </p>
                            <input type='number' id='newProductDiscount' className='inputPrice' value={newProduct.Discount} onChange={(e) => {setNewProduct({...newProduct, Discount: e.target.value})}} required/>
                        </div>
                    </div>
                    <div className='formCenterRight'>
                        <div className='newProductFormGroup'>
                            <p>
                            Categoria
                            </p>
                            <select name="productCategory" className="newProductSelect" onChange={(e) => {setNewProduct({...newProduct, CategoryId: e.target.value})}} required>
                                <option value="0">Scegli la categoria</option>
                                <option value="1">Carte Singole</option>
                                <option value="2">Booster Box</option>
                                <option value="3">Bustine Singole</option>
                                <option value="4">Tins</option>
                                <option value="5">Mazzi</option>
                                <option value="6">Collezioni Speciali</option>
                                <option value="7">Elite Trainer</option>
                            </select>
                        </div>
                        <div className='newProductFormGroup'>
                            <p>
                            Lingua
                            </p>
                            <select name="productCategory" className="newProductSelect" onChange={(e) => {setNewProduct({...newProduct, Language: e.target.value})}} required>
                                <option value=''>Scegli la lingua</option>
                                <option value="IT">Italiano</option>
                                <option value="EN">Inglese</option>
                                <option value="JP">Giapponese</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='editProductFormGroup'>
                    <p>Disponibilità</p>
                    <select name="productDisponibility" className="disponibilitySelect" onChange={(e) => {setNewProduct({...newProduct, Disponibilita: e.target.value})}} value={newProduct.Disponibilita} required>
                        <option value="SI" active>SI</option>
                        <option value="NO">NO</option>
                    </select>
                </div>
                <div className='editProductFormGroup'>
                    <p>
                    Descrizione
                    </p>
                    <input type='text' id='editProductDescription' value={newProduct.Descrizione} onChange={(e) => {setNewProduct({...newProduct, Descrizione: e.target.value})}}/>
                </div>
                <div className='newProductFormGroup'>
                    <p>
                    Immagine
                    </p>
                    <input type='text' id='newProductImage' value={newProduct.Image} onChange={(e) => {setNewProduct({...newProduct, Image: e.target.value})}}/>
                </div>
                <button className='createProductBtn' type='submit'>Crea</button>
            </form>
        </div>
        </>
    )
}

export default NewProductForm