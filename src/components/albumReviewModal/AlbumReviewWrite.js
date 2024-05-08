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
                    <div className={styles.modalName}>앨범 리뷰 작성하기</div>
                    <input type="button" className={styles.modalCloseBtn} onClick={() => setReviewWriteModalOpen(false)}></input>
                </div>
                <div className={styles.albumCover}>
                    <div>
                        <img src="/ive.png" alt="albumCover" className={styles.albumCoverImg}></img>
                    </div>
                    <div className={styles.albumInfo}>
                        <div className={styles.albumName}>Eleven</div>
                        <div className={styles.albumArtist}>아이브</div>
                    </div>
                </div>
                <div className={styles.starRating}>
                    <div className={styles.starName}>별점</div>
                    <div></div>
                </div>
                <div className={styles.review}>
                    <div className={styles.reviewName}>리뷰</div>
                    <form className={styles.reviewForm}>
                        <input className={styles.reviewTitle} type="text" placeholder="제목을 입력하세요"></input>
                        <textarea className={styles.reviewContent} type="text" placeholder="내용을 입력하세요"></textarea>
                        <input className={styles.submitBtn} type="submit" value="저장하기"></input>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AlbumReviewWrite;
