import styles from './TrackComment.module.css';
import StarRating from "../starRating/StarRating";
import axios from "axios";
import {useState, useContext, useEffect} from "react";
import {UserContext} from "../../context/UserContext";

const TrackComment = ( props ) => {

    const {user, setUser} = useContext(UserContext);
    const [isMine, setIsMine] = useState(false);

    const defaultData = {
        writer: {
            id: "undefined",
            username: "undefined",
            profileImageUrl: ""
        },
          songComment: {
            songInfo: {
              id: "undefined",
              title: "undefined",
              artistName: "undefined"
            },
            rating: 0,
            comment: "undefined",
            createdAt: "undefined",
            isLiked: false,
            likeCount: 0
          }
    }

    if (!props.content) {
        writer = defaultData.writer;
        songComment = defaultData.songComment;
    } else {
        var {content} = props;
        var {writer, songComment} = content;
    }

    const [isLiked, setIsLiked] = useState(songComment?.isLiked);
    const [likeCount, setLikeCount] = useState(songComment?.likeCount ?? 0);
    
    const checkMine = () => {
        if(user?.id === writer.userId) {
            setIsMine(true);
        }    
    }

    const toggleCommentLike = () => {
        const jwt = localStorage.getItem("accessToken");
        if (jwt === null) {
            alert('로그인이 필요합니다.');
            const loginDialog = document.getElementById("loginModal");
            loginDialog.showModal();
            return;
        }

        const prevIsLiked = isLiked;
        setIsLiked((prev) => !prev);
        if (prevIsLiked) {
            setLikeCount((prev) => (prev - 1));
        } else {
            setLikeCount((prev) => (prev + 1));
        }

        axios.post(`${process.env.REACT_APP_API_HOST}/song/${songComment?.songInfo?.id}/comment/${writer?.userId}/like/toggle`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            setIsLiked(prevIsLiked);
            if (prevIsLiked) {
                setLikeCount((prev) => (prev + 1));
            } else {
                setLikeCount((prev) => (prev - 1));
            }
        });
    }

    const commentDelete = async () => {
        if (isMine) {
            const confirmDelete = confirm("정말로 삭제하시겠습니까?");
            if (confirmDelete) {
                const jwt = localStorage.getItem("accessToken");
                axios.delete(`${process.env.REACT_APP_API_HOST}/song/${songComment?.songInfo?.id}/comment`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }).then((response) => {
                    alert("한줄평이 삭제되었습니다.");
                    window.location.reload();
                }).catch((error) => {
                    console.error('Failed to fetch liked status:', error);
                });
            }
        } else {
            alert("삭제 중에 오류가 발생했습니다. 나중에 다시 시도해주세요.")
        }
    }

    const navigateUser = () => {
        window.location.href = `/profile/${writer?.userId}`;
    }

    useEffect(() => {
        checkMine();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <div className={styles.songContainer}>
                    <div className={styles.songTitle}>{songComment.songInfo.title.length > 8 ? `${songComment.songInfo.title.substring(0, 8)}...` : songComment.songInfo.title}</div>
                    <div className={styles.songArtist}>{songComment.songInfo.artistName}</div>
                </div>
                <div className={styles.writerContainer}>
                    {isMine ? (
                    <div className={styles.authorContainer}>
                        <div
                            className={styles.authorName}>나의 한줄평</div>
                        <img loading="lazy" className={styles.authorProfileImg} alt="" src="/pending_grey_small.svg" onClick={commentDelete}/>
                    </div>

                    ) : (
                        <div className={styles.authorContainer}>
                            <div
                                className={styles.authorName}>{writer?.username > 12 ? `${writer?.username.substring(0, 12)}...` : writer?.username}</div>
                            <img loading="lazy" className={styles.authorProfileImg} alt="" src={writer?.profileImageUrl} onClick={navigateUser}/>
                        </div>
                    
                    )}
                    <StarRating score={songComment?.rating}/>
                </div>
                
            </div>

            <div className={styles.reviewContainer}>
                {songComment?.comment}
            </div>
            
            <div className={styles.footerContainer}>
                <div className={styles.likeContainer}>
                    <img loading="lazy"
                         src={isLiked === true ? "/favoritefilled.svg" : "/heart-icon.svg"}
                         alt=""
                         onClick={toggleCommentLike}
                    />
                    <div className={styles.likeCounter}>{likeCount}</div>
                </div>
                <div className={styles.reviewDate}>{songComment?.createdAt}</div>
            </div>
        </div>
    );
};

export default TrackComment;
