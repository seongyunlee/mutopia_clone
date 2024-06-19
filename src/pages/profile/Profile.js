import ProfileHeader from "../../components/profileHeader/ProfileHeader";
import TopsterDisplay from "../../components/topsterDisplay/TopsterDisplay";
import ReviewPreview from "../../components/reviewPreview/ReviewPreview";
import TrackReview from "../../components/trackReview/TrackReview";
import PlaylistPreview from "../../components/playlistPreview/PlaylistPreview";
import LikedAlbumList from "../../components/likedAlbumList/LikedAlbumList";
import LikedTrackList from "../../components/likedTrackList/LikedTrackList";
import styles from "./Profile.module.css";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContext";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import TrackComment from "../../components/trackComment/TrackComment";

const MainPage = (props) => {
    const {userInfo, isMine, albumReview, topsterInfo, trackReview, refreshTopster} = props;


    const {user} = useContext(UserContext);

    const [isTopsterEraseMode, setIsTopsterEraseMode] = useState(false);
    const titleMine = ["나의 뮤직보드 🎵", "인기 많은 리뷰 🌟", "사랑받은 한줄평 💜"];
    const titleOthers = ["의 뮤직보드 🎵", "인기 많은 리뷰 🌟", "사랑받은 한줄평 💜"];


    return (
        <div className={styles.TabSection}>
            <section className={styles.subSection}>
                <div className={styles.sectionTitleContainer}>
                    <div
                        className={styles.sectionTitle}>{isMine ? titleMine[0] : userInfo.username + titleOthers[0]}</div>
                    {isMine &&
                        <div title="editProfile" className={styles.btnEditTopster}
                             onClick={() => setIsTopsterEraseMode(!isTopsterEraseMode)}>
                            {isTopsterEraseMode ? "완료" : "편집"}
                        </div>
                    }
                </div>
                <TopsterDisplay topsterInfo={topsterInfo} isErasable={isTopsterEraseMode}
                                refreshTopster={refreshTopster}/>
            </section>
            <section className={styles.subSection}>
                <div className={styles.sectionTitleContainer}>
                    <div
                        className={styles.sectionTitle}>{isMine ? titleMine[1] : titleOthers[1]}</div>
                </div>
                {
                    albumReview?.length === 0 ? <div>아직 작성된 리뷰가 없습니다. 첫 리뷰를 남겨주세요 🤗</div> :
                        <div className="verticalScroll">
                            {
                                albumReview.map((review, index) => (<ReviewPreview content={review} key={index}/>))
                            }
                        </div>
                }
            </section>
            <section className={styles.subSection}>
                <div className={styles.sectionTitleContainer}>
                    <div
                        className={styles.sectionTitle}>{isMine ? titleMine[2] : titleOthers[2]}</div>
                </div>
                {
                    trackReview?.length === 0 ? <div>아직 작성된 한줄평이 없습니다. 첫 한줄평을 남겨주세요 🤗</div> :
                        <div className="verticalScroll">
                            {
                                trackReview.map((review, index) => (<TrackComment content={review} key={index}/>))
                            }
                        </div>
                }
            </section>
        </div>
    )

};

const ReviewPage = (props) => {
    const {userInfo, isMine, playList, albumReview, trackReviews} = props;


    const {user, setUser} = useContext(UserContext);
    const titleMine = ["나의 리뷰 앨범 💿", "나의 한줄평 ✍🏻", "나의 플레이리스트 🎧"];
    const titleOthers = ["의 리뷰 앨범 💿", "의 한줄평 ✍🏻", "의 플레이리스트 🎧"];


    return (
        <div className={styles.TabSection}>
            <section className={styles.subSection}>
                <div className={styles.sectionTitleContainer}>
                    <div
                        className={styles.sectionTitle}>{isMine ? titleMine[0] : userInfo.username + titleOthers[0]}</div>
                </div>
                {albumReview?.length === 0 ? <div>아직 작성된 리뷰가 없습니다. 첫 리뷰를 남겨주세요 🤗</div> :
                    <div className="verticalScroll">
                        {
                            albumReview.map((review, index) => (<ReviewPreview content={review} key={index}/>))
                        }
                    </div>
                }

            </section>
            <section className={styles.subSection}>
                <div className={styles.sectionTitleContainer}>
                    <div
                        className={styles.sectionTitle}>{isMine ? titleMine[1] : userInfo.username + titleOthers[1]}</div>
                </div>
                {!trackReviews?.length > 0 ? <div>아직 작성된 한줄평이 없습니다. 첫 한줄평을 남겨주세요 🤗</div> :
                    <div className="verticalScroll">
                        {
                            trackReviews.map((review, index) => (<TrackComment content={review} key={index}/>))
                        }
                    </div>
                }
            </section>
            <section className={styles.subSection}>
                <div className={styles.sectionTitleContainer}>
                    <div
                        className={styles.sectionTitle}>{isMine ? titleMine[2] : userInfo.username + titleOthers[2]}</div>
                </div>
                {
                    !playList?.length > 0 ? <div>아직 등록된 플레이리스트가 없습니다. 첫 플레이리스트를 만들어주세요 🤗.</div> :
                        <div className="verticalScroll">
                            {
                                playList.map((playlist, index) => (<PlaylistPreview content={playlist} key={index}/>))
                            }
                        </div>
                }
            </section>
        </div>
    )
};

const LikesPage = (props) => {

    const {userInfo, isMine, likeAlbums, likeTracks, likeReviews, likeComments, likePlaylists} = props;

    const {user, setUser} = useContext(UserContext);
    // 자신의 프로필이라고 가정
    const title = ["좋아요한 앨범 💘", "좋아요한 곡 ❣️", "좋아요한 리뷰 💜", "찜한 플레이리스트 🎧", "좋아요한 한줄평 📝"];

    return (
        <div className={styles.TabSection}>
            <section className={styles.subSection}>
                <div className={styles.sectionTitleContainer}>
                    <div className={styles.sectionTitle}>{title[0]}</div>
                </div>
                {likeAlbums?.length === 0 ? <div>좋아요한 앨범이 없습니다.</div> :
                    <div className="verticalScroll">
                        <LikedAlbumList list={likeAlbums}/>
                    </div>
                }

            </section>
            <section className={styles.subSection}>
                <div className={styles.sectionTitleContainer}>
                    <div className={styles.sectionTitle}>{title[1]}</div>
                </div>
                {likeTracks?.length === 0 ? <div>좋아요한 곡이 없습니다.</div> :
                    <div className="verticalScroll">
                        <LikedTrackList list={likeTracks}/>
                    </div>
                }

            </section>
            <section className={styles.subSection}>
                <div className={styles.sectionTitleContainer}>
                    <div className={styles.sectionTitle}>{title[2]}</div>
                </div>
                {likeReviews?.length === 0 ? <div>좋아요한 리뷰가 없습니다.</div> :
                    <div className="verticalScroll">
                        {
                            likeReviews.map((review, index) => (<ReviewPreview content={review} key={index}/>))
                        }
                    </div>
                }

            </section>
            <section className={styles.subSection}>
                <div className={styles.sectionTitleContainer}>
                    <div className={styles.sectionTitle}>{title[4]}</div>
                </div>
                {likeComments?.length === 0 ? <div>좋아요한 한줄평이 없습니다.</div> :
                    <div className="verticalScroll">
                        {
                            likeComments.map((comment, index) => {

                                    return (<TrackComment content={comment} key={index}/>)
                                }
                            )
                        }
                    </div>}
            </section>
            <section className={styles.subSection}>
                <div className={styles.sectionTitleContainer}>
                    <div className={styles.sectionTitle}>{title[3]}</div>
                </div>
                {likePlaylists?.length === 0 ? <div>찜한 플레이리스트가 없습니다.</div> :
                    <div className="verticalScroll">
                        {
                            likePlaylists.map((playlist, index) => (<PlaylistPreview content={playlist} key={index}/>))
                        }
                    </div>
                }
            </section>
        </div>
    )

};

const Profile = (props) => {
    const {user, setUser} = useContext(UserContext);
    const [albumReview, setAlbumReview] = useState([]);
    const [popularReview, setPopularReview] = useState([]);
    const [popularComment, setPopularComment] = useState([]);
    const [tab, setTab] = useState('main');
    const [isMine, setIsMine] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const [topsterInfo, setTopsterInfo] = useState([]);
    const [trackReviews, setTrackReviews] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [likeAlbums, setLikeAlbums] = useState([]);
    const [likeTracks, setLikeTracks] = useState([]);
    const [likeReviews, setLikeReviews] = useState([]);
    const [likeComments, setLikeComments] = useState([])
    const [likePlaylists, setLikePlaylists] = useState([]);

    const navigate = useNavigate();


    const userId = useParams().id;


    const checkIsMine = () => {
        console.log(user, "user");
        if (user.id === userId) {
            setIsMine(true);
        }
    }

    useEffect(() => {
        checkIsMine();
    }, [user]);

    const getTopsterInfo = () => {
        const accessToken = localStorage.getItem('accessToken');

        axios.get(`${process.env.REACT_APP_API_HOST}/user/${userId}/profile/topster`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((response) => {
            setTopsterInfo(response.data);
            setIsLoading(false);
        }).catch((error) => {
        });
    }

    const getAlbumReview = () => {
        const accessToken = localStorage.getItem('accessToken');

        axios.get(`${process.env.REACT_APP_API_HOST}/user/${userId}/album/review/recent`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((response) => {
            setAlbumReview(response.data);
            setIsLoading(false);
        }).catch((error) => {
        });
    }

    const getPopularReview = () => {
        const accessToken = localStorage.getItem('accessToken');

        axios.get(`${process.env.REACT_APP_API_HOST}/user/${userId}/album/review/popular`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((response) => {
            setPopularReview(response.data);
            setIsLoading(false);
        }).catch((error) => {
        });
    }



    const getProfileHeader = () => {
        axios.get(`${process.env.REACT_APP_API_HOST}/user/${userId}/profile/aggregation`, {}).then((response) => {
            setUserInfo({...response.data, userId: userId});
            setIsLoading(false);
        }).catch((error) => {
            alert("잘못된 접근입니다.")
            navigate(-1);
        });
    }

    const getUserTrackReviews = () => {
        const accessToken = localStorage.getItem('accessToken');

        axios.get(`${process.env.REACT_APP_API_HOST}/user/${userId}/song/comment/recent`, {
            params: {
                offset: 0,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((response) => {
            setTrackReviews(response.data);
        }).catch((error) => {
            console.error('Failed to fetch comments:', error);
        });
    }

    const getUserPopularComment = () => {
        const accessToken = localStorage.getItem('accessToken');

        axios.get(`${process.env.REACT_APP_API_HOST}/user/${userId}/song/comment/popular`, {
            params: {
                offset: 0,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((response) => {
            setPopularComment(response.data);
        }).catch((error) => {
            console.error('Failed to fetch comments:', error);
        });
    }

    const getUserPlaylists = () => {
        const accessToken = localStorage.getItem('accessToken');

        axios.get(`${process.env.REACT_APP_API_HOST}/user/${userId}/playlist?limit=10`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((response) => {
            setPlaylists(response.data);
        }).catch((error) => {
            console.error('Failed to fetch playlists:', error);
        });
    }
    const getLikeAlbums = () => {
        const accessToken = localStorage.getItem('accessToken');

        axios.get(`${process.env.REACT_APP_API_HOST}/album/like/${userId}`, {
            params: {
                page: 0,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((response) => {
            setLikeAlbums(response.data);
        }).catch((error) => {
            console.error('Failed to fetch liked albums:', error);
        });
    }

    const getLikeTracks = () => {

        const accessToken = localStorage.getItem('accessToken');

        axios.get(`${process.env.REACT_APP_API_HOST}/song/like/${userId}`, {
            params: {
                page: 0,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((response) => {
            setLikeTracks(response.data);
        }).catch((error) => {
            console.error('Failed to fetch liked tracks:', error);
        });

    }

    const getLikeReviews = () => {

        const accessToken = localStorage.getItem('accessToken');
        axios.get(`${process.env.REACT_APP_API_HOST}/album/review/like/${userId}`, {
            params: {
                offset: 0,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                    setLikeReviews(response.data);
                }
            )
    }

    const getLikeComments = () => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get(`${process.env.REACT_APP_API_HOST}/song/comment/like/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                page: 0,
            }
        })
            .then((response) => {
                    setLikeComments(response.data);
                }
            )
    }

    const getLikePlaylists = () => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get(`${process.env.REACT_APP_API_HOST}/user/${userId}/playlist/like`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                page: 0,
            }
        })
            .then((response) => {
                    setLikePlaylists(response.data);
                }
            )
    }


    useEffect(() => {
        getProfileHeader();
        getTopsterInfo()
        getAlbumReview();
        getPopularReview();
        getUserTrackReviews();
        getUserPopularComment();
        getUserPlaylists();
        getLikeAlbums();
        getLikeTracks();
        getLikeReviews();
        getLikeComments();
        getLikePlaylists();
    }, []);


    return (
        <div className={styles.profileContainer}>
            <ProfileHeader userInfo={userInfo} isMine={isMine}/>
            <div className={styles.profileNavBar}>
                <div className={tab === 'main' ? styles.activeTab : styles.tab} onClick={() => setTab('main')}>
                    <img src="/profilemain.svg"/>
                    <div className={styles.indicator}></div>
                </div>
                <div className={tab === 'review' ? styles.activeTab : styles.tab} onClick={() => setTab('review')}>
                    <img src="/profilereview.svg"/>
                    <div className={styles.indicator}></div>
                </div>
                <div className={tab === 'likes' ? styles.activeTab : styles.tab} onClick={() => setTab('likes')}>
                    <img src="/profilefavorite.svg"/>
                    <div className={styles.indicator}></div>
                </div>
            </div>
            <div>
                {tab === 'main' &&
                    <MainPage userInfo={userInfo} isMine={isMine} albumReview={popularReview} topsterInfo={topsterInfo}
                              trackReview={popularComment} refreshTopster={getTopsterInfo}
                    />}
                {tab === 'review' &&
                    <ReviewPage userInfo={userInfo} isMine={isMine} albumReview={albumReview}
                                trackReviews={trackReviews}
                                playList={playlists}/>}
                {tab === 'likes' &&
                    <LikesPage userInfo={userInfo} isMine={isMine} likeAlbums={likeAlbums} likeTracks={likeTracks}
                               likeReviews={likeReviews}
                               likeComments={likeComments} likePlaylists={likePlaylists}/>}
            </div>
        </div>
    );
}

export default Profile;