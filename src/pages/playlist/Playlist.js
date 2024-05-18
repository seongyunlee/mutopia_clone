import React from 'react';
import styles from './Playlist.module.css';  // Ensure your path to CSS file is correct
import PlaylistItem from "../../components/playlistItem/PlaylistItem";

const Playlist = () => {

    const img = "/ive.png";
    const trackName = "LOVE DIVE";
    const artist = "아이브";
    const album = "I've Mine";

    return (
        <div className={styles.playlist}>
            <div className={styles.header}>
                <img src="/arrow_right.svg" alt="Back" className={styles.backIcon} />

                <div className={styles.detailsContainer}>
                    <div className={styles.playlistTitle}>K-pop 여름 플레이리스트</div>

                    <div className={styles.authorContainer}>
                        <img
                            src="/amusementpark-3@2x.png"
                            className={styles.authorProfileImg}
                            loading="lazy"
                            alt="Author profile"
                        />
                        <div>무중력지대</div>
                    </div>

                    <div className={styles.playButtonContainer}>
                        <img src="/play.svg" alt="Play" className={styles.playButton} />
                    </div>
                    
                </div>

                <button className={styles.addButton}>곡 추가하기</button>
            </div>
        
            <div className={styles.listContainer}>
                <PlaylistItem/>
                <PlaylistItem/>
                <PlaylistItem/>
                <PlaylistItem/>
                <PlaylistItem/>
                <PlaylistItem/>
                <PlaylistItem/>
                <PlaylistItem/>
            </div>


        </div>
    );
};

export default Playlist;
