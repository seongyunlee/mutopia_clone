import React from 'react';
import styles from './PlaylistAdd.module.css';
import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const PlaylistAdd = () => {

  const {userId, songId} = useParams();

  const [playList, setPlayList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
      if (isModalOpen) {
          navigate(-1);
      }
  };

  const handleButtonClick = () => {
    setIsClicked(true);
  };

  const fetchUserPlayList = async () => {
    setIsLoading(true);
    const jwt = localStorage.getItem("accessToken");
    axios.get(`${process.env.REACT_APP_API_HOST}/user/${userId}/playlist`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    }).then((response) => {
        if (response.data !== null) {
            setPlayList(response.data);
            setIsLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 설정
        } else {
            console.error('Failed to fetch playlist information:', error);
            alert('잘못된 접근입니다.');
            history.back();
        }
    }).catch((error) => {
        console.error('Failed to fetch playlist information:', error);
        alert('잘못된 접근입니다.');
        history.back();
    });
}


  // 새로운 플레이리스트를 만드는 페이지로 이동
  const navigateToMakeList = () => {
    navigate(`/makeList/${userId}/${songId}`);
  };

  // 기존의 플레이리스트에 노래를 추가하는 함수
  const addSongToPlaylist = async (playlistId) => {
    try{
      const jwt = localStorage.getItem("accessToken");
      axios.post(`${process.env.REACT_APP_API_HOST}/user/playlist/${playlistId}/song`, {
        songId: songId,
        trackOrder: 0
      },{  
        headers: {
              Authorization: `Bearer ${jwt}`
          }
      });
    } catch (error) {
      console.error('Failed to add song to playlist', error);
      alert('곡 추가에 실패했습니다.');
      history.back();
    }
  }

  useEffect(() => {
    fetchUserPlayList();
  }, []);

  if (isLoading) {
    return <div>Loading playlist information...</div>; // 로딩 상태일 때 로딩 메시지 표시
}

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>플레이리스트에 추가하기</div>
          <button className={styles.closeButton} onClick={toggleModal}>×</button>
        </div>

        <div className={styles.addListContainer}>
          <div className={styles.newList}>
            <img src="./listadd.svg" alt="listadd" className={styles.listadd} onClick={navigateToMakeList} />
            <p>새로운 리스트</p>
          </div>
          {playList?.length > 0 ? (
            playList.map((list, index) =>{
              const albumImgUrl = list.songs.find(song => song.trackOrder === 0)?.albumImgUrl || "./listadd.svg";
              return (
                <div className={styles.playlistItem}>
                <img src={albumImgUrl} alt="Album Cover" className={styles.albumArt} />
                <p>{list.title}</p>
                <input type="checkbox" id="customCheckbox" className={styles.hiddenCheckbox} />
                <label htmlFor="customCheckbox" className={styles.checkboxLabel}></label>
              </div>
              );
            })
          ): (
            " "
          )}

          <div className={styles.playlistItem}>
            <img src="./rectangle-1477@2x.png" alt="Album Cover" className={styles.albumArt} />
            <p>운동할 때 듣는 노래</p>
            <input type="checkbox" id="customCheckbox" className={styles.hiddenCheckbox} />
            <label htmlFor="customCheckbox" className={styles.checkboxLabel}></label>
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
