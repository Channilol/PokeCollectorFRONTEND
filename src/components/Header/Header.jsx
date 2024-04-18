import './Header.css'
import Cookies from 'js-cookie'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setUserAction } from '../../redux/actions'
import PokeBall from '../../assets/image/Poké_Ball_icon.svg.png'
import HeaderNav from '../HeaderNav/HeaderNav'

const Header = () => {
    const [isLogged, setIsLogged] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isCartHovered, setIsCartHovered] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const loggedUser = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
    const location = useLocation()

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
            setIsLogged(false)        
        }
    }

    const handleMouseEnter = () => {
        setIsCartHovered(true);
    }
    
    const handleMouseLeave = () => {
        setIsCartHovered(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
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
                            <input type='text' placeholder='Cerca tra i prodotti'></input>
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
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
                        <Link to='/Cart' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            {isCartHovered ? 
                            (<>
                                <svg xmlns="http://www.w3.org/2000/svg"  className="cartIcon" viewBox="0 0 16 16">
                                    <path className='withBorder' d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z"/>
                                </svg>
                            </>) : 
                            (<>
                                <svg xmlns="http://www.w3.org/2000/svg" className='cartIcon' viewBox="0 0 16 16">
                                    <path  d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                </svg>
                            </>)}
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