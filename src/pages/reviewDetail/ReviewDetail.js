import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from './ReviewDetail.module.css';
import StarRating from '../../components/starRating/StarRating';
import ToggleFilter from "../../components/toggleFilter/ToggleFilter";
import ReviewPreview from "../../components/reviewPreview/ReviewPreview";
import { UserContext } from "../../context/UserContext";
import AlbumReviewWrite from "../../components/albumReviewModal/AlbumReviewWrite";


const ReviewDetail = ( ) => {
    const reviewId = 5;
    // 나중에 param으로 받아오기
    const {user, setUser} = useContext(UserContext);
    const [albumInfo, setAlbumInfo] = useState(null);
    const [reviewInfo, setReviewInfo] = useState(null);
    const [myRating, setMyRating] = useState("-");
    const [myReviewId, setMyReviewId] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    const [reviewWriteModalOpen, setReviewWriteModalOpen] = useState(false); 
    const [isLiked, setIsLiked] = useState(false); // 추가: 좋아요 상태 관리
    
    const fetchReviewInfo = async () => {
        try {
            setIsLoading(true); // 데이터를 불러오기 시작할 때 로딩 상태를 true로 설정
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/album/review/${reviewId}`, {});
            //console.log(response.data);
            setReviewInfo(response.data);
            setIsLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 설정
        } catch (error) {
            console.error('Failed to fetch review information:', error);
            history.back();
        }
    };


    const getMyReview = async () => {
        const jwt = localStorage.getItem("accessToken");
        if (jwt) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST}/album/review/check?albumId=${props.albumId}`, {
                    headers: { Authorization: `Bearer ${jwt}` }
                });
                if (response.data.userHasReviewed && response.data.albumReviewId !== null) {
                    setMyReviewId(response.data.albumReviewId);
                }
            } catch (error) {
                console.error('Failed to fetch my review:', error);
            }
        }
    };

    const getMyRating = async () => {
        const jwt = localStorage.getItem("accessToken");
        if (jwt === null) {
            return;
        }
        axios.get(`${process.env.REACT_APP_API_HOST}/album/${props.albumId}/rating`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            if (response.data.rating !== null) {
                setMyRating(response.data.rating)
            }
        }).catch((error) => {
            console.error('Failed to fetch my review:', error);
        });
    }

    const moveToMyReviewOrWrite = () => {
        console.log(user?.id);
        if (!user?.id) {
            alert('로그인이 필요합니다.');
            const loginDialog = document.getElementById("loginModal");
            loginDialog.showModal();
            return;
        }
        if (myReviewId) {
            window.location.href = `/album/review/${myReviewId}`;
        } else {
            setReviewWriteModalOpen(true);
        }
    };

    const toggleReviewLike = () => {
        const jwt = localStorage.getItem("accessToken");
        if (!jwt) {
            alert('로그인이 필요합니다.');
            const loginDialog = document.getElementById("loginModal");
            loginDialog.showModal();
            return;
        }
        axios.post(`${process.env.REACT_APP_API_HOST}/album/review/${myReviewId}/like/toggle`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            setIsLiked(response.data.likeStatus === "ON")
        }).catch((error) => {
            console.error('Failed to toggle like:', error);
            setIsLiked(!isLiked); // 실패 시 현재 상태 반전
        });
    };

    const onReviewLikeClicked = () => {
        setIsLiked(!isLiked);
        toggleReviewLike();
    };
    
    const onContainerClick = () => {
    };

    useEffect(() => {
        fetchReviewInfo();
    }, []);

    if (isLoading) {
        return <div>Loading album information...</div>; // 로딩 상태일 때 로딩 메시지 표시
    }

    return (
        <>
        <div className={styles.reviewContainer}>
            <div className={styles.reviewWriter}>
                <span className={styles.writerName}>{reviewInfo.writer.username ? reviewInfo.writer.username : " "}</span>
                <img className={styles.writerPhoto} src={reviewInfo.writer.profileImageUrl ? reviewInfo.writer.profileImageUrl : "/defaultProfile.svg"} />
            </div>
            <div className={styles.reviewCover}>
                <img src={reviewInfo.album.converImgeUrl ? reviewInfo.album.converImgeUrl : "/albumDefault.jpg"} alt="Album Art" className={styles.albumArt}/>
                <div className={styles.reviewInfo}>
                    <div className={styles.albumTitle}>{reviewInfo.album.name ? reviewInfo.album.name : " "}</div>
                    <div className={styles.artist}>{reviewInfo.album.artistName ? reviewInfo.album.artistName : " "}</div>  
                    <div className={styles.rating}>
                        <StarRating score={reviewInfo.review.rating ? reviewInfo.review.rating : 0}/>
                    </div>
                    <div className={styles.dates}>{reviewInfo.review.createdAt ? reviewInfo.review.createdAt : "unknown"}</div>
                </div>
            </div>
            <div className={styles.reviewTitle}>
                {reviewInfo.review.title.length > 50 ? reviewInfo.review.title.substring(0, 50) + "..." : reviewInfo.review.title}
            </div>
            <div className={styles.reviewContent}>
                {reviewInfo.review.content ? reviewInfo.review.content : " "}
            </div>
            <div className={styles.reivewNav}>
                <div className={styles.likeIcon}>
                    <img src="/heart-icon.svg" alt="likes" className={styles.socialIcon} onClick={onReviewLikeClicked} />
                    <div className={styles.socialCount}>100</div>    
                </div>
                <img src="/share.svg" alt="share" className={styles.shareIcon} />
            </div>
        </div>
        <button className={styles.btnWrite} onClick={moveToMyReviewOrWrite}>이 앨범 리뷰하기 / 나의 리뷰보기</button>     
        <div>
            <div className={styles.othersContainer}>
                <div className={styles.headerContainer}>
                    <h2>~의 다른 리뷰</h2>
                    <ToggleFilter menu={["최근", "인기"]} />
                    </div>
                    <div className="verticalScroll">
                    <ReviewPreview
                        ellipse85="/ellipse-85@2x.png"
                        iFeel="I feel"
                        rectangle1480="/rectangle-1480@2x.png"
                        prop="아이들 리뷰 제목"
                        onContainerClick={onContainerClick}
                    />
                    <ReviewPreview
                        ellipse85="/ellipse-85@2x.png"
                        iFeel="I feel"
                        rectangle1480="/rectangle-1480@2x.png"
                        prop="아이들 리뷰 제목"
                        onContainerClick={onContainerClick}/>
                </div>
            </div>

            <div className={styles.othersContainer}>
                <div className={styles.headerContainer}>
                    <h2>이 앨범의 다른 리뷰</h2>
                    <ToggleFilter menu={["최근", "인기"]} />
                    </div>
                    <div className="verticalScroll">
                    <ReviewPreview
                        ellipse85="/ellipse-85@2x.png"
                        iFeel="I feel"
                        rectangle1480="/rectangle-1480@2x.png"
                        prop="아이들 리뷰 제목"
                        onContainerClick={onContainerClick}
                    />
                    <ReviewPreview
                        ellipse85="/ellipse-85@2x.png"
                        iFeel="I feel"
                        rectangle1480="/rectangle-1480@2x.png"
                        prop="아이들 리뷰 제목"
                        onContainerClick={onContainerClick}/>
                </div>
            </div>

        </div>
        </>
    );
}

export default ReviewDetail;