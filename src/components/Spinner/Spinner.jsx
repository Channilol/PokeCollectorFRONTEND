import './Spinner.css'
import Pokeball from '../../assets/image/Poké_Ball_icon.svg.png'

const Spinner = () => {
    return (
        <div className='spinnerBlur'>
            <div className='spinnerContainer'>
                <img src={Pokeball} className='pokeballSpinner'/>
            </div>
        </div>
    )
}

export default Spinner