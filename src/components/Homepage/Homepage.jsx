import './Homepage.css'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import HeroCarousel from '../HeroCarousel/HeroCarousel'
import News from '../News/News'

const Homepage = () => {
    const [userRole, setUserRole] = useState('')
    const navigate = useNavigate()
    const loggedUser = useSelector((state) => state.user.user) 

    useEffect(() => {window.scrollTo(0, 0);},[])

    useEffect(() => {
        if(loggedUser.Role === 'Admin') {
            setUserRole('Admin')
        }
        else if (loggedUser.Role === 'User') {
            setUserRole('User')
        }
        else (
            setUserRole('Guest')
        )
    },[loggedUser])
    
    return (
        <div className='homepageContainer'>
            <HeroCarousel/>
            <News/>
            <div className='infoSectionContainer'>
                <div className='infoSectionRed'>
                    <p>Spedizioni gratuite per ordini superiori a 90€!</p>
                </div>
                <div className='infoSectionBlue'>
                    <p>Spedizioni in tutta Europa entro 48h!</p>
                </div>
                <div className='infoSectionGreen'>
                    <p>Servizio pre e post vendita sempre accessibile!</p>
                </div>
            </div>
        </div>
    )
}

export default Homepage