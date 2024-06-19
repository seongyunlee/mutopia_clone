import styles from './ReviewPreviewShort.module.css';
import StarRating from "../starRating/StarRating";
import axios from "axios";
import {useState} from "react";

const ReviewPreviewShort = (props) => {

    const handleClick = () => {
        window.location.href=`/reviewDetail/${props.content.review.id}`;
    };

    const defaultData = {
        review: {
            id: "undefined",
            title: "undefined",
            content: "undefined",
            rating: 0,
            isLiked: false,
            likeCount: 0,
            createdAt: "0000-00-00"
        },
        writer: {
            id: "undefined",
            username: "undefined",
            profileImageUrl: ""
        },
        album: {
            id: "undefined",
            name: "undefined",
            artistName: "undefined",
            coverImageUrl: "",
            releaseDate: "",
            length: null,
            totalReviewCount: 0,
            averageRating: null,
            totalLikeCount: 0
        }
    }

    if (!props.content) {
        review = defaultData.review;
        writer = defaultData.writer;
        album = defaultData.album;
    } else {
        var {content} = props;
        var {review, writer, album} = content;
    }


    return (
        <div className={styles.container} onClick={handleClick}>
            <div className={styles.headerContainer}>
            <StarRating score={review?.rating}/>
                <div className={styles.authorContainer}>
                    <div>{writer?.username.length > 12 ? `${writer?.username.substring(0, 12)}...` : writer?.username}</div>
                    <img loading="lazy" className={styles.authorProfileImg}
                         src={writer?.profileImageUrl}
                         loading="lazy"
                         alt=""
                    />
                </div>
            </div>
            <div className={styles.reviewContent}>
                {review?.title.length > 20 ? `${review?.title.substring(0, 20)}...` : review?.title}
            </div>
            <div className={styles.footerContainer}>
                <div className={styles.likeContainer}>
                    <img loading="lazy"
                         src={review?.isLiked === true ? "/favoritefilled.svg" : "/heart-icon.svg"}
                         alt=""
                    />
                    <div>{review?.likeCount}</div>
                </div>
                <div className={styles.reviewDate}>{review?.createdAt}</div>
            </div>
        </div>
    );
};

export default ReviewPreviewShort;
