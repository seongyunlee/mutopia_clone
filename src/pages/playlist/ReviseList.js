import React, {useState} from 'react';
import styles from './ReviseList.module.css';
import {useNavigate} from 'react-router-dom';
import axios from "axios";

const ReviseList = ({dialogRef, playlistId}) => {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleClose = () => {
        dialogRef.current.close();
    };

    const navigateToReviseList = () => {
        navigate('/reviseList');
    };

    const handleBack = () => {
        navigate(-1); // Navigate back
    };

    const handleSubmit = () => {
        const jwt = localStorage.getItem('accessToken');
        if (jwt) {
            axios.patch(`${process.env.REACT_APP_API_HOST}/user/playlist/${playlistId}`, {
                title: playlistName,
                content: playlistDescription,
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }).then(() => {
                location.reload();
            }).catch((error) => {
                alert("플레이리스트 수정에 실패했습니다.");
            })
        }

    }

    return (
        <dialog className={styles.modal} ref={dialogRef}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <button className={styles.closeButton} onClick={handleClose}>×</button>
                </div>
                <div className={styles.heading1}>플레이리스트 제목</div>
                <input
                    className={styles.input}
                    type="text"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                />
                <div className={styles.heading2}>플레이리스트 설명</div>
                <input
                    className={styles.input}
                    type="text"
                    value={playlistDescription}
                    onChange={(e) => setPlaylistDescription(e.target.value)}
                />
                <button className={styles.button} onClick={handleSubmit}>
                    수정하기
                </button>
            </div>
        </dialog>
    );
};

export default ReviseList;