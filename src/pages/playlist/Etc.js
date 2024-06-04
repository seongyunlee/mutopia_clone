import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './Etc.module.css';
import {useNavigate} from 'react-router-dom';
import ReviseDialog from "./ReviseList";

const Etc = ({dialogRef}) => {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const reviseDialogRef = useRef();

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(true);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen) {
            navigate(-1); // Navigate back on close
        }
    };

    const openReviseDialog = () => {
        reviseDialogRef.current?.showModal();
    }


    return (
        <dialog className={styles.modal} ref={dialogRef}>
            <ReviseDialog dialogRef={reviseDialogRef}/>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <button className={styles.closeButton} onClick={toggleModal}>×</button>
                </div>
                <button className={styles.button1} onClick={openReviseDialog}>
                    플레이리스트 수정하기
                </button>
                <button className={styles.button2}>
                    플레이리스트 삭제하기
                </button>
            </div>
        </dialog>
    );
};

export default Etc;