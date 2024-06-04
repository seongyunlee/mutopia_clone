import {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import styles from './ReviewDetail.module.css';
import StarRating from '../../components/starRating/StarRating';
import ToggleFilter from "../../components/toggleFilter/ToggleFilter";
import ReviewPreview from "../../components/reviewPreview/ReviewPreview";
import {useNavigate, useParams} from "react-router-dom";
import {UserContext} from "../../context/UserContext";
import ShareDialog from "./ShareDialog";


const ReviewDetail = () => {

    const {id} = useParams();
    const reviewId = id;

    const {user, setUser} = useContext(UserContext);
    const [albumId, setAlbumId] = useState(null);
    const [writerId, setWriterId] = useState(null); // 추가: 작성자 id
    const [reviewInfo, setReviewInfo] = useState(null);
    const [myReviewId, setMyReviewId] = useState(null);
    const [myReview, setMyReview] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    const [reviewWriteModalOpen, setReviewWriteModalOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false); // 추가: 좋아요 상태 관리
    const [likeCount, setLikeCount] = useState(0);
    const [writerReview, setWriterReview] = useState(null); // 추가: 작성자의 리뷰 목록
    const [albumReview, setAlbumReview] = useState(null); // 추가: 앨범의 리뷰 목록
    const writerReviewToggleRef = useRef("최근");
    const albumReviewToggleRef = useRef("최근");

    const navigate = useNavigate(); // navigate 함수 사용

    const fetchReviewInfo = async () => {
        try {
            setIsLoading(true); // 데이터를 불러오기 시작할 때 로딩 상태를 true로 설정
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/album/review/${reviewId}`, {});
            console.log(response.data, "review info");
            setReviewInfo(response.data);
            setAlbumId(response.data.album.id);
            setWriterId(response.data.writer.id);
            setIsLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 설정
        } catch (error) {
            console.error('Failed to fetch review information:', error);
            history.back();
        }
    };

    const showShareDialog = () => {
        const dialog = document.getElementById("shareDialog");
        dialog.showModal();

    }


    const getMyReview = async () => {
        const jwt = localStorage.getItem("accessToken");
        if (jwt && albumId) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST}/album/${albumId}/review/check`, {
                    headers: {Authorization: `Bearer ${jwt}`}
                });
                if (response.data.userHasReviewed && response.data.albumReviewId !== null) {
                    setMyReviewId(response.data.albumReviewId);
                    if(response.data.albumReviewId == reviewId){
                        setMyReview(true);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch my review: ', error);
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

    const reviewEdit = () => {
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

    const reviewDelete = () => {
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

    const getReviewLiked = async () => {
        console.log(user.id);
        const jwt = localStorage.getItem("accessToken");
        axios.get(`${process.env.REACT_APP_API_HOST}/album/review/${reviewId}/like/status`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            if (response.data.isUserLoggedIn === "NO") {
                setIsLiked(false);
            } else {
                response.data.likeStatus === "ON" ? setIsLiked(true) : setIsLiked(false)
            }
            setLikeCount(response.data.likeCount);
        }).catch((error) => {
            console.error('Failed to fetch liked status:', error);
        });
    }

    const toggleReviewLike = () => {
        const jwt = localStorage.getItem("accessToken");
        //const jwt = testJwt;
        if (jwt === null) {
            alert('로그인이 필요합니다.');
            const loginDialog = document.getElementById("loginModal");
            loginDialog.showModal();
            return;
        }

        const prevIsLiked = isLiked;
        setIsLiked((prev) => !prev);
        if (prevIsLiked) {
            setLikeCount((prev) => (prev - 1));
        } else {
            setLikeCount((prev) => (prev + 1));
        }

        axios.post(`${process.env.REACT_APP_API_HOST}/album/review/${reviewId}/like/toggle`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            setIsLiked(prevIsLiked);
            if (prevIsLiked) {
                setLikeCount((prev) => (prev + 1));
            } else {
                setLikeCount((prev) => (prev - 1));
            }
        });
    }

    const fetchWriterReview = async () => {
        const jwt = localStorage.getItem("accessToken");

        const query = writerReviewToggleRef.current === "최근" ? "recent" : "popular";
        axios.get(`${process.env.REACT_APP_API_HOST}/user/${writerId}/album/review/${query}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            setWriterReview(response.data);
        }).catch((error) => {
            console.error('Failed to fetch writer recent reviews:', error);
        });
    }

    const fetchAlbumReview = async () => {
        const query = albumReviewToggleRef.current === "최근" ? "recent" : "popular";

        const jwt = localStorage.getItem("accessToken");
        axios.get(`${process.env.REACT_APP_API_HOST}/album/${albumId}/review/${query}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            setAlbumReview(response.data);
        }).catch((error) => {
            console.error('Failed to fetch album recent reviews:', error);
        });
    }

    const moveToAlbumDetail = () => {
        navigate(`/albumDetail/${albumId}`);
    }

    useEffect(() => {
        fetchReviewInfo();
        //getMyReview();
        getReviewLiked();
        //fetchWriterReview();
        //fetchAlbumReview();
    }, [reviewId]);

    useEffect(() => { 
        fetchWriterReview(); 
    }, [writerId]);

    useEffect(() => { 
        fetchAlbumReview();
        getMyReview(); 
        console.log(myReview, "myReview");
    }, [albumId, reviewId]);


    if (isLoading) {
        return <div>Loading album information...</div>; // 로딩 상태일 때 로딩 메시지 표시
    }

    return (
        <>
            <div className={styles.reviewContainer}>
                <div className={styles.reviewWriter}>
                    <span
                        className={styles.writerName}>{reviewInfo.writer.username ? reviewInfo.writer.username : " "}</span>
                    <img className={styles.writerPhoto}
                         src={reviewInfo.writer.profileImageUrl ? reviewInfo.writer.profileImageUrl : "/defaultProfile.svg"}/>
                </div>
                <div className={styles.reviewCover}>
                    <img src={reviewInfo.album.coverImageUrl ? reviewInfo.album.coverImageUrl : "/albumDefault.jpg"}
                         alt="Album Art" className={styles.albumArt} onClick={moveToAlbumDetail}/>
                    <div className={styles.reviewInfo}>
                        <div className={styles.albumTitle}>{reviewInfo.album.name ? reviewInfo.album.name : " "}</div>
                        <div
                            className={styles.artist}>{reviewInfo.album.artistName ? reviewInfo.album.artistName : " "}</div>
                        <div className={styles.rating}>
                            <StarRating score={reviewInfo.review.rating ? reviewInfo.review.rating : 0}/>
                        </div>
                        <div
                            className={styles.dates}>{reviewInfo.review.createdAt ? reviewInfo.review.createdAt : "unknown"}</div>
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
                        <img src={isLiked ? "/favoritefilled.svg" : "/heart-icon.svg"} alt="likes"
                             className={styles.socialIcon} onClick={toggleReviewLike}/>
                        <div className={styles.socialCount}>{likeCount}</div>
                    </div>
                    <img src="/share.svg" alt="share" className={styles.shareIcon} onClick={showShareDialog}/>
                </div>
                <ShareDialog dialogId="shareDialog" linkUrl={location.href}/>
            </div>
            <div>
                {myReview ? (
                    <div className={styles.btnContainer}>
                        <button className={styles.btnEdit} onClick={reviewEdit}>수정하기</button>
                        <button className={styles.btnDelete} onClick={reviewDelete}>삭제하기</button>
                    </div>
                   
                ) : (
                    <button
                    className={styles.btnWrite}
                    onClick={moveToMyReviewOrWrite}
                    >
                    {myReviewId && user ? "나의 리뷰 보기" : "이 앨범 리뷰하기"}
                    </button>
                )}
            </div>
            <section className={styles.subSection}>
                <div className={styles.sectionTitleContainer}>
                    <div className={styles.sectionTitle}>{reviewInfo.writer.username ? reviewInfo.writer.username : " "}의
                        앨범리뷰 보기 👀
                    </div>
                    <ToggleFilter menu={["최근", "인기"]} onFocusChange={fetchWriterReview}
                                  tabRef={writerReviewToggleRef}/>
                </div>
                <div className="verticalScroll">
                    {writerReview && writerReview.length > 0 ?
                        writerReview.map((review, index) => (
                            <ReviewPreview key={index} content={review}/>
                        )) :
                        "작성자의 다른 리뷰가 없습니다. 🤔 "}
                </div>
            </section>

            <section className={styles.subSection}>
                <div className={styles.sectionTitleContainer}>
                    <div className={styles.sectionTitle}>{reviewInfo.album.name ? 
                        (reviewInfo.album.name.length > 25 ? 
                            `${reviewInfo.album.name.slice(0, 25)}...` : 
                            reviewInfo.album.name) : " "}의 다른 리뷰🔍
                    </div>
                    <ToggleFilter menu={["최근", "인기"]} tabRef={albumReviewToggleRef} onFocusChange={fetchAlbumReview}/>
                </div>
                <div className="verticalScroll">
                    {albumReview && albumReview.length > 0 ?
                        albumReview.map((review, index) => (
                            <ReviewPreview key={index} content={review}/>
                        )) :
                        "앨범의 다른 리뷰가 없습니다. 🤔"}
                </div>
            </section>
        </>
    );
}

export default ReviewDetail;