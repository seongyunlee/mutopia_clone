import React, {useRef} from 'react';
import styles from './Etc.module.css';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import ReviseDialog from "./ReviseList";

const Etc = ({dialogRef}) => {
    const reviseDialogRef = useRef();
    const navigate = useNavigate();
    const playlistId = useParams().id;

    const handleClose = () => {
        dialogRef.current.close();
    };

    const openReviseDialog = () => {
        reviseDialogRef.current?.showModal();
    };

    const deletePlaylist = async () => {
        const jwt = localStorage.getItem('accessToken');

        try {
            await axios.delete(`${process.env.REACT_APP_API_HOST}/user/playlist/${playlistId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            handleClose(); // Close the modal and navigate back
        } catch (error) {
            console.error("Failed to delete playlist:", error);
            alert("플레이리스트 삭제에 실패했습니다.");
        }
    };

    return (
        <dialog className={styles.modal} ref={dialogRef}>
            <ReviseDialog dialogRef={reviseDialogRef} playlistId={playlistId}/>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <button className={styles.closeButton} onClick={handleClose}>×</button>
                </div>
                <button className={styles.button1} onClick={openReviseDialog}>
                    플레이리스트 수정하기
                </button>
                <button className={styles.button2} onClick={deletePlaylist}>
                    플레이리스트 삭제하기
                </button>
            </div>
        </dialog>
    );
};

export default Etc;
