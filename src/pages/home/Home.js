import AlbumWall from "../../components/albumWall/AlbumWall";
import styles from "./Home.module.css";
import ToggleFilter from "../../components/toggleFilter/ToggleFilter";
import TrackComment from "../../components/trackComment/TrackComment";
import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../context/UserContext";
import ReviewPreview from "../../components/reviewPreview/ReviewPreview";
import axios from "axios";
import PlaylistPreview from "../../components/playlistPreview/PlaylistPreview";

const Home = () => {
    const onContainerClick = () => {
    };

    const userInfo = {};

    const {user, setUser} = useContext(UserContext);
    const [followerReviews, setFollowerReviews] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [comments, setComments] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [recommendations, setRecommendations] = useState([]);


    const reviewTabRef = useRef("최근");
    const commentTabRef = useRef("최근");
    const playlistTabRef = useRef("최근");

    const getJWT = () => {
        // get token from query string "accessToken"
        const query = window.location.search;
        const urlParams = new URLSearchParams(query);
        const token = urlParams.get('accessToken');
        return token;
    }

    const saveJWT = (token) => {
        localStorage.setItem('accessToken', token);
    }

    useEffect(() => {
        handleLoginCallback();
    }, []);


    const getRecommendation = () => {
        axios.get(`${process.env.REACT_APP_API_HOST}/playlist/trending`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then((response) => {
            setRecommendations(response.data?.songs)
        }).catch((error) => {
        });

    }

    const handleLoginCallback = () => {
        if (window.location.search.includes('accessToken')) {
            const token = getJWT();
            saveJWT(token);
            location.href = '/';
            return true;
        }
        return false;
    }

    const fetchFollowerReviews = () => {
        if (user?.id === null) {
            return;
        }

        const token = localStorage.getItem('accessToken');

        axios.get(`${process.env.REACT_APP_API_HOST}/user/following/review/recent`, {
            params: {
                page: 0
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.data !== null) {
                setFollowerReviews(response.data);
            }
        }).catch((error) => {
            console.error('Failed to fetch follower reviews:', error);
        });
    }


    const fetchReviews = () => {
        const query = reviewTabRef.current === "최근" ? "recent" : "popular";
        const token = localStorage.getItem('accessToken');

        axios.get(`${process.env.REACT_APP_API_HOST}/album/review/${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            , params: {
                offset: 0
            }
        }).then((response) => {
            if (response.data !== null) {
                setReviews(response.data);
            }
        }).catch((error) => {
        });
    }


    const fetchComments = () => {
        const token = localStorage.getItem('accessToken');
        const query = commentTabRef.current === "최근" ? "recent" : "popular";

        axios.get(`${process.env.REACT_APP_API_HOST}/song/comment/${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                offset: 0
            }
        }).then((response) => {
            if (response.data !== null) {
                setComments(response.data);
            }
        }).catch((error) => {
        })
    }


    const fetchPlaylists = () => {
        const token = localStorage.getItem('accessToken');
        const query = playlistTabRef.current === "최근" ? "recent" : "popular";

        axios.get(`${process.env.REACT_APP_API_HOST}/user/playlist/${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.data !== null) {
                setPlaylists(response.data);
            }
        }).catch((error) => {
        })
    }


    useEffect(() => {
        fetchReviews();
        fetchComments();
        fetchFollowerReviews();
        fetchPlaylists();
        getRecommendation();
    }, [user]);

    return (
        <div className={styles.home}>
            {user.id ? (
                    <section className={styles.homeSection}>
                        <div className={styles.sectionTitleContainer}>
                            <div className={styles.sectionTitle}>팔로워들이 듣고있어요 🔍</div>
                        </div>
                        <div className="verticalScroll">
                            {followerReviews?.length === 0 ? (
                                <div>팔로워의 최근 리뷰가 없어요! 팔로워를 더 등록해보세요 👀</div>
                            ) : (
                                followerReviews.map((review, index) => (
                                    <ReviewPreview key={index} content={review}/>
                                ))
                            )}
                        </div>
                    </section>) :
                <div className={styles.mutopiaInfo} style={{backgroundImage: `url(/intro-background.png)`}}>
                    <img loading="lazy" src="/mutopia.svg" alt="" className={styles.mutopiaLogo}/>
                    <div className={styles.mutopiaDescription}>전 세계 음악 팬들과 함께 취향을 공유해 보세요.</div>
                    <div className={styles.mutopiaDetail}>Mutopia는 여러분이 듣는 모든 음악을 기록하고 친구들과 음악에 대한 열정을 나눌 수 있는 소셜
                        플랫폼입니다.
                        <br/>나만의 취향을 마음껏 펼치며, 음악계에서 가장 빠르게 성장하는 커뮤니티에서 자신만의 리스트를 공유해보세요.
                    </div>
                </div>}

            <section className={styles.homeSection}>
                <div className={styles.sectionTitleContainer}>
                    <div className={styles.sectionTitle}>오늘 이거 들을까요? 🎧</div>
                </div>
                <AlbumWall albums={recommendations}/>
            </section>


            <section className={styles.homeSection}>
                <div className={styles.sectionTitleContainer}>
                    <div className={styles.sectionTitle}>뮤토피안들의 인생앨범 엿보기 👀</div>
                    <ToggleFilter menu={["최근", "인기"]} tabRef={reviewTabRef} onFocusChange={fetchReviews}/>
                </div>
                {reviews?.length !== 0 &&
                    <div className="verticalScroll">
                        {reviews.map((review, index) => (
                            <ReviewPreview key={index} content={review}/>
                        ))}
                    </div>
                }
            </section>

            <section className={styles.homeSection}>
                <div className={styles.sectionTitleContainer}>
                    <div className={styles.sectionTitle}>뮤토피안들의 인생곡 엿듣기 🎠</div>
                    <ToggleFilter menu={["최근", "인기"]} tabRef={commentTabRef} onFocusChange={fetchComments}/>
                </div>
                {comments?.length !== 0 &&
                    <div className="verticalScroll">
                        {comments.map((comment, index) => (
                            <TrackComment key={index} content={comment}/>
                        ))}
                    </div>
                }
            </section>


            <section className={styles.homeSection}>
                <div className={styles.sectionTitleContainer}>
                    <div className={styles.sectionTitle}>뮤토피안이 사랑한 플레이리스트 💘</div>
                    <ToggleFilter menu={["최근", "인기"]} tabRef={playlistTabRef} onFocusChange={fetchPlaylists}/>
                </div>
                {playlists?.length !== 0 &&
                    <div className="verticalScroll">
                        {
                            playlists.map((playlist, index) => (
                                <PlaylistPreview key={index} content={playlist}/>
                            ))
                        }
                    </div>
                }
            </section>
        </div>
    );
};

export default Home;
