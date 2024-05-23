import React from 'react';
import styles from './Playlist.module.css';
import PlaylistItem from "../../components/playlistItem/PlaylistItem";
import { useNavigate } from 'react-router-dom';
import AddSong from '../addSong/AddSong';
import { useEffect, useState, useRef } from "react";

const Playlist = () => {
    const img = "/ive.png"; // 이미지 경로, 사용하지 않은 변수라면 제거 가능
    const trackName = "LOVE DIVE"; // 트랙 이름, 사용하지 않은 변수라면 제거 가능
    const artist = "아이브"; // 아티스트, 사용하지 않은 변수라면 제거 가능
    const album = "I've Mine"; // 앨범, 사용하지 않은 변수라면 제거 가능

    const navigate = useNavigate();

    // 좋아요 상태 관리
    const [likes, setLikes] = useState(0);  // 초기 좋아요 수
    const toggleLike = () => setLikes(likes + 1);  // 좋아요 클릭 시 수 증가

    // 이전 페이지로 돌아가는 함수
    const handleBack = () => {
        navigate(-1); // navigate 함수에 -1을 전달하여 이전 페이지로 이동
    };

    // 곡 추가 페이지로 이동
    const navigateToAddSong = () => {
        navigate('/addsong');
    };

    return (
        <div className={styles.playlist}>
            <div className={styles.header}>
                <img src="/arrow_right.svg" alt="Back" className={styles.backIcon} onClick={handleBack} />
                <div className={styles.detailsContainer}>
                    <div className={styles.playlistTitle}>K-pop 여름 플레이리스트</div>
                    <div className={styles.description}>다들 아시죠? 청량은 겨울이 제철입니다</div>
                    <div className={styles.authorContainer}>
                        <img src="/amusementpark-3@2x.png" className={styles.authorProfileImg} alt="Author profile" />
                        <div>무중력지대</div>
                    </div>  

                    <div className={styles.buttonContainer}>
                        <button className={styles.addButton} onClick={navigateToAddSong}>곡 추가하기</button>
                        <img src="/play.svg" alt="Play" className={styles.playButton} />
                    </div>

                    <div className={styles.authorAndControlsContainer}>
                        <div className={styles.controlsContainer}>
                            <img src="/heart-icon.svg" alt="Like icon" className={styles.likeButton} onClick={toggleLike} />
                            <span>{likes} Likes</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.listContainer}>
                <PlaylistItem/>
                <PlaylistItem/>
                <PlaylistItem/>
                <PlaylistItem/>
                <PlaylistItem/>
                <PlaylistItem/>
                <PlaylistItem/>
                <PlaylistItem/>
            </div>
        </div>
    );
};

export default Playlist;

