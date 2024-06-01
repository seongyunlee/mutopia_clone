import styles from './PlaylistModal.module.css';
import AlbumReviewWrite from '../albumReviewModal/AlbumReviewWrite';
import {useRef, useState} from "react";
import {useNavigate} from 'react-router-dom';

const PlaylistModal = ({isOpen, onClose, track}) => {
    const [reviewWriteModalOpen, setReviewWriteModalOpen] = useState(false);
    const reviewWriteModalBackground = useRef();

    const moveToMyReviewOrWrite = () => {
        setReviewWriteModalOpen(true);
    }

    const navigate = useNavigate();

    // 곡 추가 페이지로 이동
    const navigateToPlaylistAdd = () => {
        navigate('/playlistadd');
    };


    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>
                <div className={styles.content}>
                    <img src={track?.albumImgUrl} alt="album cover" className={styles.albumArt}/>
                    <div className={styles.trackDetails}>
                        <div className={styles.trackname}>
                            <h2>{track.title}</h2>
                        </div>
                        <div className={styles.artist}>
                            <p>{track.albumName} · {track.artistName}</p>
                        </div>

                        <div className={styles.buttonContainer}>

                            <button className={styles.button} onClick={navigateToPlaylistAdd}>
                                <img src="/add.svg" alt="Add" className={styles.icon1}/> 다른 플레이리스트에 추가하기
                            </button>
                            <button className={styles.button}>
                                <img src='/subtraction.svg' alt="Subtract" className={styles.icon2}/> 이 플레이리스트에서 삭제하기
                            </button>
                        </div>

                    </div>
                    <button className={styles.moreOptions} onClick={moveToMyReviewOrWrite}>이 앨범 리뷰하기</button>
                </div>
                {reviewWriteModalOpen && (
                    <AlbumReviewWrite
                        albumId={track.albumId} // 이 부분은 track 객체에서 albumId를 찾을 수 있어야 합니다.
                        reviewWriteModalOpen={reviewWriteModalOpen}
                        setReviewWriteModalOpen={setReviewWriteModalOpen}
                        reviewWriteModalBackground={reviewWriteModalBackground}
                    />
                )}
            </div>
        </div>
    );
};

export default PlaylistModal;