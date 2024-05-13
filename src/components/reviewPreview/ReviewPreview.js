import styles from './ReviewPreview.module.css';
import StarRating from "../starRating/StarRating";

const ReviewPreview = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <img className={styles.albumImg} alt="" src="/rectangle-1478@2x.png"/>
                <div className={styles.infoDetailContainer}>
                    <div className={styles.albumName}>I’VE MINE</div>
                    <div className={styles.albumArtist}>아이브 (IVE)</div>
                    <StarRating score={10}/>
                </div>
                <div className={styles.authorContainer}>
                    <div>아무거나듣는사람</div>
                    <img className={styles.authorProfileImg} alt="" src="/ellipse-85@2x.png"/>
                </div>
            </div>
            <div>
                <div className={styles.reviewTitle}>
                I’ve got IVE
                </div>

                <div>
                    <div className={styles.reviewContent}>
                        <span className={styles.reviewContainer}>
                            <span className={styles.content}>{` “다른 문을 열어/따라갈 필요는 없어”라 외쳤던 ‘I am’의 가사가 무색하게 많은 것이 겹쳐 보인다. 베이스라인을 강조한 ‘Off th `}</span>
                            <span className={styles.add}>....더보기</span>
                        </span>
                    </div>
                </div>
                
            <div className={styles.footerContainer}>
                <div className={styles.likeContainer}>
                    <img
                        src="/heart-icon.svg"
                        loading="lazy"
                        alt=""
                    />
                    <div>76</div>
                </div>
                <div className={styles.reviewDate}>2024. 4. 1.</div>
            </div>
            </div>
        </div>
    );
};

export default ReviewPreview;
