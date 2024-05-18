
import styles from './PlaylistModal.module.css'; 


const PlaylistModal = ({ isOpen, onClose, track }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>
                <div className={styles.content}>
                    <img src={track.albumCover} alt="album cover" className={styles.albumArt}/>
                    <div className={styles.trackDetails}>
                        <h2>{track.name}</h2>
                        <p>{track.album} · {track.artist}</p>
                        <button className={styles.button}>다른 플레이리스트에 추가하기</button>
                        <button className={styles.button}>이 플레이리스트에서 삭제하기</button>
                    </div>
                    <button className={styles.moreOptions}>···</button>
                </div>
            </div>
        </div>
    );
};

export default PlaylistModal;
