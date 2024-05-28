import styles from './TraceReview.module.css';
import StarRating from "../starRating/StarRating";

const TrackReview = (prop) => {

    const {content} = prop;


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
                        src={content?.songComment?.isLiked ? "/favoritefilled.svg" : "/heart-icon.svg"}
                        loading="lazy"
                    />
                </div>
                <div className={styles.reviewDate}>{content?.songComment?.createdAt}</div>
            </div>
        </div>
    );
};

export default TrackReview;
