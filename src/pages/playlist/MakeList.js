import React, {useState} from 'react';
import styles from './MakeList.module.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const MakeList = (props) => {

    const [playlistName, setPlaylistName] = useState('');
    const [playlistContent, setPlaylistContent] = useState('');
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(true);

    const {revertToPlaylist, closeDialog} = props;

    const toggleModal = () => {
        revertToPlaylist();
    };

    const handleCreate = () => {

        const jwt = localStorage.getItem('accessToken');

        if (playlistName.length === 0 || playlistName === '') {
            alert('Please enter a name for your playlist.');
            return;
        }
        axios.post(`${process.env.REACT_APP_API_HOST}/user/playlist`, {
            title: playlistName,
            content: playlistContent
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            revertToPlaylist();
        }).catch((error) => {
            alert("일시적인 오류가 발생했습니다.")
        });
    };


    return (
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
                <span className={styles.modalTitle}>새로운 플레이리스트 만들기</span>
                <button className={styles.closeButton} onClick={toggleModal}>×</button>
            </div>
            <div className={styles.heading1}>새로운 플레이리스트 제목</div>
            <input
                className={styles.input}
                type="text"
                placeholder="나의 플레이리스트"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
            />
            <div className={styles.heading2}>플레이리스트 설명</div>
            <input
                className={styles.input}
                type="text"
                placeholder="이 플레이리스트는 ..."
                value={playlistContent}
                onChange={(e) => setPlaylistContent(e.target.value)}
                //content로 바꿔야
            />
            <button className={styles.button} onClick={handleCreate}>
                만들기
            </button>
        </div>
    );
};

export default MakeList;
