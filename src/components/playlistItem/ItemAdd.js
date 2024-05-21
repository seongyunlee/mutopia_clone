import styles from './PlaylistItem.module.css';
import { useState } from "react";

const ItemAdd = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const img = "/ive.png";
    const albumCover = "/path/to/album/cover.jpg";  // 예시 경로
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
            <div className={styles.etcContainer}>
                <img src="/add.svg" alt="etc" className={styles.etc}/>
            </div>
        </div>
    );
};

export default ItemAdd;
