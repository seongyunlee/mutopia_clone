import styles from './TrackComment.module.css';
import StarRating from "../starRating/StarRating";
import axios from "axios";
import {useState} from "react";

const TrackComment = ( props ) => {

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


    const toggleLike = () => {
        const accessToken = localStorage.getItem("accessToken");

        axios.post(
            `${process.env.REACT_APP_API_HOST}/song/${content?.songComment?.songInfo?.id}/comment/${content?.writer?.userId}/like/toggle`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then((response) => {
            setIsLiked(!isLiked);
        }).catch((error) => {
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <div className={styles.songContainer}>
                    <div className={styles.songTitle}>{songComment.songInfo.title}</div>
                    <div className={styles.songArtist}>{songComment.songInfo.id}</div>
                </div>
                <div className={styles.writerContainer}>
                    <div className={styles.authorContainer}>
                        <div
                            className={styles.authorName}>{writer?.username > 12 ? `${writer?.username.substring(0, 12)}...` : writer?.username}</div>
                        <img loading="lazy" className={styles.authorProfileImg} alt="" src={writer?.profileImageUrl}/>
                    </div>
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
                         onClick={toggleLike}
                    />
                    <div className={styles.likeCounter}>{likeCount}</div>
                </div>
                <div className={styles.reviewDate}>{songComment?.createdAt}</div>
            </div>
        </div>
    );
};

export default TrackComment;
