import './ProfilePage.css'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
    const loggedUser = useSelector((state) => state.user.user) 
    const navigate = useNavigate()

    useEffect(() => {
        console.log(loggedUser)
    },[loggedUser])

    useEffect(() => {
        if(loggedUser === ''){
            navigate('/Login')
        }
    },[])

    return (
        <>
        <h1>Profile Page</h1>
        <p>Nome:{loggedUser.Name}</p>
        <p>Cognome: {loggedUser.Surname}</p>
        <p>Email: {loggedUser.Email}</p>
        </>
    )
}

export default ProfilePage