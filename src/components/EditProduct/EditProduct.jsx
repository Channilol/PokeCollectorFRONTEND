import './EditProduct.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const EditProduct = () => {
    const { id } = useParams()
    const [product, setProduct] = useState({
        ProductId: id,
        Name: '',
        PricePerUnit: 0,
        CategoryId: 0,
        Discount: 0,
        Language: '',
        Image: ''
    })
    const [isError, setIsError] = useState(false)
    const [isEdited, setIsEdited] = useState(false)
    const [seconds, setSeconds] = useState(3)
    const navigate = useNavigate()
    const loggedUser = useSelector((state) => state.user.user) 

    useEffect(() => {
        if(loggedUser.Role !== 'Admin') {
            navigate('/')
        }
    },[])

    useEffect(() => {
        let intervalId
        if(isEdited) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1)
            }, 1000)
            setTimeout(() => {
                navigate('/ProductsManagement')
            },3000)
        }
    },[isEdited])

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await fetch(`https://localhost:44350/Database/GetProduct?productId=${id}`)
                if(res.ok) {
                    const data = await res.json()
                    if (data !== null) {
                        setProduct(data)
                    }
                }
            }
            catch(err){
                console.log('Errore nella fetch GET prodotto:', err)
            }
        }
        getProduct()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('https://localhost:44350/Database/EditProduct', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            if(res.ok) {
                setIsEdited(true)
            }
        }
        catch(err){
            setIsError(true)
            console.log('Errore nella fetch POST prodotto:', err)
        }
    }

    return (
        <div className='editProductDiv'>
            <div className='backLinkDiv'>
                <Link to='/ProductsManagement' className='backLink'>Gestione Prodotti</Link>
                <p>&gt; <span>Modifica Prodotto</span></p>
            </div>
            {isEdited ? (<div className='editSuccess'>
            <div className='editSuccessText'>
                <h2>Prodotto modificato con successo</h2>
                <h4>Verrai reinderizzato in <span className='seconds'>{seconds}</span> secondi.</h4>
            </div>
            </div>) : ''}
            <form className='editProductForm' onSubmit={(e) => {handleSubmit(e)}}>
                <h1>Modifica Prodotto</h1>
                <div className='editProductFormGroup'>
                    <p>
                        Nome:
                    </p>
                    <input type='text' value={product.Name} onChange={(e) => {setProduct({...product, Name: e.target.value})}}/>
                </div>
                <div className='editFormCenter'>
                    <div className='editFormCenterLeft'>
                        <div className='editProductFormGroup'>
                            <p>
                            Prezzo
                            </p>
                            <input type='number' id='editProductPrice' className='inputPrice' value={product.PricePerUnit} onChange={(e) => {setProduct({...product, PricePerUnit: e.target.value})}} required/>
                        </div>
                        <div className='editProductFormGroup'>
                            <p> 
                            Sconto
                            </p>
                            <input type='number' id='editProductDiscount' className='inputPrice' value={product.Discount} onChange={(e) => {setProduct({...product, Discount: e.target.value})}} required/>
                        </div>
                    </div>
                    <div className='editFormCenterRight'>
                        <div className='editProductFormGroup'>
                            <p>
                            Categoria
                            </p>
                            <select name="productCategory" className="editProductSelect" onChange={(e) => {setProduct({...product, CategoryId: e.target.value})}} value={product.CategoryId} required>
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
                        <div className='editProductFormGroup'>
                            <p>
                            Lingua
                            </p>
                            <select name="productCategory" className="editProductSelect" onChange={(e) => {setProduct({...product, Language: e.target.value})}} value={product.Language} required>
                                <option value=''>Scegli la lingua</option>
                                <option value="IT">Italiano</option>
                                <option value="EN">Inglese</option>
                                <option value="JP">Giapponese</option>
                            </select>
                        </div>
                    </div>
                    </div>
                <div className='editProductFormGroup'>
                    <p>
                    Immagine
                    </p>
                    <input type='text' id='editProductImage' value={product.Image} onChange={(e) => {setProduct({...product, Image: e.target.value})}}/>
                </div>
                <button className='createProductBtn' type='submit'>Modifica</button>
            </form>
        </div>
    )
}

export default EditProduct