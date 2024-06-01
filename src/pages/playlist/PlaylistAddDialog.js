import React, {useContext, useEffect, useState} from 'react';
import styles from './PlaylistAdd.module.css';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {UserContext} from "../../context/UserContext";
import MakeList from "./MakeList";


const PlaylistItem = (props) => {

    const {playlist} = props;
    const {isAdd} = props;
    const {selected, setSelected} = props;

    const {showNewListModal} = props;

    const albumImgUrl = playlist?.songs?.find(song => song.trackOrder === 1)?.albumImgUrl || "/listadd.svg";

    const handleClick = (e) => {
        e.stopPropagation();
        if (isAdd) {
            showNewListModal();
        } else {
            if (selected === playlist?.playlistId) {
                setSelected(null);
            } else {
                setSelected(playlist?.playlistId);
            }
        }

    }

    return (
        <div className={styles.playlistItem} onClick={handleClick}>
            <img src={albumImgUrl} alt="Album Cover" className={styles.albumArt}/>
            <p>{playlist?.title ? playlist.title : "새로운 리스트"}</p>
            {!isAdd &&
                <div
                    className={`${styles.checkboxLabel} ${selected === playlist?.playlistId ? styles.checked : ''}`}>
                </div>
            }
        </div>
    );
}


const PlaylistAddDialog = (props) => {

    const {dialogRef, songId} = props;


    const {user, setUser} = useContext(UserContext);


    const [playList, setPlayList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    const [selected, setSelected] = useState(null);
    const [newListModal, setNewListModal] = useState(false);

    const toggleModal = () => {
        if (dialogRef.current != null) {
            dialogRef.current.close();
        }
    };

    const handleButtonClick = () => {
        if (selected) {
            addSongToPlaylist(selected);
            toggleModal();
        } else {
            alert('플레이리스트를 선택해주세요.');
        }
    };

    const fetchUserPlayList = () => {
        const jwt = localStorage.getItem("accessToken");

        if (!user?.id) {
            return;
        }

        axios.get(`${process.env.REACT_APP_API_HOST}/user/${user?.id}/playlist`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            if (response.data !== null) {
                setPlayList(response.data);
            } else {
            }
        }).catch((error) => {
        });
    }


    useEffect(() => {
        if (user?.id) {
            fetchUserPlayList();
        }
    }, [user]);


    // 새로운 플레이리스트를 만드는 페이지로 이동
    const navigateToMakeList = () => {
        navigate(`/makeList/${userId}/${songId}`);
    };

    // 기존의 플레이리스트에 노래를 추가하는 함수
    const addSongToPlaylist = (playlistId) => {
        const jwt = localStorage.getItem("accessToken");
        axios.post(`${process.env.REACT_APP_API_HOST}/user/playlist/${playlistId}/song`, {
            songId: songId,
            trackOrder: 0
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
            .then((response) => {
                alert("플레이리스트에 곡이 추가되었습니다.");
                dialogRef.current.close();
            })
            .catch((error) => {
                alert("일시적인 오류가 발생했습니다.");
            });

    }

    const revertToPlaylist = () => {
        setNewListModal(false);
        fetchUserPlayList();
    }

    const showNewListModal = () => {
        setNewListModal(true);
    }


    useEffect(() => {
        fetchUserPlayList();
    }, []);


    //TODO: 플레이리스트 많아지면 스크롤 추가하기

    return (
        <dialog ref={dialogRef} className={styles.modal}>
            {!newListModal ?
                <div className={styles.dialogContainer}>
                    <div className={styles.modalHeader}>
                        <div className={styles.modalTitle}>플레이리스트에 추가하기</div>
                        <button className={styles.closeButton} onClick={toggleModal}>×</button>
                    </div>
                    <div className={styles.modalBody}>
                        <div className={styles.playlistContainer}>
                            <PlaylistItem isAdd={true} showNewListModal={showNewListModal}/>
                            {playList?.length > 0 && (
                                playList.map((list, index) => {
                                    return (
                                        <PlaylistItem key={index} playlist={list} selected={selected}
                                                      setSelected={setSelected}/>
                                    )
                                })
                            )}
                        </div>
                        <button
                            className={styles.musicAddButton}
                            onClick={handleButtonClick}
                            style={{color: selected ? 'white' : '#ccc'}}
                        >
                            플레이리스트에 곡 추가
                        </button>
                    </div>
                </div>
                :
                <MakeList closeDialog={toggleModal} revertToPlaylist={revertToPlaylist}/>
            }
        </dialog>
    );
};

export default PlaylistAddDialog;
