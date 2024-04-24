import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserAction } from '../../redux/actions'
import Cookies from 'js-cookie'
import Spinner from '../Spinner/Spinner'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setIsError] = useState(false)
    const [user, setUser] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loggedUser = useSelector((state) => state.user.user)

    useEffect(() => {
        const user = Cookies.get('user')
        if (user > 0) {
            navigate('/')
        }
    },[])

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        try {
            const res = await fetch(`https://localhost:44350/Database/GetUser?email=${email}&password=${password}`)
            if(res.ok) {
                let data = await res.json()
                if (data) {
                    dispatch(setUserAction(data))
                }
                if (Promise.all) {
                    setIsLoading(false)
                    setIsError(false)
                    Cookies.set('user', `${data.UserId}`, { sameSite: 'None', secure: true });
                    Cookies.set('userPsw', `${password}`, { sameSite: 'None', secure: true });
                    navigate('/')
                }
            }
            else {
                setIsError(true)
                setIsLoading(false)
            }
        }
        catch(err) {
            setIsError(true)
            setIsLoading(false)
            console.log(`Errore nel recupero dati: ${err}`)
        }
    }

    return (
        <>
        {isLoading ? <Spinner/> : ''}
        <div className='loginContainer'>
            <form className='loginForm' onSubmit={(e) => handleSubmit(e)}>
                <h1>Login</h1>
                {isError ? (
                <div className='errorLogin'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="loginAlert" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                    <h3>Le credenziali sono sbagliate</h3>
                </div>) : ''}
                <div className='loginFormGroup'>
                    <h3>Email</h3>
                    <input type="email" id="loginEmail" pattern=".+@(?:[^.]+\.)?(com|it)" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>
                <div className='loginFormGroup'>
                    <h3>Password</h3>                  
                    <input type='password' id='loginPassword' onChange={(e) => setPassword(e.target.value)} value={password} required/>
                </div>
                <button type='submit'>Accedi</button>
            </form>
            <Link to='/Register'>Non hai un'account? Clicca qui per registrarti</Link>
        </div>
        </>
    )
}

export default Login