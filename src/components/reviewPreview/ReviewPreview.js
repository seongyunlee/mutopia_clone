import styles from './ReviewPreview.module.css';
import StarRating from "../starRating/StarRating";

const ReviewPreview = (prop) => {


    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.infoDetailContainer}>
                    <div className={styles.authorContainer}>
                        <img className={styles.authorProfileImg}
                             loading="lazy"
                             alt=""
                        />
                        <div>아무거나듣는사람</div>
                    </div>
                    <div className={styles.albumName}>I feel</div>
                    <div className={styles.albumArtist}>(여자) 아이들</div>
                </div>
                <img className={styles.albumImg}
                     loading="lazy"
                     alt=""
                />
            </div>
            <div>
                <div className={styles.spaceAroundContainer}>
                    <div className={styles.reviewTitle}>
                        아이들 리뷰 제목
                    </div>
                    <StarRating score={7}/>
                </div>
                <div>
                    <div className={styles.reviewContent}>
                        바람이 불어오는 곳<br/>
                        그 곳으로 가네<br/>
                        그대의 머릿결같은 나무 아래로<br/>
                        덜컹이는 기차에..... 더보기<br/>
                    </div>
                </div>
                <div className={styles.reviewDate}> 2024. 4. 1.</div>
            </div>
        </div>
    );
};

export default ReviewPreview;
