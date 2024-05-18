import styles from './PlaylistItem.module.css';
import PlaylistModal from '../playlistModal/PlaylistModal';
import {useContext, useEffect, useRef, useState} from "react";

const PlaylistItem = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const img = "/ive.png";
    const trackName = "LOVE DIVE";
    const artist = "아이브";
    const album = "I've Mine";


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    
    return (
        <div className={styles.trackContainer}>
            <img src={img} alt="album cover" className={styles.coverImg}/>
            <div className={styles.trackInfo}>
                <div className={styles.trackName}>{trackName}</div>
                <div className={styles.albumArtist}>{album} · {artist}</div>
            </div>
            <div className={styles.etcContainer} onClick={toggleModal}>
                <img src="/etc.svg" alt="etc" className={styles.etc}/>
            </div>
            {isModalOpen && <PlaylistModal onClose={toggleModal} track={{name: trackName, artist, album}} />}
        </div>
    );
};

export default PlaylistItem;