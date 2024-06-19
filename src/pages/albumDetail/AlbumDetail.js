import styles from "./AlbumDetail.module.css";
import {useContext, useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import AlbumReviewWrite from "../../components/albumReviewModal/AlbumReviewWrite";
import ReviewPreview from "../../components/reviewPreview/ReviewPreview";
import ReviewPreviewShort from "../../components/reviewPreviewShort/ReviewPreviewShort";
import PlaylistPreview from "../../components/playlistPreview/PlaylistPreview";
import ToggleFilter from "../../components/toggleFilter/ToggleFilter";
import TrackComment from "../../components/trackComment/TrackComment";
import ShareDialog from "./ShareDialog";
import {UserContext} from "../../context/UserContext";

const MainPage = (props) => {

    const {tracks, reviews, comments} = props;


    return (
        <>
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>                    
                <div className={styles.sectionTitle}>수록곡</div>
            </div>
            <div className={styles.trackListContainer}>
                    {
                        tracks.sort((a, b) => a.trackNumber - b.trackNumber).map((track, index) => {
                            return (
                                <TrackItem key={index} track={track}/>
                            )
                        })
                    }
            </div>
        </section>

        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>                    
                <div className={styles.sectionTitle}>인기 많은 리뷰 🌟 </div>
            </div>
            {reviews?.length > 0 ?
                    <div className="verticalScroll">
                        {reviews?.map((review, index) => {
                            return (<ReviewPreviewShort
                                key={index}
                                content={review}
                            />)
                        })
                        }
                    </div>
                    : <div> 아직 작성된 리뷰가 없습니다. 첫 리뷰를 남겨주세요 🤗 </div>
                }
        </section>

        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>                    
                <div className={styles.sectionTitle}>사랑 받은 한줄평 💜 </div>
            </div>
            {comments?.length > 0 ?
                    <div className="verticalScroll">
                        {comments?.map((comment, index) => {
                            return (<TrackComment
                                key={index}
                                content={comment}
                            />)
                        })
                        }
                    </div>
                    : <div> 아직 작성된 한줄평이 없습니다. 첫 한줄평을 남겨주세요 🤗</div>
                }
        </section>
    </>

    );
    
};

const ReviewPage = (props) => {

    const albumId = props.albumId;

    const [albumReview, setAlbumReview] = useState(null);
    const [trackComment, setTrackComment] = useState(null);
    const albumReviewToggleRef = useRef("최근");
    const trackCommentToggleRef = useRef("최근");

    const fetchAlbumReview = async () => {
        const jwt = localStorage.getItem("accessToken");

        const query = albumReviewToggleRef.current === "최근" ? "recent" : "popular";
        axios.get(`${process.env.REACT_APP_API_HOST}/album/${albumId}/review/${query}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            setAlbumReview(response.data);
        }).catch((error) => {
            console.error('Failed to fetch album reviews', error);
        });
    }

    const fetchTrackComment = async () => {
        const jwt = localStorage.getItem("accessToken");

        const query = trackCommentToggleRef.current === "최근" ? "recent" : "popular";
        axios.get(`${process.env.REACT_APP_API_HOST}/album/${albumId}/song/comment/${query}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            setTrackComment(response.data);
        }).catch((error) => {
            console.error('Failed to fetch track comments', error);
        });
    }

    useEffect(() => {
        fetchAlbumReview();
        fetchTrackComment();
    }, [albumId]);


    return (
        <>
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>                    
                <div className={styles.sectionTitle}>뮤토피안들이 작성한 앨범 리뷰</div>
                <ToggleFilter menu={["최근", "인기"]} onFocusChange={fetchAlbumReview}
                                  tabRef={albumReviewToggleRef}/>
            </div>
            {albumReview?.length > 0 ?
                    <div className="verticalScroll">
                        {albumReview?.map((review, index) => {
                            return (<ReviewPreview
                                key={index}
                                content={review}
                            />)
                        })
                        }
                    </div>
                    : <div> 아직 작성된 리뷰가 없습니다. 첫 리뷰를 남겨주세요 🤗</div>
                }
        </section>

        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>                    
                <div className={styles.sectionTitle}>뮤토피안들이 남긴 한줄평</div>
                <ToggleFilter menu={["최근", "인기"]} onFocusChange={fetchTrackComment}
                                  tabRef={trackCommentToggleRef}/>
            </div>
            {trackComment?.length > 0 ?
                    <div className="verticalScroll">
                        {trackComment?.map((comment, index) => {
                            return (<TrackComment
                                key={index}
                                content={comment}
                            />)
                        })
                        }
                    </div>
                    : <div> 아직 작성된 한줄평이 없습니다. 첫 한줄평을 남겨주세요 🤗</div>
                }
        </section>
        
        </>
        
    );
};


const ListPage = (props) => {

    const albumId = props.albumId;

    const [playList, setPlayList] = useState(null);
    const playListToggleRef = useRef("최근");

    const fetchPlayList = async () => {
        const jwt = localStorage.getItem("accessToken");

        const query = playListToggleRef.current === "최근" ? "recent" : "popular";
        axios.get(`${process.env.REACT_APP_API_HOST}/user/playlist/album/${albumId}/${query}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            setPlayList(response.data);
        }).catch((error) => {
            console.error('Failed to fetch album playlist: ', error);
        });
    }

    useEffect(() => {
        fetchPlayList();
    }, [albumId]);

    return (
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>
                <div className={styles.sectionTitle}>뮤토피안들의 플레이리스트</div>
                <ToggleFilter menu={["최근", "인기"]} onFocusChange={fetchPlayList}
                                  tabRef={playListToggleRef}/>
            </div>
            {playList?.length > 0 ?
                    <div className="verticalScroll">
                        {playList?.map((playlist, index) => {
                            return (<PlaylistPreview key={index} content={playlist}/>)
                        })
                        }
                    </div>
                    : <div> 아직 등록된 플레이리스트가 없습니다. 플레이리스트에 추가해주세요 🤗</div>
                }
        </section>
    );
};

const TrackItem = (props) => {

    const {track} = props;

    const navigate = useNavigate();

    const moveToTrackDetailPage = (trackId) => {
        navigate(`/trackDetail/${trackId}`);
    };

    return (
        <div className={styles.trackItem} onClick={() => moveToTrackDetailPage(track.id)}>
            <div className={styles.trackNumber}>{track.trackNumber}</div>
            <div className={styles.trackTitle}>{track.name}</div>
            <div className={styles.trackDuration}>{track.length}</div>
            <div className={styles.trackRating}>
                <img loading="lazy" src="/YellowStar.svg" alt="⭐️" className={styles.starIcon}/>
                {track.rating ? (track.rating/2).toFixed(1) : "?"}
                <div style={{marginLeft: "5px", color: "#A0A1A4", fontSize: "12px", fontWeight: "400"}}> / 5</div>
            </div>
        </div>
    )

}


// 앨범 상세페이지 컴포넌트
const AlbumDetailsPage = (props) => {

    console.log(props.albumId, "props.albumId");

    const {user, setUser} = useContext(UserContext);

    const [reviewWriteModalOpen, setReviewWriteModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    const reviewWriteModalBackground = useRef();
    const [albumInfo, setAlbumInfo] = useState({});
    const [myRating, setMyRating] = useState(null);
    const [myReviewId, setMyReviewId] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [reviewList, setReviewList] = useState([]);
    const [commentList, setCommentList] = useState([]);

    const addTopster = () => {
        console.log(user.id);
        if (!user?.id) {
            alert('로그인이 필요합니다.');
            const loginDialog = document.getElementById("loginModal");
            loginDialog.showModal();
            return;
        }

        const accessToken = localStorage.getItem('accessToken');
        axios.post(`${process.env.REACT_APP_API_HOST}/user/profile/topster/album`, {
            albumIds: [props.albumId]
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            alert('앨범이 탑스터에 추가되었습니다.');
        }).catch((error) => {
            alert('저장 가능한 탑스터 개수를 초과했습니다. 탑스터를 정리해주세요.');
        });

    }
    

    const fetchAlbumInfo = async () => {
        try {
            setIsLoading(true); // 데이터를 불러오기 시작할 때 로딩 상태를 true로 설정
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/album/info/${props.albumId}`, {});
            console.log(response.data);
            setAlbumInfo(response.data);
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

    };

    const getTopReviews = () => {
        const jwt = localStorage.getItem("accessToken");
        const headers = {}
        if (jwt !== null) {
            headers.Authorization = `Bearer ${jwt}`;
        }
        axios.get(`${process.env.REACT_APP_API_HOST}/album/${props.albumId}/review/popular`, {
            headers: headers
        }).then((response) => {
            setReviewList(response.data);
        }).catch((error) => {
            console.error('Failed to fetch popular album reviews', error);
        });
    }


    const getTopComments = async () => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get(`${process.env.REACT_APP_API_HOST}/album/${props.albumId}/song/comment/popular`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((response) => {
            setCommentList(response.data);
        }).catch((error) => {
            console.error('Failed to fetch popular track comments', error);
        });
    }

    const getMyReview = async () => {
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
                setMyReviewId(response.data.albumReviewId);
                getMyRating(response.data.albumReviewId);
            }
        }).catch((error) => {
            console.error('Failed to fetch my review:', error);
        });
    }

    const getMyRating = async (reviewId) => {
        const jwt = localStorage.getItem("accessToken");
        if (jwt === null) {
            return;
        }
        axios.get(`${process.env.REACT_APP_API_HOST}/album/review/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((response) => {
            if (response.data.rating !== null) {
                setMyRating(response.data.review.rating);
                console.log(myRating, "my rating");
            }
        }).catch((error) => {
            console.error('Failed to fetch my review:', error);
        });
    }

    const moveToMyReviewOrWrite = () => {
        console.log(user.id);
        if (!user?.id) { // if(!user?.id)
            alert('로그인이 필요합니다.');
            const loginDialog = document.getElementById("loginModal");
            loginDialog.showModal();
            return;
        }
        if (myReviewId) {
            window.location.href = `/reviewDetail/${myReviewId}`;
        } else {
            setReviewWriteModalOpen(true);
        }

    }

    const getAlbumLiked = async () => {
        const jwt = localStorage.getItem("accessToken");
        axios.get(`${process.env.REACT_APP_API_HOST}/album/${props.albumId}/like/status`, {
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


    const toggleAlbumLike = () => {
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

        axios.post(`${process.env.REACT_APP_API_HOST}/album/${props.albumId}/like/toggle`, {}, {
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

    const onTopsterAddClicked = () => {
        addTopster();
    }


    useEffect(() => {
        fetchAlbumInfo();
        getMyReview();
        getTopReviews();
        getAlbumLiked();
        getTopComments();
    }, [props.albumId]);

    /*
    useEffect(() => {
        getMyReview();
    }, [user]);
    */

    if (isLoading) {
        return <div>Loading album information...</div>; // 로딩 상태일 때 로딩 메시지 표시
    }

    return (
        <div className={styles.albumPage}>
            <div className={styles.contentContainer}>
                <div className={styles.albumArtContainer}>
                    <img loading="lazy" src={albumInfo.albumImg} alt="Album Art" className={styles.albumArt}/>
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
                            {albumInfo.averageRating ? (albumInfo.averageRating/2).toFixed(1) : 0} / 5.0
                        </div>
                        <div className={styles.label}>전체 평가</div>
                    </div>
                    <div className={styles.ratingItem}>
                        <div className={styles.value}>{myRating ? (myRating/2).toFixed(1) : "-"} / 5.0</div>
                        <div className={styles.label}>내 평가</div>
                    </div>
                </div>

                <button className={styles.reviewButton} onClick={() => moveToMyReviewOrWrite()}>
                    {myReviewId ? "나의 리뷰 보기" : "이 앨범 리뷰하기"}
                </button>
                <div className={styles.socialButtons}>
                    <div className={styles.socialButton}>
                        <img loading="lazy"
                             src={isLiked ? "/favoritefilled.svg" : "/heart-icon.svg"}
                             alt="❤️"
                             className={styles.socialIcon}
                             onClick={toggleAlbumLike}
                        />
                        <span className={styles.likeCount}>{likeCount}</span>
                    </div>
                    <img loading="lazy"
                         src="/share.svg"
                         alt="🔗"
                         className={styles.socialIcon}
                         onClick={showShareDialog}
                    />
                    <img loading="lazy"
                         src="/add.svg"
                         alt="🌠"
                         className={styles.socialIcon}
                         onClick={onTopsterAddClicked}
                    />
                </div>
            </div>
            <ShareDialog dialogId="shareDialog" linkUrl={location.href}/>
            <NavigationBar
                albumId={props.albumId} data={{albumInfo, reviewList, commentList}}
            /> {/* This remains outside the new container */}
            {reviewWriteModalOpen &&
                <AlbumReviewWrite albumId={props.albumId}
                                  reviewWriteModalOpen={reviewWriteModalOpen}
                                  setReviewWriteModalOpen={setReviewWriteModalOpen}
                                  reviewWriteModalBackground={reviewWriteModalBackground}
                />
            }
        </div>
    );
};

// NavigationBar 컴포넌트
const NavigationBar = (props) => {
    const [tab, setTab] = useState('main');

    const {albumInfo, reviewList, commentList} = props.data;

    return (
        <div>
            <div className={styles.navBar}>
                <div className={tab === 'main' ? styles.activeTab : styles.tab} onClick={() => setTab('main')}>
                    <div>메인</div>
                    <div className={styles.indicator}></div>
                </div>
                <div className={tab === 'review' ? styles.activeTab : styles.tab} onClick={() => setTab('review')}>
                    <div>리뷰</div>
                    <div className={styles.indicator}></div>
                </div>
                <div className={tab === 'list' ? styles.activeTab : styles.tab} onClick={() => setTab('list')}>
                    <div>리스트</div>
                    <div className={styles.indicator}></div>
                </div>
            </div>
            <div>
                {tab === 'main' &&
                    <MainPage tracks={albumInfo?.albumTrackList} reviews={reviewList} comments={commentList}/>}
                {tab === 'review' && <ReviewPage albumId={props.albumId}/>}
                {tab === 'list' && <ListPage albumId={props.albumId}/>}
            </div>
        </div>
    );
};

const AlbumDetail = () => {
    const {id} = useParams(); // id 파라미터 추출

    return (
        <>
            <AlbumDetailsPage albumId={id}/>
        </>
    );
}

export default AlbumDetail;
