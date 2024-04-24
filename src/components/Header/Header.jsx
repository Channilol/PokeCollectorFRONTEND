import './Header.css'
import Cookies from 'js-cookie'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setUserAction } from '../../redux/actions'
import PokeBall from '../../assets/image/Poké_Ball_icon.svg.png'
import HeaderNav from '../HeaderNav/HeaderNav'

const Header = () => {
    const [isLogged, setIsLogged] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [searchTxt, setSearchTxt] = useState('')
    const loggedUser = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname === '/Login' || location.pathname === '/Register') {
            setIsLogin(true)
        }
        else {
            setIsLogin(false)
        }
    },[location])

    useEffect(() => {
        if(loggedUser !== '') {
            const user = Cookies.get('user');
            if (user && user > 0) {
                setIsLogged(true)
            }
            else {
                setIsLogged(false)
            }
        }
    },[loggedUser])

    function Logout(){
        const user = Cookies.get('user')
        if (user && user > 0){
            dispatch(setUserAction(''))
            Cookies.remove('user') 
            Cookies.remove('userPsw')
            setIsLogged(false)
            navigate('/')      
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(searchTxt !== '') {
            navigate(`/SearchPage/${searchTxt}`)
            setSearchTxt('')
        }
    }

    return (
        <>
            <header>
                <div className='headerLeft'>
                    <Link className='headerLogo' to ='/'>
                        <img src={PokeBall} alt='PokéCollectorLogo'></img>
                        <h2>
                            <div>Poké</div>
                            <div>Collector</div>
                        </h2>
                    </Link>
                </div>
                <div className='headerCenter'>
                    <div className='searchInputDiv'>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <input type='text' placeholder='Cerca tra i prodotti' value={searchTxt} onChange={(e) => {setSearchTxt(e.target.value)}}></input>
                        </form>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </div>
                </div>
                <div className='headerRight'>
                    {loggedUser.Role === 'Admin' ? (
                        <div className='adminIcon'>
                            <Link to='/Management'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1"/>
                                </svg>
                                <p>Admin</p>
                            </Link>
                        </div>) : ''}
                    {isLogged ? 
                    (<div className='ifUserIsLogged'>
                        <Link to='/ProfilePage'>
                            <div className='profilePic'>
                                {loggedUser.Image !== null ? <img src={loggedUser.Image} alt='profilePic' /> : 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                </svg>}
                            </div>
                        </Link>
                        <Link to='/Cart'>
                            <svg xmlns="http://www.w3.org/2000/svg"  className="cartIcon" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2M5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0z"/>
                            </svg>
                        </Link>
                    </div>)
                    : ''}
                    <ul className='headerBtns'>
                        {!isLogged ? (<>
                        <li>
                            <Link to='/Login'>
                                <button className='headerBtn loginBtn'>Login</button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/Register'>
                                <button className='headerBtn registerBtn'>Registrati</button>
                            </Link>
                        </li>
                        </>
                        ) : <li><button className='headerBtn logoutBtn' onClick={() => Logout()}>Logout</button></li>}
                    </ul>
                </div>
            </header>
            {!isLogin ? <HeaderNav/> : ''}
        </>
    )
}

export default Header