import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './Playlist.module.css';
import PlaylistItem from "../../components/playlistItem/PlaylistItem";
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import {UserContext} from "../../context/UserContext";
import ReviseDialog from "./ReviseList";

const Playlist = () => {

    const {user, setUser} = useContext(UserContext);

    const playlistId = useParams().id;

    const navigate = useNavigate();

    const reviseDialogRef = useRef();

    // 좋아요 상태 관리
    const [likes, setLikes] = useState(0);  // 초기 좋아요 수
    const [isLiked, setIsLiked] = useState(false);  // 좋아요 상태 [true: 좋아요 클릭, false: 좋아요 취소]


    const [creatorProfileImg, setCreatorProfileImg] = useState("");

    const [playlist, setPlaylist] = useState([]);

    // 곡 추가 페이지로 이동
    const navigateToAddSong = () => {
        navigate(`/playlist/${playlistId}/addSong`);
    };

    const getSpotifyExportUrl = () => {
        const jwt = localStorage.getItem("accessToken");

        axios.post(`${process.env.REACT_APP_API_HOST}/user/playlist/${playlistId}/export/spotify`,
            {
                playlist: {
                    name: playlist.title,
                    description: playlist.content,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            .then((response) => {
                window.open(response.data.url);
            })
            .catch((error) => {
            });
    }

    const toggleLike = () => {
        const jwt = localStorage.getItem('accessToken');

        axios.post(`${process.env.REACT_APP_API_HOST}/user/playlist/${playlistId}/like/toggle`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            setLikes(response.data.likeCount);
            setIsLiked(response.data.likeStatus === "ON");
        }).catch((error) => {
            if (error.response.status === 401) {
                alert("로그인이 필요합니다.");
            }
        });
    }

    const navigateToReviseList = () => {
        navigate('/reviseList');
    };

    // 이전 페이지로 돌아가는 함수
    const handleBack = () => {
        navigate(-1); // navigate 함수에 -1을 전달하여 이전 페이지로 이동
    };

    const getPlaylist = () => {
        const jwt = localStorage.getItem('accessToken');

        axios.get(`${process.env.REACT_APP_API_HOST}/user/playlist/${playlistId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            setPlaylist(response.data);
            setLikes(response.data.likeCount);
            setIsLiked(response.data.isLiked);
            getUserProfileImg(response.data.creatorId);
        }).catch((error) => {
            alert("잘못된 접근입니다.");
            navigate(-1);
        });
    }

    const getUserProfileImg = (userId) => {
        axios.get(`${process.env.REACT_APP_API_HOST}/user/${userId}/profile/aggregation`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then((response) => {
            setCreatorProfileImg(response.data.profileImageUrl);
        }).catch((error) => {
        });
    }

    const openReviseDialog = () => {
        reviseDialogRef.current?.showModal();
    }


    useEffect(() => {
        getPlaylist();
    }, []);

    return (
        <div className={styles.playlist}>
            <ReviseDialog dialogRef={reviseDialogRef}/>
            <div className={styles.header}>
                <img src="/arrow_right.svg" alt="Back" className={styles.backIcon} onClick={handleBack}/>
                <div className={styles.detailsContainer}>
                    <div className={styles.playlistTitle}>{playlist?.title}</div>
                    <div className={styles.description}>
                        <div>{playlist?.content}</div>
                    </div>
                    <div className={styles.authorContainer}>
                        <img src={creatorProfileImg} className={styles.authorProfileImg} alt="Author profile"/>
                        <div>{playlist?.creatorName}</div>
                    </div>

                    <div className={styles.buttonContainer}>
                        <div className={styles.controlsContainer}>
                            <img loading="lazy"
                                 src={isLiked === true ? "/favoritefilled.svg" : "/heart-icon.svg"}
                                 alt=""
                                 onClick={toggleLike}
                            />
                            <span>{likes}</span>
                        </div>

                        <img src="/play.svg" alt="Play" className={styles.playButton} onClick={getSpotifyExportUrl}/>
                    </div>

                    {playlist?.creatorId === user?.id && (
                        <div className={styles.buttonContainer}>
                            <button className={styles.addButton} onClick={navigateToAddSong}>곡 추가하기</button>
                            <div>
                                <img src="/pencil.png" className={styles.revise} alt="revise"
                                     onClick={openReviseDialog}/>
                            </div>
                        </div>)}
                </div>
            </div>
            <div className={styles.listContainer}>
                {playlist?.songs?.map((song, index) => (
                    <PlaylistItem key={index} track={song} index={index}/>
                ))}
            </div>
        </div>
    );
};

export default Playlist;

