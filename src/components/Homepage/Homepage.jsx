import './Homepage.css'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import HeroCarousel from '../HeroCarousel/HeroCarousel'

const Homepage = () => {
    const [userRole, setUserRole] = useState('')
    const navigate = useNavigate()
    const loggedUser = useSelector((state) => state.user.user) 

    useEffect(() => {
        console.log(loggedUser)
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
        </div>
    )
}

export default Homepage