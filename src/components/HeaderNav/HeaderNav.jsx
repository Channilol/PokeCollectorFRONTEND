import './HeaderNav.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Italy from '../../assets/image/italy.png'
import UK from '../../assets/image/united-kingdom.png'
import Japan from '../../assets/image/japan.png'
import Pokeball from '../../assets/image/icons8-pokeball-100.png'
import Home from '../../assets/image/icons8-home-100.png'
import News from '../../assets/image/icons8-megaphone-64.png'

const HeaderNav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        function handleScroll() {
        const scrolled = window.scrollY > 0;
        setIsScrolled(scrolled);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavbar = () => {
        if (isOpen) {
            setIsOpen(false)
        }
        else {
            setIsOpen(true)
        }
    }

    return (
        <>
        <div className={isScrolled ? 'headerNavDiv scrolled' : 'headerNavDiv'}>
            <svg xmlns="http://www.w3.org/2000/svg" className="hamburgerIcon" viewBox="0 0 16 16" onClick={handleNavbar}>
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
            <nav className={isOpen ? 'headerNav' : 'headerNav hidden'}>
                <ul className={isOpen ? 'headerNavUl' : 'headerNavUl hidden'}>
                    <Link to='/'><li><img src={Home} alt=''/>Home</li></Link>
                    <Link to='/'><li><img src={News} alt=''/>Novità</li></Link>
                    <Link to='/'><li><img src={Italy} alt=''/>Carte(IT)</li></Link>
                    <Link to='/'><li><img src={UK} alt=''/>Carte(EN)</li></Link>
                    <Link to='/'><li><img src={Japan} alt=''/>Carte(JP)</li></Link>
                    <Link to='/'><li><img src={Pokeball} alt=''/>Pokédex</li></Link>
                </ul>
            </nav>
        </div>
        </>
    )
}

export default HeaderNav