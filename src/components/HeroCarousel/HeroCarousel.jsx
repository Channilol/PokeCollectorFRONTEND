import './HeroCarousel.css'
import Bulbasaur from '../../assets/image/Bulbasaur.png'
import Squirtle from '../../assets/image/Squirtle.png'
import Charizard from '../../assets/image/CharizardY.png'
import Pikachu from '../../assets/image/Pikachu.jpg'
import { useEffect, useState } from 'react'

const HeroCarousel = () => {
    const [imgIndex, setImgIndex] = useState(0)
    const images = [Bulbasaur, Squirtle, Charizard, Pikachu]

    useEffect(() => {
        const timerId = setTimeout(() => {
            setImgIndex(imgIndex + 1)
            if (imgIndex > images.length - 2){
                setImgIndex(0)
            }
        }, 5000)
        return () => {
            clearTimeout(timerId)
        }
    }, [imgIndex])

    function showNextImage() {
        setImgIndex(i => {
            if (i === 3) {
                return 0
            } else {
                return imgIndex + 1
            }
        })
    }

    function showPrevImage() {
        setImgIndex(i => {
            if (i === 0) {
                return images.length - 1
            } else {
                return i - 1
            }
        })
    }

    return (
        <div className='heroCarousel'>
            <div className='sliderImgs'>
                {images.map(url => {
                    return <img key={url} src={url} style={{ translate: `${-100 * imgIndex}%` }}/>
                })}
            </div>
            <button className='sliderBtn sliderLeft' onClick={showPrevImage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="rgba(0,0,0,0.5)" className="leftArrow" viewBox="0 0 16 16">
                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                </svg>
            </button>
            <button className='sliderBtn sliderRight' onClick={showNextImage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="rgba(0,0,0,0.5)" className="rightArrow" viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                </svg>
            </button>
            <div className='sliderIndexBtns'>
                {images.map((_,i) => {
                    return <button key={i} className='sliderIndexBtn' onClick={() => {setImgIndex(i)}}>
                        {i === imgIndex ? (<div className='sliderDot active'></div>) : (<div className='sliderDot'></div>)}
                    </button>
                })}
            </div>
        </div>
    )
}

export default HeroCarousel