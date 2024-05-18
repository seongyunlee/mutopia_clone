import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from './ReviewDetail.module.css';
import StarRating from '../../components/starRating/StarRating';
import ToggleFilter from "../../components/toggleFilter/ToggleFilter";
import ReviewPreview from "../../components/reviewPreview/ReviewPreview";
import {useNavigate} from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import AlbumReviewWrite from "../../components/albumReviewModal/AlbumReviewWrite";


const ReviewDetail = ( ) => {
    const reviewId = 5;
    // 나중에 param으로 받아오기
    const mockReview =
        {
            "review": {
                "id": 1,
                "title": "I've got IVE",
                "content": " “다른 문을 열어/따라갈 필요는 없어”라 외쳤던 ‘I am’의 가사가 무색하게 많은 것이 겹쳐 보인다. 베이스라인을 강조한 ‘Off the record’는 피프티 피프티의 ‘Cupid’와 태연의 ‘Weekend’가 레퍼런스로 삼은 도자 캣의 분홍색 디스코 감성을 닮았고, ‘Baddie’의 사운드 질감과 랩 위주의 구성에서 에스파의 ‘Savage’와 NCT의 잔향을 지우기란 쉽지 않다. 전통적인 색채로 ‘정통성’을 손에 쥐었던 아이브가 눈치를 많이 보고 있다.",
                "rating": 4,
                "isLiked": false,
                "likeCount": 0,
                "createdAt": "2024.04.01"
            },
            "writer": {
                "id": "testuser",
                "username": "테스트유저",
                "profileImageUrl": "/defaultProfile.svg"
            },
            "album": {
                "id": "02vMw0MNNUbBxS6WeB1PR4",
                "name": "Blink Twice If You’re Okay",
                "artistName": "FARR",
                "coverImageUrl": "https://i.scdn.co/image/ab67616d0000b27307d0d17f6fb756e66812f86a",
                "releaseDate": "2024-05-10",
                "length": null,
                "totalReviewCount": 2,
                "averageRating": null,
                "totalLikeCount": 0
            }
        }

    const {user, setUser} = useContext(UserContext);
    const [albumId, setAlbumId] = useState(null);
    const [reviewInfo, setReviewInfo] = useState(null);
    const [myRating, setMyRating] = useState("-");
    const [myReviewId, setMyReviewId] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    const [reviewWriteModalOpen, setReviewWriteModalOpen] = useState(false); 
    const [isLiked, setIsLiked] = useState(false); // 추가: 좋아요 상태 관리

    const navigate = useNavigate(); // navigate 함수 사용
    
    const fetchReviewInfo = async () => {
        try {
            setIsLoading(true); // 데이터를 불러오기 시작할 때 로딩 상태를 true로 설정
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/album/review/${reviewId}`, {});
            //console.log(response.data);
            setReviewInfo(response.data);
            setAlbumId(response.data.album.id);
            setIsLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 설정
        } catch (error) {
            console.error('Failed to fetch review information:', error);
            history.back();
        }
    };


    const getMyReview = async () => {
        const jwt = localStorage.getItem("accessToken");
        if (jwt && albumId) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST}/album/${albumId}/review/check`, {
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

    const moveToMyReviewOrWrite = () => {
        // console.log(user?.id);
        if (!user?.id) {
            alert('로그인이 필요합니다.');
            const loginDialog = document.getElementById("loginModal");
            loginDialog.showModal();
            return;
        }

        if (myReviewId) {
            navigate(`/reviewDetail/${myReviewId}`);
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
        getMyReview();
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
                <img src={reviewInfo.album.coverImageUrl ? reviewInfo.album.coverImageUrl : "/albumDefault.jpg"} alt="Album Art" className={styles.albumArt}/>
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
        <button className={styles.btnWrite} onClick={moveToMyReviewOrWrite}>{myReviewId && user ? "나의 리뷰 보기" : "이 앨범 리뷰하기"}</button>     
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>                    
                    <div className={styles.sectionTitle}>{reviewInfo.writer.username ? reviewInfo.writer.username : " "}의 인생앨범 엿보기 👀</div>
                    <ToggleFilter menu={["최근", "인기"]}/>
                </div>
                <div className="verticalScroll">
                    <ReviewPreview content={mockReview}/>
                </div>
        </section>

        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>                    
                    <div className={styles.sectionTitle}>{reviewInfo.album.name ? reviewInfo.album.name : " "}의 다른 리뷰 🔍</div>
                    <ToggleFilter menu={["최근", "인기"]}/>
                </div>
                <div className="verticalScroll">
                    <ReviewPreview/>
                </div>
        </section>
        </>
    );
}

export default ReviewDetail;