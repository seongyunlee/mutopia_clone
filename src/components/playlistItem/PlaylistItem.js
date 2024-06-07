import styles from './PlaylistItem.module.css';
import PlaylistModal from '../playlistModal/PlaylistModal';
import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../../context/UserContext";

const PlaylistItem = (props) => {
    const {track, playlistId, onRemoveTrack, creatorId} = props; // creatorId를 props로 받습니다.
    const {user} = useContext(UserContext); // 현재 사용자 정보를 가져옵니다.

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const moveToTrackDetail = () => {
        console.log("move to track detail");
        navigate(`/trackDetail/${track?.songId}`);
    }

    const toggleModal = (e) => {
        setIsModalOpen(!isModalOpen);
        e.stopPropagation();
    }

    const removeFromPlaylist = (e) => {
        e.stopPropagation();
        const jwt = localStorage.getItem("accessToken");
        axios.delete(`${process.env.REACT_APP_API_HOST}/user/playlist/${playlistId}/song/${track?.songId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
            .then((response) => {
                alert("플레이리스트에서 곡이 삭제되었습니다.");
                onRemoveTrack(track.songId); // 삭제된 곡을 상태에서 제거합니다.
            })
            .catch((error) => {
                alert("일시적인 오류가 발생했습니다.");
            });
    }

    return (
        <div className={styles.trackContainer}>
            <div className={styles.trackInfoContainer} onClick={moveToTrackDetail}>
                <img src={track?.albumImgUrl} alt="album cover" className={styles.coverImg}/>
                <div className={styles.trackInfo}>
                    <div className={styles.trackName}>{track?.title.length > 20 ? `${track?.title.substring(0, 20)}...` : track?.title}</div>
                    <div className={styles.albumArtist}>{track?.albumName.length > 20 ? `${track?.albumName.substring(0, 20)}...` : track?.albumName} · {track?.artistName.length > 30 ? `${track?.artistName.substring(0, 30)}...` : track?.artistName } </div>
                </div>
            </div>
            {creatorId === user?.id && ( // 현재 사용자가 플레이리스트의 생성자인 경우에만 렌더링
                <div className={styles.etcContainer} onClick={removeFromPlaylist}>
                    <img src="/subtraction.svg" alt="subtraction" className={styles.subtraction}/>
                </div>
            )}
            {isModalOpen && <PlaylistModal isOpen={isModalOpen} onClose={toggleModal} track={track}/>}
        </div>
    );
};

export default PlaylistItem;
