import React from 'react';
import styles from './Playlist.module.css';
import PlaylistItem from "../../components/playlistItem/PlaylistItem";
import { useNavigate } from 'react-router-dom';
import AddSong from '../addSong/AddSong';

const Playlist = () => {
    const img = "/ive.png"; // 이미지 경로, 사용하지 않은 변수라면 제거 가능
    const trackName = "LOVE DIVE"; // 트랙 이름, 사용하지 않은 변수라면 제거 가능
    const artist = "아이브"; // 아티스트, 사용하지 않은 변수라면 제거 가능
    const album = "I've Mine"; // 앨범, 사용하지 않은 변수라면 제거 가능

    const navigate = useNavigate();

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
                <img
                    src="/arrow_right.svg"
                    alt="Back"
                    className={styles.backIcon}
                    onClick={handleBack} // 여기에 onClick 이벤트 핸들러를 추가하여 이전 페이지로 돌아가도록 설정
                />

                <div className={styles.detailsContainer}>
                    <div className={styles.playlistTitle}>K-pop 여름 플레이리스트</div>

                    <div className={styles.authorContainer}>
                        <img
                            src="/amusementpark-3@2x.png"
                            className={styles.authorProfileImg}
                            loading="lazy"
                            alt="Author profile"
                        />
                        <div>무중력지대</div>
                    </div>

                    <div className={styles.playButtonContainer}>
                        <img src="/play.svg" alt="Play" className={styles.playButton} />
                    </div>
                    
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.addButton} onClick={navigateToAddSong}>곡 추가하기</button>
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
