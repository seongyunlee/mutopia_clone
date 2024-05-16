import styles from './ReviewPreview.module.css';
import StarRating from "../starRating/StarRating";

const ReviewPreview = (props) => {

    console.log(props)

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
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <img className={styles.albumImg} alt="" src={album?.coverImageUrl}/>
                <div className={styles.infoDetailContainer}>
                    <div className={styles.albumName}>{album?.name}</div>
                    <div className={styles.albumArtist}>{album?.artistName}</div>
                    <StarRating score={review?.rating}/>
                </div>
                <div className={styles.authorContainer}>
                    <div>{writer?.username}</div>
                    <img className={styles.authorProfileImg} alt="" src={writer?.profileImageUrl}/>
                </div>
            </div>
            <div>
                <div className={styles.reviewTitle}>
                    {review?.title}
                </div>

                <div>
                    <div className={styles.reviewContent}>
                        <span className={styles.reviewContainer}>
                            <span
                                className={styles.content}>{review.content}</span>
                            <span className={styles.add}>....더보기</span>
                        </span>
                    </div>
                </div>

                <div className={styles.footerContainer}>
                    <div className={styles.likeContainer}>
                        <img
                            src={review?.isLiked === true ? "/heart-fill-icon.svg" : "/heart-icon.svg"}
                            alt=""
                        />
                        <div>{review?.likeCount}</div>
                    </div>
                    <div className={styles.reviewDate}>{review?.createdAt}</div>
                </div>
            </div>
        </div>
    );
};

export default ReviewPreview;
