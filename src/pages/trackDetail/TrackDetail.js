import styles from "./TrackDetail.module.css";
import {useContext, useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import TrackComment from "../../components/trackComment/TrackComment";
import TrackCommentWrite from "../../components/trackCommentModal/TrackCommentWrite";
import PlaylistPreview from "../../components/playlistPreview/PlaylistPreview";
import ShareDialog from "./ShareDialog";
import {UserContext} from "../../context/UserContext";
import PlaylistAddDialog from "../playlist/PlaylistAddDialog";
import ToggleFilter from "../../components/toggleFilter/ToggleFilter";

const CommentPage = (props) => {

    const {trackId, myComment, commentList} = props;

    const [trackComment, setTrackComment] = useState(null);
    const trackCommentToggleRef = useRef("최근");

    const fetchTrackComment = async () => {
        const jwt = localStorage.getItem("accessToken");

        const query = trackCommentToggleRef.current === "최근" ? "recent" : "popular";
        axios.get(`${process.env.REACT_APP_API_HOST}/song/${trackId}/comment/${query}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            setTrackComment(response.data);
        }).catch((error) => {
            console.error('Failed to fetch track comments', error);
        });
    }

    if (myComment === null || commentList.length === 0) {
        console.log("한줄평 없음");
        return (
            <div className={styles.subSection}>
                <div className={styles.noComment}>
                    아직 작성된 한줄평이 없습니다. 첫 한줄평을 남겨주세요.
                </div>
            </div>
        );
    }

    useEffect(() => {
        fetchTrackComment();
    }, []);

    return (
        <>
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>                    
                <div className={styles.sectionTitle}>내가 남긴 한줄평 ✍🏻</div>
            </div>
            {myComment ? 
                    <div className="verticalScroll">
                        <TrackComment content={myComment}/>
                    </div>
                    : <div> 아직 작성된 한줄평이 없습니다. 한줄평을 남겨주세요 👀</div>
                }
        </section>
        
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>                    
                <div className={styles.sectionTitle}>뮤토피안들이 남긴 한줄평</div>
                <ToggleFilter menu={["최근", "인기"]} onFocusChange={fetchTrackComment}
                                  tabRef={trackCommentToggleRef}/>
            </div>
            {commentList?.length > 0 ?
                    <div className="verticalScroll">
                        {commentList?.map((comment, index) => {
                            return (<TrackComment
                                key={index}
                                content={comment}
                            />)
                        })
                        }
                    </div>
                    : <div> 다른 뮤토피안들이 남긴 한줄평이 아직 없습니다 페이지를 공유해서 소통해보세요! </div>
                }
        </section>

        </>
    );
};


const ListPage = (props) => {

    const {playList} = props.playList;

    if (!playList || !Array.isArray(playList) || playList.length === 0) {
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
                <PlaylistPreview key={index} comment={comment}/>
            ))}
        </div>
    );

};

// 곡 상세페이지 컴포넌트
const TrackDetailPage = (props) => {
    console.log(props.trackId)

    const {user, setUser} = useContext(UserContext);

    const [commentWriteModalOpen, setCommentWriteModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    const commentWriteModalBackground = useRef();
    const [trackInfo, setTrackInfo] = useState(null);
    const [myRating, setMyRating] = useState("-");
    const [myComment, setMyComment] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [commentList, setCommentList] = useState([]);
    const [playList, setPlayList] = useState([]);
    const navigate = useNavigate();
    const playlistDialogRef = useRef();

    // 곡 추가 페이지로 이동
    const addToPlaylist = () => {
        if (!user?.id) { //!user?.id
            alert('로그인이 필요합니다.');
            const loginDialog = document.getElementById("loginModal");
            loginDialog.showModal();
        } else {
            playlistDialogRef.current?.showModal();
        }
    };


    const getRecentReviews = () => {
        const jwt = localStorage.getItem("accessToken");
        const headers = {}
        if (jwt !== null) {
            headers.Authorization = `Bearer ${jwt}`;
        }
        axios.get(`${process.env.REACT_APP_API_HOST}/song/${props.trackId}/comment/recent`, {
            headers: headers
        }).then((response) => {
            const data = response.data;
            const filteredData = data.filter(comment => comment.writer.userId !== user.id);        
            setCommentList(filteredData);
        }).catch((error) => {
            console.error('Failed to fetch recent comments', error);
            alert('잘못된 접근입니다.');
        });
    }


    const fetchTrackInfo = async () => {
        const jwt = localStorage.getItem("accessToken");
        axios.get(`${process.env.REACT_APP_API_HOST}/song/info/${props.trackId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            if (response.data !== null) {
                setTrackInfo(response.data);
            } else {
                console.error('Failed to fetch track information:', error);
                alert('잘못된 접근입니다.');
                history.back();
            }
        }).catch((error) => {
            console.error('Failed to fetch track information:', error);
            alert('잘못된 접근입니다.');
            history.back();
        });
    }

    const showShareDialog = () => {
        const dialog = document.getElementById("shareDialog");
        dialog.showModal();

    }

    const getTrackLiked = async () => {
        console.log(user.id);
        const jwt = localStorage.getItem("accessToken");
        axios.get(`${process.env.REACT_APP_API_HOST}/song/${props.trackId}/like/status`, {
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

    const getMyCommentAndRating = async () => {
        if (user === null) { // 나중에 삭제해야함
            user.id === "testuser";
        }
        const jwt = localStorage.getItem("accessToken");
        if (jwt === null) {
            return;
        }
        axios.get(`${process.env.REACT_APP_API_HOST}/user/${user.id}/song/${props.trackId}/comment/recent`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            if (response.data.length !== 0) {
                setMyComment(response.data);
                setMyRating(response.data.songComment.rating);
            } else {

            }

        }).catch((error) => {
            console.error('Failed to fetch my comment:', error);
        });
    }

    const moveToMyReviewOrWrite = () => {
        console.log(user.id);
        if (!user?.id) { //!user?.id
            alert('로그인이 필요합니다.');
            const loginDialog = document.getElementById("loginModal");
            loginDialog.showModal();
            return;
        }
        if (myComment !== null) {
            return ;
        } else {
            setCommentWriteModalOpen(true);
        }

    }

    const toggleTrackLike = () => {
        const jwt = localStorage.getItem("accessToken");
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

        axios.post(`${process.env.REACT_APP_API_HOST}/song/${props.trackId}/like/toggle`, {}, {
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

    const moveToAlbumDetail = () => {
        navigate(`/albumDetail/${trackInfo.albumId}`);
    }


    useEffect(() => {
        setIsLoading(true);
        fetchTrackInfo();
        getMyCommentAndRating();
        getTrackLiked();
        getRecentReviews();
        setIsLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 설정
        console.log(myComment, "my comment");
        console.log(commentList, "comment list");
    }, []);

    if (isLoading) {
        return <div>Loading track information...</div>; // 로딩 상태일 때 로딩 메시지 표시
    }

    return (
        <div className={styles.albumPage}>
            <div className={styles.contentContainer}>
                <div className={styles.albumArtContainer}>
                    <img src={trackInfo.albumCoverUrl} alt="Album Art" className={styles.albumArt}
                         onClick={moveToAlbumDetail}/>
                </div>
                <div className={styles.albumInfo}>
                    <h1>{trackInfo.trackName}</h1>
                    <h2>{trackInfo.albumName}</h2>
                    <h3>{trackInfo.artistName}</h3>
                </div>
                <div className={styles.ratingInfo}>
                    <div className={styles.ratingItem}>
                        <div className={styles.value}>
                            {trackInfo.commentCount ? trackInfo.commentCount : 0}</div>
                        <div className={styles.label}>총 한줄평</div>
                    </div>
                    <div className={styles.ratingItem}>
                        <div className={styles.value}>
                            {trackInfo.averageRating ? trackInfo.averageRating.toFixed(1) / 2 : 0} / 5.0
                        </div>
                        <div className={styles.label}>전체 평가</div>
                    </div>
                    <div className={styles.ratingItem}>
                        <div className={styles.value}>{`${myRating / 2 ? myRating / 2 : '?'} / 5.0`} </div>
                        <div className={styles.label}>내 평가</div>
                    </div>
                </div>

                <button className={styles.reviewButton} onClick={() => moveToMyReviewOrWrite()}>
                    {myComment ? "나의 한줄평 보기" : "한줄평 작성하기"}
                </button>
                <div className={styles.socialButtons}>
                    <div className={styles.socialButton}>
                        <img
                            src={isLiked ? "/favoritefilled.svg" : "/heart-icon.svg"}
                            alt="❤️"
                            className={styles.socialIcon}
                            onClick={toggleTrackLike}
                        />
                        <span className={styles.likeCount}>{likeCount}</span>
                    </div>
                    <img
                        src="/share.svg"
                        alt="🔗"
                        className={styles.socialIcon}
                        onClick={showShareDialog}
                    />
                    <img
                        src="/add.svg"
                        alt="🌠"
                        className={styles.socialIcon}
                        onClick={addToPlaylist}
                    />
                </div>
            </div>
            <PlaylistAddDialog dialogRef={playlistDialogRef} songId={props.trackId}/>
            <ShareDialog dialogId="shareDialog" linkUrl={location.href}/>
            <NavigationBar
                trackId={props.trackId} data={{ myComment, commentList, playList}}
            /> {/* This remains outside the new container */}
            {commentWriteModalOpen &&
                <TrackCommentWrite trackId={props.trackId}
                                   commentWriteModalOpen={commentWriteModalOpen}
                                   setCommentWriteModalOpen={setCommentWriteModalOpen}
                                   commentWriteModalBackground={commentWriteModalBackground}
                />
            }
        </div>
    );
};

// NavigationBar 컴포넌트
const NavigationBar = (props) => {
    const [tab, setTab] = useState('comment');

    console.log(props.data, "fff")
    const {trackId} = props.trackId;
    const {data} = props.data;
    const {myComment, commentList, playList} = data;

    console.log(myComment, commentList, playList, "nav bar")

    return (
        <div>
            <div className={styles.navBar}>
                <div className={tab === 'comment' ? styles.activeTab : styles.tab} onClick={() => setTab('comment')}>
                    <div>한줄평</div>
                    <div className={styles.indicator}></div>
                </div>
                <div className={tab === 'list' ? styles.activeTab : styles.tab} onClick={() => setTab('list')}>
                    <div>리스트</div>
                    <div className={styles.indicator}></div>
                </div>
            </div>
            <div>
                {tab === 'comment' && <CommentPage trackId={trackId} myComment={myComment} commentList={commentList}/>}
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
