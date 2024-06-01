import styles from './PlaylistItem.module.css';
import PlaylistModal from '../playlistModal/PlaylistModal';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const PlaylistItem = (props) => {

    const {track} = props;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const moveToTrackDetail = () => {
        console.log("move to track detail")
        navigate(`/trackDetail/${track?.songId}`);
    }

    const toggleModal = (e) => {
        setIsModalOpen(!isModalOpen);
        e.stopPropagation();
    }

    return (
        <div className={styles.trackContainer}>
            <div className={styles.trackInfoContainer} onClick={moveToTrackDetail}>
                <img src={track?.albumImgUrl} alt="album cover" className={styles.coverImg}/>
                <div className={styles.trackInfo}>
                    <div className={styles.trackName}>{track?.title}</div>
                    <div className={styles.albumArtist}>{track?.albumName} · {track?.artistName}</div>
                </div>
            </div>
            <div className={styles.etcContainer} onClick={toggleModal}>
                <img src="/etc.svg" alt="etc" className={styles.etc}/>
            </div>
            {isModalOpen && <PlaylistModal isOpen={isModalOpen} onClose={toggleModal}
                                           track={track}/>}
        </div>
    );
};

export default PlaylistItem;
