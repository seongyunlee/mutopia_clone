import styles from './ReviewPreview.module.css';
import {useNavigate} from 'react-router-dom';
import StarRating from "../starRating/StarRating";

const ReviewPreview = (props) => {

    const navigate = useNavigate();


    const handleClick = () => {
        navigate("/reviewDetail");
    };


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
        <div className={styles.container} onClick={handleClick}>
            <div className={styles.infoContainer}>
                <img loading="lazy" className={styles.albumImg} alt="" src={album?.coverImageUrl}/>
                <div className={styles.infoDetailContainer}>
                    <div className={styles.authorContainer}>
                        <div
                            className={styles.authorName}>{writer?.username > 12 ? `${writer?.username.substring(0, 12)}...` : writer?.username}</div>
                        <img loading="lazy" className={styles.authorProfileImg} alt="" src={writer?.profileImageUrl}/>
                    </div>
                    <div
                        className={styles.albumName}>{album?.name.length > 20 ? `${album?.name.substring(0, 20)}...` : album?.name}</div>
                    <div className={styles.albumArtist}>{album?.artistName}</div>
                    <StarRating score={review?.rating}/>
                </div>
            </div>

            <div className={styles.reviewContainer}>
                <div className={styles.reviewTitle}>
                    {review?.title}
                </div>
                <div className={styles.reviewContent}>        
                    <span
                        className={styles.content}>{review.content.length > 75 ? review.content.substring(0, 75) : review.content}</span>
                    <span className={styles.add}>....더보기</span>
                </div>
            </div>

            <div className={styles.footerContainer}>
                <div className={styles.likeContainer}>
                    <img loading="lazy"
                         src={review?.isLiked === true ? "/favoritefilled.svg" : "/heart-icon.svg"}
                         alt=""
                    />
                    <div className={styles.likeCounter}>{review?.likeCount}</div>
                </div>
                <div className={styles.reviewDate}>{review?.createdAt}</div>
            </div>
        </div>

    );
};

export default ReviewPreview;
