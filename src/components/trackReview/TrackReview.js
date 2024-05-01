import styles from './TraceReview.module.css';
import StarRating from "../starRating/StarRating";

const TrackReview = (prop) => {


    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <StarRating score={7}/>
                <div className={styles.authorContainer}>
                    <div>아무거나듣는사람</div>
                    <img className={styles.authorProfileImg}
                         loading="lazy"
                         alt=""
                    />
                </div>
            </div>
            <div>
                <div className={styles.reviewContent}>
                    재생과 함께 집중맞은 도둑력
                </div>
                <div className={styles.footerContainer}>
                    <div className={styles.likeContainer}>
                        <img
                            src="/heart-icon.svg"
                            loading="lazy"
                        />
                        <div>76</div>
                    </div>
                    <div className={styles.reviewDate}> 2024. 4. 1.</div>
                </div>
            </div>
        </div>
    );
};

export default TrackReview;
