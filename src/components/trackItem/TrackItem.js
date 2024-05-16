import styles from './TrackItem.module.css';

const TrackItem = ({}) => {

    const img = "/ive.png";
    const trackName = "LOVE DIVE";
    const artist = "아이브";
    const album = "I've Mine";

    return (
        <div className={styles.trackContainer}>
            <img src={img} alt="album cover" className={styles.coverImg}/>
            <div className={styles.trackInfo}>
                <div className={styles.trackName}>{trackName}</div>
                <div className={styles.albumArtist}>{album} · {artist}</div>
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