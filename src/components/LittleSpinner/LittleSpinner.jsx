import './LittleSpinner.css'
import Pokeball from '../../assets/image/Poké_Ball_icon.svg.png'

const LittleSpinner = () => {
    return (
        <div className='littleSpinnerBg'>
            <img className='littleSpinner' src={Pokeball}/>
        </div>
    )
}

export default LittleSpinner