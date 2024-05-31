import React, { useState } from 'react';
import styles from './MakeList.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const MakeList = () => {
  const {userId, songId} = useParams();

  const [playlistName, setPlaylistName] = useState('');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
      if (!isModalOpen) {
          navigate(-1); // Navigate back on close
      }
  };

  const handleCreate = async () => {
    if (playlistName.length === 0 || playlistName === '') {
      alert('Please enter a name for your playlist.');
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/user.playlist`, {
        title: playlistName,
        content: ""
    }, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
      alert('플레이리스트가 생성되었습니다.'); // alert 말고 메시지로 바꾸기     
      navigate(`/playlistadd/${userId}/${songId}`); // playlistadd로 이동
    } catch (error) {
      console.error('Failed to create playlist:', error);
      alert('Failed to create playlist. Please try again later.');
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={toggleModal}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>  
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={toggleModal}>×</button>
        </div>
        <p1 className={styles.heading}>새로운 플레이리스트 제목</p1>
        <input
            className={styles.input}
            type="text"
            placeholder="My playlist"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
        />
        <button className={styles.button} onClick={handleCreate}>
            만들기
        </button>
      </div>
    </div>
  );
};

export default MakeList;
