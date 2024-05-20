import styles from './AddSong.module.css';
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';  // useNavigate import

const AddSong = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const navigate = useNavigate();  // navigate 함수 초기화

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);  // 모달 상태 토글
        if (isModalOpen) {
            navigate(-1);  // 모달이 닫힐 때 이전 페이지로 이동
        }
    };

    

    if (!isModalOpen) return null;  // 모달이 닫혀 있으면 아무것도 렌더링하지 않음

    const songs = [
        {
            id: 1,
            title: "So Long, London",
            artist: "The Tortured Poets Department - Taylor Swift",
            cover: "/path-to-so-long-london.jpg"
        },
        {
            id: 2,
            title: "Allergy",
            artist: "NEVER DIE - (여자)아이들",
            cover: "/path-to-allergy.jpg"
        },
        {
            id: 3,
            title: "인류, 비상시 그리고 죽음의 아내",
            artist: "UNFORGIVEN - 손흥민",
            cover: "/path-to-unforgiven.jpg"
        },
        {
            id: 4,
            title: "파이어",
            artist: "UNFORGIVEN - 손흥민",
            cover: "/path-to-fire.jpg"
        }
    ];

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <input type="search" placeholder="검색하기" className={styles.searchBar} />
                    <button className={styles.closeButton} onClick={toggleModal}>×</button> 
                </div>
                <div className={styles.songList}>
                    {songs.map(song => (
                        <div key={song.id} className={styles.songItem}>
                            <img src={song.cover} alt="album cover" className={styles.songCover} />
                            <div className={styles.songInfo}>
                                <div className={styles.songTitle}>{song.title}</div>
                                <div className={styles.songArtist}>{song.artist}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddSong;

