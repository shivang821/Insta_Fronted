import { memo } from 'react'
import splashInstaIcon from './splashInstaIcon.png'
import instaMetaIcon from './instaMetaIcon.png'
import './splash.css'
const Splash = () => {
    return (
        <div className='splashScreenDiv' >
            <img src={splashInstaIcon} alt="" />
            <div className='outer' >
                <div className='inner'>
                    <h2>Instagram</h2>
                </div>
            </div>
            <div className='instaMetaImg'>
                <h3>from</h3>
                <img src={instaMetaIcon} alt="" />
            </div>
        </div>
    )
}

export default memo(Splash)