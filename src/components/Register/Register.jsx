import './Register.css'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Register = () => {
    const [user, setUser] = useState({
        Email: '',
        Password: '',
        Name: '',
        Surname: '',
        Role: 'User',
        Image: ''
    })
    const [seconds, setSeconds] = useState(3)
    const [isError, setIsError] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const user = Cookies.get('user')
        if (user > 0) {
            navigate('/')
        }
    },[])

    useEffect(() => {
        let intervalId
        if(isRegistered) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1)
            }, 1000)
            setTimeout(() => {
                navigate('/Login')
            },3000)
        }
    },[isRegistered])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(user.Email !== '' && user.Password !== '' && user.Name !== '' && user.Surname !== '') {
            setIsError(false)
            try {
                const res = await fetch('https://localhost:44350/Database/RegisterUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                if(res.ok) {
                    setIsRegistered(true)
                }
            }
            catch(err){
                console.log('Errore nella registrazione:', err)
            }
        }
        else {
            setIsError(true)
        }
    }

    return (
        <>
        {isRegistered ? (<div className='registeredSuccess'>
            <div className='registeredSuccessText'>
                <h2>Registrazione effettuata con successo!</h2>
                <h4>Verrai reinderizzato al login in <span className='seconds'>{seconds}</span> secondi.</h4>
            </div>
        </div>) : ''}
        {isError ? (<div className='registerError'>
            <p>Compila tutti i campi per registrarti!</p>
        </div>) : ''}
        <div className="registerDiv">
            <form className='registerForm' onSubmit={(e) => handleSubmit(e)}>
                <h1>Registrazione</h1>
                <div className="registerFormGroup">
                    <h3>Email</h3>
                    <input type="email" id="registerEmail" pattern=".+@(?:[^.]+\.)?(com|it)" onChange={(e) => setUser({...user, Email: e.target.value})} value={user.Email} required />
                </div>
                <div className="registerFormGroup">
                    <h3>Password</h3>
                    <input type='password' id='registerPassword' onChange={(e) => setUser({...user, Password: e.target.value})} value={user.Password} required/>
                </div>
                <div className="registerFormGroup">
                    <h3>Nome</h3>
                    <input type='text' id='registerName' onChange={(e) => setUser({...user, Name: e.target.value})} value={user.Name} required />
                </div>
                <div className="registerFormGroup">
                    <h3>Cognome</h3>
                    <input type='text' id='registerSurname' onChange={(e) => setUser({...user, Surname: e.target.value})} value={user.Surname} required />
                </div>
                <button type='submit'>Registrati</button>
            </form>
            <Link to='/Login'>Hai già un'account? Clicca qui per accedere</Link>
        </div>
        </>
    )
}

export default Register