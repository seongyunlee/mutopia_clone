import React, {useEffect, useRef, useState} from 'react';
import styles from './TrackCommentWrite.module.css';
import axios from 'axios';
import StarRating from '../starRating2/StarRating2';

const TrackCommentWrite = ({trackId, commentWriteModalOpen, setCommentWriteModalOpen, commentWriteModalBackground}) => {
    const [trackInfo, setTrackInfo] = useState(null); // 곡 정보를 저장할 상태
    const [score, setScoreFixed] = useState(0);  // 별점 상태 추가
    const commentRef = useRef(null);

    const [inputValue, setInputValue] = useState('');

    const handleMaxLen = (e) => {
        if (e.target.value.length <= 20) {
            setInputValue(e.target.value);
        }
    };

    useEffect(() => {
        const fetchTrackInfo = async () => {
            if (!trackId) return;
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST}/song/info/${trackId}`, {});
                console.log(response.data);
                setTrackInfo(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTrackInfo();
    }, [trackId]); // albumId가 변경될 때마다 함수 실행

    const handleSubmit = async (event) => {
        event.preventDefault();  // 폼 기본 제출 방지
        const jwt = localStorage.getItem("accessToken");
        const scoreDouble = score * 2;
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}/song/${trackId}/comment`, {
                rating: scoreDouble,
                comment: commentRef.current.value
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log(response.data);
            setCommentWriteModalOpen(false);
            window.location.replace(`/trackDetail/${trackId}`);

        } catch (error) {
            console.error(error);
        }


    };


    if (!trackInfo) {
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
                        <div className={styles.modalName}>한줄평 작성하기 ✍🏻</div>
                        <input type="button" className={styles.modalCloseBtn}
                               onClick={() => setCommentWriteModalOpen(false)}></input>
                    </div>
                    <div className={styles.albumCover}>
                        <div>
                            <img loading="lazy" src={trackInfo.albumCoverUrl} alt="albumCover"
                                 className={styles.albumCoverImg}></img>
                        </div>
                        <div className={styles.albumInfo}>
                            <div
                                className={styles.albumName}>{trackInfo.trackName.length < 12 ? trackInfo.trackName : trackInfo.trackName.slice(0, 12) + '...'}</div>
                            <div className={styles.albumArtist}>{trackInfo.albumName.length < 10 ? trackInfo.albumName : trackInfo.albumName.slice(0, 10) + '...'} · {trackInfo.artistName.length < 10 ? trackInfo.artistName : trackInfo.artistName.slice(0, 10) + '...'}</div>
                        </div>
                    </div>
                    <div className={styles.starRating}>
                        <div className={styles.starName}>별점</div>
                        <StarRating score={score} setScoreFixed={setScoreFixed}/>
                    </div>
                    <div className={styles.review}>
                        <div className={styles.reviewName}>한줄평</div>
                        <div className={styles.reviewForm}>
                            <input className={styles.reviewTitle} type="text" placeholder="20자이내로 작성해주세요"
                                   ref={commentRef} value={inputValue} onChange={handleMaxLen}></input>
                            <input className={styles.submitBtn} type="submit" value="저장하기"></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TrackCommentWrite;
