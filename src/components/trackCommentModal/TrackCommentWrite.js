import React from 'react';
import styles from './TrackCommentWrite.module.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import StarRating from '../starRating2/StarRating3';

const TrackCommentWrite = ({ trackId, commentWriteModalOpen, setCommentWriteModalOpen, commentWriteModalBackground }) => {
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE3MTUxNTgwNzksImV4cCI6MTc0NjY5NDA3OSwiYXVkIjoiIiwic3ViIjoidGVzdHVzZXIifQ._zVQhiluqkNvElvU45WPH2gaoPB7J_c_ZvTOU3zqvD0"

    const [albumInfo, setAlbumInfo] = useState(null); // 앨범 정보를 저장할 상태
    const [songInfo, setSongInfo] = useState(null); // 곡 정보를 저장할 상태
    const [score, setScoreFixed] = useState(0);  // 별점 상태 추가
    const commentRef = useRef(null);

    const songId = "02x5ZKr4BljE6fC2qMlSyD";

    useEffect(() => {
        const fetchAlbumInfo = async () => {
            if (!albumId) return;
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST}/album/info/${albumId}`, {});
                console.log(response.data);
                setAlbumInfo(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAlbumInfo();
    }, [albumId]); // albumId가 변경될 때마다 함수 실행

    const handleSubmit = async (event) => {
        event.preventDefault();  // 폼 기본 제출 방지
        const scoreDouble = score * 2;
        // console.log(albumId, scoreDouble, reviewTitleRef.current.value, reviewContentRef.current.value)
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}/song/${songId}/comment`, {
                rating: scoreDouble, 
                comment: commentRef.current.value
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            //setReviewWriteModalOpen(false);
            
            setMessage('저장이 완료되었습니다');  // 메시지 설정
            setTimeout(() => {
                setReviewWriteModalOpen(false); // 2초 후 모달 닫기
                setMessage('');  // 메시지 초기화
            }, 2000);
            
        } catch (error) {
            console.error(error);
        }
        
        
    };
    

    if (!albumInfo) {
        return <div>Loading...</div>; // 데이터 로딩 중 표시
    }
    
    return (
        <div className={styles.modalContainer} ref={commentWriteModalBackground} onClick={e => {
            if (e.target === commentWriteModalBackground.current) {
                setCommentWriteModalOpen(false);
            }
        }}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
                <div className={styles.modalHeader}>
                    <div className={styles.modalName}>곡 한줄평 작성하기</div>
                    <input type="button" className={styles.modalCloseBtn} onClick={() => setCommentWriteModalOpen(false)}></input>
                </div>
                <div className={styles.albumCover}>
                    <div>
                        <img src={albumInfo.albumImg} alt="albumCover" className={styles.albumCoverImg}></img>
                    </div>
                    <div className={styles.albumInfo}>
                        <div className={styles.albumName}>{albumInfo.albumName.length < 12 ? albumInfo.albumName : albumInfo.albumName.slice(0, 12) + '...'}</div>
                        <div className={styles.albumArtist}>{albumInfo.artistName}</div>
                    </div>
                </div>
                <div className={styles.starRating}>
                    <div className={styles.starName}>별점</div>
                    <StarRating score={score} setScoreFixed={setScoreFixed} />
                </div>
                <div className={styles.review}>
                    <div className={styles.reviewName}>한줄평</div>
                    <div className={styles.reviewForm}>
                        <input className={styles.reviewTitle} type="text" placeholder="20자이내로 입력하세요" ref={commentRef}></input>
                        <input className={styles.submitBtn} type="submit" value="저장하기"></input>
                    </div>
                </div>
            </form>
            </div>
        </div>
    );
}

export default TrackCommentWrite;
