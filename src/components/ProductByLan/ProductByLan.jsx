import './ProductByLan.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../ProductCard/ProductCard'

const ProductByLan = () => {
    const [products, setProducts] = useState([])
    const [carteSingole, setCarteSingole] = useState([])
    const [boosterBox, setBoosterBox] = useState([])
    const [bustineSingole, setBustineSingole] = useState([])
    const [tins, setTins] = useState([])
    const [mazzi, setMazzi] = useState([])
    const [collezioniSpeciali, setCollezioniSpeciali] = useState([])
    const [eliteTrainer, setEliteTrainer] = useState([])
    let lanType = useParams()

    useEffect(() => {
        if(products.length > 0) {
            const carteSingoleArr = products.filter(p => p.CategoryId === 1 && p.PricePerUnit > 0)
            setCarteSingole(carteSingoleArr)
            const boosterBoxArr = products.filter(p => p.CategoryId === 2 && p.PricePerUnit > 0);
            setBoosterBox(boosterBoxArr)
            const bustineSingoleArr = products.filter(p => p.CategoryId === 3 && p.PricePerUnit > 0);
            setBustineSingole(bustineSingoleArr)
            const tinsArr = products.filter(p => p.CategoryId === 4 && p.PricePerUnit > 0);
            setTins(tinsArr)
            const mazziArr = products.filter(p => p.CategoryId === 5 && p.PricePerUnit > 0);
            setMazzi(mazziArr)
            const collezioniSpecialiArr = products.filter(p => p.CategoryId === 6 && p.PricePerUnit > 0);
            setCollezioniSpeciali(collezioniSpecialiArr)
            const eliteTrainerArr = products.filter(p => p.CategoryId === 7 && p.PricePerUnit > 0);
            setEliteTrainer(eliteTrainerArr)
        }
    },[products])

    useEffect(() => {
        GetProductsByLan()
    },[lanType.id])

    async function GetProductsByLan() {
        try {
            const res = await fetch(`https://localhost:44350/Database/GetProductByLan?type=${lanType.id}`)
            if(res.ok){
                const data = await res.json()
                if(data !== 0) {
                    setProducts(data)
                } else {
                    setProducts([])
                }
            }
        } catch (err) {
            console.log('Errore nel backend:', err)
        }
    }

    return (
    <div className='productByLanBg'>
        <div className='productByLan'>
            <h1>Prodotti {lanType.id}</h1>
            <div className='cardsByLan'>
                {products.length > 0 ? (<>
                <h2>Carte Singole</h2>
                <div className='cardByLanContainer'>
                    {carteSingole.length > 0 ? (carteSingole.map(c => {
                        return <ProductCard key={c.ProductId} product={c}/>
                    })) : <p>Nessun prodotto trovato.</p>}
                </div>
                <h2>Booster Box</h2>
                <div className='cardByLanContainer'>
                {boosterBox.length > 0 ? (boosterBox.map(c => {
                        return <ProductCard key={c.ProductId} product={c}/>
                    })) : <p>Nessun prodotto trovato.</p>}
                </div>
                <h2>Bustine Singole</h2>
                <div className='cardByLanContainer'>
                <div className='cardByLanContainer'>
                    {bustineSingole.length > 0 ? (bustineSingole.map(c => {
                            return <ProductCard key={c.ProductId} product={c}/>
                        })) : <p>Nessun prodotto trovato.</p>}
                </div>
                </div>
                <h2>Tins</h2>
                <div className='cardByLanContainer'>
                <div className='cardByLanContainer'>
                    {tins.length > 0 ? (tins.map(c => {
                            return <ProductCard key={c.ProductId} product={c}/>
                        })) : <p>Nessun prodotto trovato.</p>}
                </div>
                </div>
                <h2>Mazzi</h2>
                <div className='cardByLanContainer'>
                <div className='cardByLanContainer'>
                    {mazzi.length > 0 ? (mazzi.map(c => {
                            return <ProductCard key={c.ProductId} product={c}/>
                        })) : <p>Nessun prodotto trovato.</p>}
                </div>
                </div>
                <h2>Collezioni Speciali</h2>
                <div className='cardByLanContainer'>
                <div className='cardByLanContainer'>
                    {collezioniSpeciali.length > 0 ? (collezioniSpeciali.map(c => {
                            return <ProductCard key={c.ProductId} product={c}/>
                        })) : <p>Nessun prodotto trovato.</p>}
                </div>
                </div>
                <h2>Elite Trainer</h2>
                <div className='cardByLanContainer'>
                <div className='cardByLanContainer'>
                    {eliteTrainer.length > 0 ? (eliteTrainer.map(c => {
                            return <ProductCard key={c.ProductId} product={c}/>
                        })) : <p>Nessun prodotto trovato.</p>}
                </div>
                </div>
                </>) : <p>Non ci sono prodotti per questa lingua.</p>}
            </div>
        </div>
    </div>
    )
}

export default ProductByLan