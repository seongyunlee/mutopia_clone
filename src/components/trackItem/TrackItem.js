import styles from './TrackItem.module.css';
import {useNavigate} from "react-router-dom";

const TrackItem = (prop) => {

    const {track} = prop;

    const navigate = useNavigate();

    const moveToDetail = () => {
        navigate(`/trackDetail/${songId}`);
    }

    return (
        <div className={styles.trackContainer} onClick={moveToDetail}>
            <img src={track?.albumCoverImg} alt="album cover" className={styles.coverImg}/>
            <div className={styles.trackInfo}>
                <div className={styles.trackName}>{track?.songTitle}</div>
                <div className={styles.albumArtist}>{track?.albumName} · {track?.artistName}</div>
            </div>

        </div>
    );
};

export default TrackItem;

/*
const TrackItem = ({track}) => {

    const {trackName, artist, album, albumCover} = track;

}

*/