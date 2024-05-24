import React from 'react';
import styles from './AlbumReviewWrite.module.css';
import { useState, useEffect, useRef, useContext } from 'react';
import {UserContext} from "../../context/UserContext";
import axios from 'axios';
import StarRating from '../starRating2/StarRating3';
import { useNavigate } from 'react-router-dom';

const AlbumReviewWrite = ({ albumId, reviewWriteModalOpen, setReviewWriteModalOpen, reviewWriteModalBackground }) => {
    const {user, setUser} = useContext(UserContext);
    const jwt = localStorage.getItem("accessToken");

    const [albumInfo, setAlbumInfo] = useState(null); // 앨범 정보를 저장할 상태
    const [score, setScoreFixed] = useState(0);  // 별점 상태 추가
    const reviewTitleRef = useRef(null);
    const reviewContentRef = useRef(null);
    const navigate = useNavigate();

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
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}/album/review`, {
                albumId: albumId,
                rating: scoreDouble, 
                title: reviewTitleRef.current.value,
                content: reviewContentRef.current.value
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            //console.log(response.data);
            setReviewWriteModalOpen(false);
            //useNavigate(`/reviewDetail/${myReviewId}`);
            window.location.href = `/reviewDetail/${response.data.albumReviewId}`;

            /*
            setMessage('저장이 완료되었습니다');  // 메시지 설정
            setTimeout(() => {
                setReviewWriteModalOpen(false); // 2초 후 모달 닫기
                setMessage('');  // 메시지 초기화
            }, 2000);
            */
        } catch (error) {
            console.error(error);
        }
        
    };
    

    if (!albumInfo) {
        return <div>Loading...</div>; // 데이터 로딩 중 표시
    }
    
    return (
        <div className={styles.modalContainer} ref={reviewWriteModalBackground} onClick={e => {
            if (e.target === reviewWriteModalBackground.current) {
                setReviewWriteModalOpen(false);
            }
        }}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
                <div className={styles.modalHeader}>
                    <div className={styles.modalName}>앨범 리뷰 작성하기</div>
                    <input type="button" className={styles.modalCloseBtn} onClick={() => setReviewWriteModalOpen(false)}></input>
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
                    <div className={styles.reviewName}>리뷰</div>
                    <div className={styles.reviewForm}>
                        <input className={styles.reviewTitle} type="text" placeholder="제목을 입력하세요" ref={reviewTitleRef}></input>
                        <textarea className={styles.reviewContent} type="text" placeholder="내용을 입력하세요" ref={reviewContentRef}></textarea>
                        <input className={styles.submitBtn} type="submit" value="저장하기"></input>
                    </div>
                </div>
            </form>
            </div>
        </div>
    );
}

export default AlbumReviewWrite;
