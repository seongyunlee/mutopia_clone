import React from 'react';
import styles from './AlbumReviewWrite.module.css';

const AlbumReviewWrite = ({ reviewWriteModalOpen, setReviewWriteModalOpen, reviewWriteModalBackground }) => {
    return (
        <div className={styles.modalContainer} ref={reviewWriteModalBackground} onClick={e => {
            if (e.target === reviewWriteModalBackground.current) {
                setReviewWriteModalOpen(false);
            }
        }}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <p>앨범리뷰작성하기</p>
                    <p><button className={styles.modalCloseBtn} onClick={() => setReviewWriteModalOpen(false)}>
                    닫기
                    </button></p>
                </div>
                <div className={styles.albumCover}>앨범정보</div>
                <div className={styles.starRating}>별점</div>
                <div className={styles.reviewContent}>
                    <p>리뷰</p>
                    <p><textarea placeholder="제목을 입력하세요"></textarea></p>
                    <p><textarea placeholder="내용을 입력하세요"></textarea></p>
                </div>
                <div className={styles.submitBtn}>
                    <button>저장하기</button>
                </div>
            </div>
        </div>
    );
}

export default AlbumReviewWrite;
