import styles from './PlaylistModal.module.css'; 
import AlbumReviewWrite from '../albumReviewModal/AlbumReviewWrite';
import {useEffect, useRef, useState} from "react";

const PlaylistModal = ({ isOpen, onClose, track }) => {
    const [reviewWriteModalOpen, setReviewWriteModalOpen] = useState(false);
    const reviewWriteModalBackground = useRef();

    // 직접 리뷰 모달을 열도록 하는 함수
    const moveToMyReviewOrWrite = () => {
        setReviewWriteModalOpen(true);
    }


    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>
                <div className={styles.content}>
                    <img src='./rectangle-1478-1@2x.png' alt="album cover" className={styles.albumArt}/>
                    <div className={styles.trackDetails}>
                        <h2>{track.name}</h2>
                        <p>{track.album} · {track.artist}</p>

                        <button className={styles.button}>
                            <img src="./add.svg" alt="Add" className={styles.icon1}/> 다른 플레이리스트에 추가하기
                        </button>
                        <button className={styles.button}>
                            <img src='./subtraction.svg' alt="Subtract" className={styles.icon2}/> 이 플레이리스트에서 삭제하기
                        </button>
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