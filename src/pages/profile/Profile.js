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

const testJwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MTUwOTgwMzUsImV4cCI6MTc0NjYzNDA4NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoidGVzdHVzZXIiLCJSb2xlIjoiVVNFUiJ9.1_R8SRfmLEGy3YB5nVfHYU6om-g7tbifxyRmHAYV4D4"

const MainPage = (props) => {
    const {userInfo, isMine, albumReview, topsterInfo, trackReview, refreshTopster} = props;


    const {user} = useContext(UserContext);

    const [isTopsterEraseMode, setIsTopsterEraseMode] = useState(false);
    const titleMine = ["내 뮤직보드 🎵", "내가 리뷰한 앨범 💿", "내가 남긴 한줄평 ✍🏻"];
    const titleOthers = ["의 뮤직보드 🎵", "의 인생 앨범 💿", "의 인생곡 ✍🏻"];

    /*    const mockReview =
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
        const mockReview2 =
            {
                "review": {
                    "id": 1,
                    "title": "두번깜빡일수없다",
                    "content": " “다른 문을 열어/따라갈 필요는 없어”라 외쳤던 ‘I am’의 가사가 무색하게 많은 것이 겹쳐 보인다. 베이스라인을 강조한 ‘Off the record’는 피프티 피프티의 ‘Cupid’와 태연의 ‘Weekend’가 레퍼런스로 삼은 도자 캣의 분홍색 디스코 감성을 닮았고, ‘Baddie’의 사운드 질감과 랩 위주의 구성에서 에스파의 ‘Savage’와 NCT의 잔향을 지우기란 쉽지 않다. 전통적인 색채로 ‘정통성’을 손에 쥐었던 아이브가 눈치를 많이 보고 있다.",
                    "rating": 4,
                    "isLiked": false,
                    "likeCount": 0,
                    "createdAt": "2024.04.01"
                },
                "writer": {
                    "id": "testuser",
                    "username": "바보랜드",
                    "profileImageUrl": "/mock3.jpg"
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
            }*/

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
                        className={styles.sectionTitle}>{isMine ? titleMine[1] : userInfo.username + titleOthers[1]}</div>
                </div>
                {
                    albumReview?.length === 0 ? <div>리뷰가 없습니다.</div> :
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
                        className={styles.sectionTitle}>{isMine ? titleMine[2] : userInfo.username + titleOthers[2]}</div>
                </div>
                {
                    trackReview?.length === 0 ? <div>한줄평이 없습니다.</div> :
                        <div className="verticalScroll">
                            {
                                trackReview.map((review, index) => (<TrackReview content={review} key={index}/>))
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
                {albumReview?.length === 0 ? <div>리뷰가 없습니다.</div> :
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
                {!trackReviews?.length > 0 ? <div>한줄평이 없습니다.</div> :
                    <div className="verticalScroll">
                        {
                            trackReviews.map((review, index) => (<TrackReview content={review} key={index}/>))
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
                    !playList?.length > 0 ? <div>플레이리스트가 없습니다.</div> :
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
    const title = ["좋아요한 앨범 💘", "좋아요한 곡 ❣️", "내가 좋아요한 리뷰 💜", "찜한 플레이리스트 🎧"];

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
                <div className="verticalScroll">
                    <TrackReview/>
                    <TrackReview/>
                    <TrackReview/>
                    <TrackReview/>
                    <TrackReview/>
                    <TrackReview/>
                    <TrackReview/>
                    <TrackReview/>
                    <TrackReview/>
                    <TrackReview/>
                </div>
            </section>
            <section className={styles.subSection}>
                <div className={styles.sectionTitleContainer}>
                    <div className={styles.sectionTitle}>{title[3]}</div>
                </div>
                <PlaylistPreview/>
            </section>
        </div>
    )

};

const Profile = (props) => {
    const {user, setUser} = useContext(UserContext);
    const [albumReview, setAlbumReview] = useState([]);
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
        axios.get(`${process.env.REACT_APP_API_HOST}/user/${userId}/profile/topster`, {}).then((response) => {
            setTopsterInfo(response.data);
            setIsLoading(false);
        }).catch((error) => {
        });
    }

    const getAlbumReview = () => {
        axios.get(`${process.env.REACT_APP_API_HOST}/user/${userId}/album/review/recent`, {}).then((response) => {
            setAlbumReview(response.data);
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
        axios.get(`${process.env.REACT_APP_API_HOST}/user/${userId}/song/comment/recent`, {
            params: {
                offset: 0,
            }
        }).then((response) => {
            setTrackReviews(response.data);
        }).catch((error) => {
            console.error('Failed to fetch comments:', error);
        });
    }

    const getUserPlaylists = () => {
        axios.get(`${process.env.REACT_APP_API_HOST}/user/${userId}/playlist?limit=10`, {}).then((response) => {
            setPlaylists(response.data);
        }).catch((error) => {
            console.error('Failed to fetch playlists:', error);
        });
    }
    const getLikeAlbums = () => {
        axios.get(`${process.env.REACT_APP_API_HOST}/album/like/${userId}`, {
            params: {
                page: 0,
            }
        }).then((response) => {
            setLikeAlbums(response.data);
        }).catch((error) => {
            console.error('Failed to fetch liked albums:', error);
        });
    }

    const getLikeTracks = () => {
        axios.get(`${process.env.REACT_APP_API_HOST}/song/like/${userId}`, {
            params: {
                page: 0,
            }
        }).then((response) => {
            setLikeTracks(response.data);
        }).catch((error) => {
            console.error('Failed to fetch liked tracks:', error);
        });

    }

    const getLikeReviews = () => {
        axios.get(`${process.env.REACT_APP_API_HOST}/album/review/like/${userId}`, {
            params: {
                offset: 0,
            }
        })
            .then((response) => {
                    setLikeReviews(response.data);
                }
            )
    }


    useEffect(() => {
        getProfileHeader();
        getTopsterInfo()
        getAlbumReview();
        getUserTrackReviews();
        getUserPlaylists();
        getLikeAlbums();
        getLikeTracks();
        getLikeReviews();
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
                    <MainPage userInfo={userInfo} isMine={isMine} albumReview={albumReview} topsterInfo={topsterInfo}
                              trackReview={trackReviews} refreshTopster={getTopsterInfo}
                    />}
                {tab === 'review' &&
                    <ReviewPage userInfo={userInfo} isMine={isMine} albumReview={albumReview}
                                trackReviews={trackReviews}
                                playList={playlists}/>}
                {tab === 'likes' &&
                    <LikesPage userInfo={userInfo} isMine={isMine} likeAlbums={likeAlbums} likeTracks={likeTracks}
                               likeReviews={likeReviews}
                               likeComments={[]} likePlaylists={[]} likePlaylists={[]}/>}
            </div>
        </div>
    );
}

export default Profile;