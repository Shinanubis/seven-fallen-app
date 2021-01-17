import './audio.css'
import mp3 from '../mp3/Epic_sound.mp3'
import ogg from '../mp3/Epic_sound.ogg'

function Audio() {
    return (
            <audio className="audio-player" controls>
                <source src={mp3} type="audio/mp3"/>
                <source src={ogg} type="audio/ogg"/>
                <p>Your browser does not support the audio</p>
            </audio>
    )
}

export default Audio;
