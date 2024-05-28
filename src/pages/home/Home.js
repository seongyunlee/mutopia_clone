import AlbumWall from "../../components/albumWall/AlbumWall";
import styles from "./Home.module.css";
import PlaylistPreview from "../../components/playlistPreview/PlaylistPreview";
import ToggleFilter from "../../components/toggleFilter/ToggleFilter";
import TrackReview from "../../components/trackReview/TrackReview";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContext";
import ReviewPreview from "../../components/reviewPreview/ReviewPreview";
import axios from "axios";

const Home = () => {
    const onContainerClick = () => {
    };

    const userInfo = {};

    const {user, setUser} = useContext(UserContext);
    const [followerReviews, setFollowerReviews] = useState([]);
    const [recentReviews, setRecentReviews] = useState([]);
    const [popularReviews, setPopularReviews] = useState([]);
    const [recentComments, setRecentComments] = useState([]);
    const [popularComments, setPopularComments] = useState([]);
    const [recentPlaylists, setRecentPlaylists] = useState([]);
    const [popularPlaylists, setPopularPlaylists] = useState([]);


    const mockReview =
        {
            "review": {
                "id": 1,
                "title": "두번 깜빡일 수 없다",
                "content": " “다른 문을 열어/따라갈 필요는 없어”라 외쳤던 ‘I am’의 가사가 무색하게 많은 것이 겹쳐 보인다. 베이스라인을 강조한 ‘Off the record’는 피프티 피프티의 ‘Cupid’와 태연의 ‘Weekend’가 레퍼런스로 삼은 도자 캣의 분홍색 디스코 감성을 닮았고, ‘Baddie’의 사운드 질감과 랩 위주의 구성에서 에스파의 ‘Savage’와 NCT의 잔향을 지우기란 쉽지 않다. 전통적인 색채로 ‘정통성’을 손에 쥐었던 아이브가 눈치를 많이 보고 있다.",
                "rating": 4,
                "isLiked": false,
                "likeCount": 0,
                "createdAt": "2024.04.01"
            },
            "writer": {
                "id": "testuser",
                "username": "아무노래나일단틀어",
                "profileImageUrl": "/mock2.jpg"
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

    const mockReview2 =
        {
            "review": {
                "id": 1,
                "title": "전투력이 필요할때 듣자",
                "content": "아이브가 이번 앨범에서 많은 실험을 한 것 같아요. 전체적으로 들어보면 'I am' 때와는 확연히 다른 분위기가 풍기더군요. 특히나 'Off the record'의 디스코 느낌이나 'Baddie'의 랩 포커스는 새로운 시도로서 꽤 성공적이라고 느꼈습니다. 다만, 전체적으로 음악적 일관성을 좀 더 유지했으면 하는 아쉬움이 남습니다.",
                "rating": 4,
                "isLiked": false,
                "likeCount": 0,
                "createdAt": "2024.04.01"
            },
            "writer": {
                "id": "testuser",
                "username": "아무노래나일단틀어",
                "profileImageUrl": "/mock2.svg"
            },
            "album": {
                "id": "6gzKQD8JoD775o5EQXATn5",
                "name": "I'VE MINE",
                "artistName": "IVE",
                "coverImageUrl": "https://i.scdn.co/image/ab67616d0000b27307d0d17f6fb756e66812f86a",
                "releaseDate": "2023-10-13",
                "length": null,
                "totalReviewCount": 6,
                "averageRating": null,
                "totalLikeCount": 0
            }
        }

    const mockReview3 =
        {
            "review": {
                "id": 1,
                "title": "진아언니 커버해줄꺼지?",
                "content": " 시간이 됐어 It's 2 A.M. 이 가사가.. 진아언니가 커버해줄때까지 숨참을꺼임. ",
                "rating": 4,
                "isLiked": false,
                "likeCount": 0,
                "createdAt": "2024.04.01"
            },
            "writer": {
                "id": "testuser",
                "username": "커버해듀오",
                "profileImageUrl": "/defaultProfile.svg"
            },
            "album": {
                "id": "6gzKQD8JoD775o5EQXATn5",
                "name": "I'VE MINE",
                "artistName": "IVE",
                "coverImageUrl": "https://i.scdn.co/image/ab67616d0000b2733bbc6a71db1759c3b0053135",
                "releaseDate": "2023-10-13",
                "length": null,
                "totalReviewCount": 6,
                "averageRating": null,
                "totalLikeCount": 0
            }
        }

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

    const handleLoginCallback = () => {
        if (window.location.search.includes('accessToken')) {
            const token = getJWT();
            saveJWT(token);
            location.href = '/';
            return true;
        }
        return false;
    }


    const handleLogin = () => {

    }

    const handleSignUp = () => {

    }

    const fetchFollowerReviews = () => {
        const token = localStorage.getItem('accessToken')
        if (token === null) {


        } else {

        }

    }

    const fetchRecentReviews = () => {
        axios.get(`${process.env.REACT_APP_API_HOST}/album/review/recent`, {
            params: {
                offset: 0
            }
        }).then((response) => {
            if (response.data !== null) {
                console.log(response.data, "recent reviews");
                setRecentReviews(response.data);
            }
        }).catch((error) => {
            console.error('Failed to fetch recent reviews:', error);
        });
    }

    const fetchPopularReviews = () => {
        axios.get(`${process.env.REACT_APP_API_HOST}/album/review/popular`, {
            params: {
                offset: 0
            }
        }).then((response) => {
            if (response.data !== null) {
                console.log(response.data, "popular reviews")
                setPopularReviews(response.data);
            }
        }).catch((error) => {
            console.error('Failed to fetch popular reviews:', error);
        });
    }

    const fetchRecentComments = () => {
    }

    const fetchPopularComments = () => {

    }

    const fetchRecentPlaylists = () => {
    }

    const fetchPopularPlaylists = () => {

    }

    useEffect(() => {
        fetchRecentReviews();
        fetchPopularReviews();
        fetchRecentComments();
        fetchPopularComments();
        fetchRecentPlaylists();
        fetchPopularPlaylists();
    }, []);

    return (
        <div className={styles.home}>
            {user.id ? (
                    <section className={styles.homeSection}>
                        <div className={styles.sectionTitleContainer}>
                            <div className={styles.sectionTitle}>팔로워들이 듣고있어요 🔍</div>
                        </div>
                        <div className="verticalScroll">
                            {followerReviews.length === 0 ? (
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
                <AlbumWall/>
            </section>


            <section className={styles.homeSection}>
                <div className={styles.sectionTitleContainer}>
                    <div className={styles.sectionTitle}>뮤토피안들의 인생앨범 엿보기 👀</div>
                    <ToggleFilter menu={["최근", "인기"]}/>
                </div>
                <div className="verticalScroll">
                    <ReviewPreview
                        content={mockReview}
                    />
                    <ReviewPreview
                        content={mockReview3}/>
                </div>
            </section>

            <section className={styles.homeSection}>
                <div className={styles.sectionTitleContainer}>
                    <div className={styles.sectionTitle}>뮤토피안들의 인생곡 엿듣기 🎠</div>
                    <ToggleFilter menu={["최근", "인기"]}/>
                </div>
                <div className="verticalScroll">
                    <TrackReview/>
                    <TrackReview/>
                    <TrackReview/>
                </div>
            </section>


            <section className={styles.homeSection}>
                <div className={styles.sectionTitleContainer}>
                    <div className={styles.sectionTitle}>뮤토피안이 사랑한 플레이리스트 💘</div>
                    <ToggleFilter menu={["최근", "인기"]}/>
                </div>
                <div className="verticalScroll">
                    <PlaylistPreview
                        ellipse85="/ellipse-85@2x.png"
                        rectangle1480="/rectangle-1480-2@2x.png"
                        rectangle1479="/rectangle-1479@2x.png"
                        rectangle1478="/rectangle-1478@2x.png"
                        rectangle1477="/rectangle-1477@2x.png"
                        rectangle14781="/rectangle-1478-1@2x.png"
                        rectangle14791="/rectangle-1479-1@2x.png"
                        vector="/vector-15.svg"
                    />
                </div>
            </section>
        </div>
    );
};

export default Home;
