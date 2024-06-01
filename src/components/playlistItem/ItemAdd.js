import styles from './PlaylistItem.module.css';
import {useState} from "react";

const ItemAdd = ({track}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const img = track?.album?.images.length > 0 ? track?.album?.images[0].url : "";
    const albumCover = "/path/to/album/cover.jpg";  // 예시 경로
    const trackName = "LOVE DIVE";
    const artist = track?.artists.length > 0 ? track?.artists[0].name : "";
    const album = "I've Mine";


    return (
        <div className={styles.trackContainer}>
            <img src={img} alt="album cover" className={styles.coverImg}/>
            <div className={styles.trackInfo}>
                <div className={styles.trackName}>{track?.name}</div>
                <div className={styles.albumArtist}>{track?.album?.name} · {artist}</div>
            </div>
            <div className={styles.etcContainer}>
                <img src="/add.svg" alt="etc" className={styles.etc}/>
            </div>
        </div>
    );
};

export default ItemAdd;
