import React from 'react';
import styles from './PlaylistAdd.module.css';
import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const PlaylistAdd = () => {

  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
      if (isModalOpen) {
          navigate(-1);
      }
  };

  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(true);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>다른 플레이리스트에 추가하기</div>
          <button className={styles.closeButton} onClick={toggleModal}>×</button>
        </div>

        <div className={styles.addListContainer}>
          <div className={styles.newList}>
            <img src="./listadd.svg" alt="listadd" className={styles.listadd} />
            <p>새로운 리스트</p>
          </div>

          <div className={styles.playlistItem}>
            <img src="./rectangle-1477@2x.png" alt="Album Cover" className={styles.albumArt} />
            <p>운동할 때 듣는 노래</p>
            <input type="checkbox" className={styles.playlistCheckbox} />
          </div>
        </div>

        <button
          className={styles.musicAddButton}
          onClick={handleButtonClick}
          style={{ color: isClicked ? 'white' : '#ccc' }}
        >
          리스트 선택하기
        </button>

        
      </div>
    </div>
  );
};

export default PlaylistAdd;
