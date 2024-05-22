import styles from "./TrackDetail.module.css";
import {useContext, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import TrackCommentWrite from "../../components/trackCommentModal/TrackCommentWrite";
import ReviewPreview from "../../components/reviewPreview/ReviewPreview";
import PlaylistPreview from "../../components/playlistPreview/PlaylistPreview";
import ToggleFilter from "../../components/toggleFilter/ToggleFilter";
import TrackReview from "../../components/trackReview/TrackReview";
import ShareDialog from "./ShareDialog";
import {UserContext} from "../../context/UserContext";
import { useNavigate } from 'react-router-dom';

const CommentPage = (props) => {

    const {commentList} = props.commentList;

    if (commentList.length === 0) {
        return (
            <div className={styles.commentSection}>
                <div className={styles.noComment}>
                    아직 작성된 한줄평이 없습니다. 첫 한줄평을 남겨주세요.
                </div>
            </div>
        );
    }

    return (
        <div className={styles.commentSection}>
           {commentList.map((comment, index) => (
                <TrackPreview key={index} comment={comment} />
            ))}
        </div>
    );
};


const ListPage = (props) => {

    const {playList} = props.playList;

    if (playList.length === 0) {
        return (
            <div className={styles.commentSection}>
                <div className={styles.noComment}>
                    아직 등록된 플레이리스트가 없습니다. 첫 플레이리스트를 등록해보세요.
                </div>
            </div>
        );
    }

    return (
        <div className={styles.commentSection}>
           {commentList.map((comment, index) => (
                <PlaylistPreview key={index} comment={comment} />
            ))}
        </div>
    );

};

// 앨범 상세페이지 컴포넌트
const TrackDetailPage = (props) => {
    console.log(props.trackId)

    const {user, setUser} = useContext(UserContext);

    const [commentWriteModalOpen, setCommentWriteModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    const commentWriteModalBackground = useRef();
    const [trackInfo, setTrackInfo] = useState(null);
    const [myRating, setMyRating] = useState("-");
    const [myCommentId, setMyCommentId] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [playList, setPlayList] = useState([]);
    const navigate = useNavigate();

    // 곡 추가 페이지로 이동
    const navigateToPlaylistAdd = () => {
        navigate('/playlistadd');
    };


    const getRecentReviews = () => {
        const jwt = localStorage.getItem("accessToken");
        const headers = {}
        if (jwt !== null) {
            headers.Authorization = `Bearer ${jwt}`;
        }
        axios.get(`${process.env.REACT_APP_API_HOST}/album/${props.albumId}/review/recent`, {
            headers: headers
        }).then((response) => {
            setReviewList(response.data);
        }).catch((error) => {
        });
    }


    const fetchTrackInfo = async () => {
        try {
            setIsLoading(true); // 데이터를 불러오기 시작할 때 로딩 상태를 true로 설정
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/song/info/${props.trackId}`, {});
            console.log(response.data);
            setTrackInfo(response.data);
            setIsLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 설정
        } catch (error) {
            console.error('Failed to fetch album information:', error);
            alert('잘못된 접근입니다.');
            history.back();
        }
    };

    const showShareDialog = () => {
        const dialog = document.getElementById("shareDialog");
        dialog.showModal();

    }

    const getMyComment = async () => {
        console.log(user.id);
        const jwt = localStorage.getItem("accessToken");
        if (jwt === null) {
            return;
        }
        axios.get(`${process.env.REACT_APP_API_HOST}/album/${props.albumId}/review/check`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            if (response.data.userHasReviewed && response.data.albumReviewId !== null) {
                setMyReviewId(response.data.albumReviewId)
            }
        }).catch((error) => {
            console.error('Failed to fetch my review:', error);
        });
    }

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
        console.log(user.id);
        if (!user?.id) {
            alert('로그인이 필요합니다.');
            const loginDialog = document.getElementById("loginModal");
            loginDialog.showModal();
            return;
        }
        if (myReviewId) {
            window.location.href = `/album/review/${myReviewId}`;
        } else {
            setCommentWriteModalOpen(true);
        }

    }

    const toggleAlbumLike = () => {
        const jwt = localStorage.getItem("accessToken");
        if (jwt === null) {
            alert('로그인이 필요합니다.');
            const loginDialog = document.getElementById("loginModal");
            loginDialog.showModal();
            return;
        }
        axois.post(`${process.env.REACT_APP_API_HOST}/album/${props.albumId}/like/toggle`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            setIsLiked(response.data.likeStatus === "ON")
        }).catch((error) => {
            setIsLiked(!isLiked);
        });
    }

    const onAlbumLikeClicked = () => {
        setIsLiked(!isLiked);
        toggleAlbumLike();
    }


    useEffect(() => {
        fetchTrackInfo();
        //getMyReview();
        //getMyRating();
        //getRecentReviews();

    }, [props.trackId]);

    if (isLoading) {
        return <div>Loading track information...</div>; // 로딩 상태일 때 로딩 메시지 표시
    }

    return (
        <div className={styles.albumPage}>
            <div className={styles.contentContainer}>
                <div className={styles.albumArtContainer}>
                    <img src={albumInfo.albumImg} alt="Album Art" className={styles.albumArt}/>
                </div>
                <div className={styles.albumInfo}>
                    <h1>{albumInfo.albumName}</h1>
                    <h2>{`${albumInfo.releaseDate.replaceAll("-", ".")} | ${albumInfo?.albumTrackList?.length}곡 | ${
                        Math.floor(albumInfo.albumLength / 60)}분 ${albumInfo.albumLength % 60}초`}</h2>
                    <h3>{albumInfo.artistName}</h3>
                </div>
                <div className={styles.ratingInfo}>
                    <div className={styles.ratingItem}>
                        <div className={styles.value}>
                            {albumInfo.totalReviewCount ? albumInfo.totalReviewCount : 0}</div>
                        <div className={styles.label}>총 리뷰</div>
                    </div>
                    <div className={styles.ratingItem}>
                        <div className={styles.value}>
                            {albumInfo.averageRating ? albumInfo.averageRating.toFixed(1) : 0} / 5.0
                        </div>
                        <div className={styles.label}>전체 평가</div>
                    </div>
                    <div className={styles.ratingItem}>
                        <div className={styles.value}>{`${myRating} / 5.0`}</div>
                        <div className={styles.label}>내 평가</div>
                    </div>
                </div>

                <button className={styles.reviewButton} onClick={() => moveToMyReviewOrWrite()}>
                    {myReviewId ? "나의 한줄평 보기" : "한줄평 작성하기"}
                </button>
                <div className={styles.socialButtons}>
                    <img src="/heart-icon.svg" alt="❤️" className={styles.socialIcon} onClick={onAlbumLikeClicked}/>
                    <img src="/share.svg" alt="🔗" className={styles.socialIcon} onClick={showShareDialog}/>
                    <img src="/add.svg" alt="🌠" className={styles.socialIcon} onClick={navigateToPlaylistAdd}/>
                </div>
            </div>
            <ShareDialog dialogId="shareDialog" linkUrl={location.href}/>
            <NavigationBar
                data={{commentList, playList}}
            /> {/* This remains outside the new container */}
            {commentWriteModalOpen &&
                <TrackCommentWrite trackId={props.trackId}
                                  commentWriteModalOpen={reviewWriteModalOpen}
                                  setCommentWriteModalOpen={setCommentWriteModalOpen}
                                  commentWriteModalBackground={commentWriteModalBackground}
                />
                //trackId, commentWriteModalOpen, setCommentWriteModalOpen, commentWriteModalBackground
            }
        </div>
    );
};

// NavigationBar 컴포넌트
const NavigationBar = (props) => {
    const [tab, setTab] = useState('comment');

    console.log(props.data, "fff")

    const {data} = props;
    const {commentList, playList} = data;

    return (
        <div>
            <div className={styles.navBar}>
                <div className={tab === 'comment' ? styles.activeTab : styles.tab} onClick={() => setTab('review')}>
                    <div>한줄평</div>
                    <div className={styles.indicator}></div>
                </div>
                <div className={tab === 'likes' ? styles.activeTab : styles.tab} onClick={() => setTab('list')}>
                    <div>리스트</div>
                    <div className={styles.indicator}></div>
                </div>
            </div>
            <div>
                {tab === 'comment' && <CommentPage commentList={commentList}/>}
                {tab === 'list' && <ListPage playList={playList}/>}
            </div>
        </div>
    );
};

const TrackDetail = () => {
    const {id} = useParams(); // id 파라미터 추출

    console.log(id)

    return (
        <>
            <TrackDetailPage trackId={id}/>

        </>
    );
}

export default TrackDetail;
