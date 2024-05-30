import styles from './TraceReview.module.css';
import StarRating from "../starRating/StarRating";
import axios from "axios";
import {useState} from "react";

const TrackReview = (prop) => {

    const {content} = prop;

    console.log(content);

    const [isLiked, setIsLiked] = useState(content?.songComment?.isLiked);


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
                <StarRating score={content?.songComment?.rating}/>
                <div className={styles.authorContainer}>
                    <div>{content?.writer?.username}</div>
                    <img loading="lazy" className={styles.authorProfileImg}
                         src={content?.writer?.profileImageUrl}
                         loading="lazy"
                         alt=""
                    />
                </div>
            </div>
            <div className={styles.reviewContent}>
                {content?.songComment?.comment}
            </div>
            <div className={styles.footerContainer}>
                <div className={styles.likeContainer}>
                    <img
                        src={isLiked ? "/favoritefilled.svg" : "/heart-icon.svg"}
                        loading="lazy"
                        onClick={toggleLike}
                    />
                    <div>{content?.songComment?.likeCount}</div>
                </div>
                <div className={styles.reviewDate}>{content?.songComment?.createdAt}</div>
            </div>
        </div>
    );
};

export default TrackReview;
