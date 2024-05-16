import AlbumWall from "../../components/albumWall/AlbumWall";
import styles from "./Home.module.css";
import PlaylistPreview from "../../components/playlistPreview/PlaylistPreview";
import ToggleFilter from "../../components/toggleFilter/ToggleFilter";
import TrackReview from "../../components/trackReview/TrackReview";
import {useContext, useEffect} from "react";
import {UserContext} from "../../context/UserContext";
import ReviewPreview from "../../components/reviewPreview/ReviewPreview";

const Home = () => {
    const onContainerClick = () => {
    };

    const userInfo = {};

    const {user, setUser} = useContext(UserContext);


    const mockReview =
        {
            "review": {
                "id": 1,
                "title": "asdvc",
                "content": "asdf",
                "rating": 4,
                "isLiked": false,
                "likeCount": 0,
                "createdAt": "1970-01-05"
            },
            "writer": {
                "id": "testuser",
                "username": "테스트유저",
                "profileImageUrl": "https://icampus.skku.edu/customs/main/header_logo.png?v=123213"
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


    return (
        <div className={styles.home}>
            {user.id ? (
                    <section className={styles.homeSection}>
                        <div className={styles.sectionTitleContainer}>
                            <div className={styles.sectionTitle}>팔로워들이 듣고있어요 🔍</div>
                        </div>
                        <div className="verticalScroll">
                            <ReviewPreview
                                content={mockReview}
                            />
                            <ReviewPreview
                                content={mockReview}/>
                        </div>
                    </section>) :
                <div className={styles.mutopiaInfo} style={{backgroundImage: `url(/intro-background.png)`}}>
                    <img src="/mutopia.svg" alt="" className={styles.mutopiaLogo}/>
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
                        content={mockReview}/>
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
