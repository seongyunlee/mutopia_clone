import ProfileHeader from "../../components/profileHeader/ProfileHeader";
import TopsterDisplay from "../../components/topsterDisplay/TopsterDisplay";
import ReviewPreview from "../../components/reviewPreview/ReviewPreview";
import TrackReview from "../../components/trackReview/TrackReview";
import PlaylistPreview from "../../components/playlistPreview/PlaylistPreview";
import LikedAlbumList from "../../components/likedAlbumList/LikedAlbumList";
import LikedTrackList from "../../components/likedTrackList/LikedTrackList";
import styles from "./Profile.module.css";
import {useContext, useState, useEffect} from "react";
import {UserContext} from "../../context/UserContext";
import axios from "axios";


const MainPage = ( props ) => {
    const { userInfo, isMine} = props;
    const {user, setUser} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [topsterInfo, setTopsterInfo] = useState(null); // [TODO] 유저의 topsterId를 받아와야 함
    const [albumReview, setAlbumReview] = useState(null); // [TODO] 유저의 topsterId를 받아와야 함
    const [isTopsterEraseMode, setIsTopsterEraseMode] = useState(false);
    const titleMine = ["내 뮤직보드 🎵", "내가 리뷰한 앨범 💿", "내가 남긴 한줄평 ✍🏻"];
    const titleOthers = ["의 뮤직보드 🎵", "의 인생 앨범 💿", "의 인생곡 ✍🏻"];

    const getTopsterInfo = async () => {
        axios.get(`${process.env.REACT_APP_API_HOST}/user/${userInfo.userId}/profile/topster`, {}).then((response) => {
            setTopsterInfo(response.data);
            setIsLoading(false);
        }).catch((error) => {
            console.error('Failed to fetch topster information:', error);
        });
    }

    const getAlbumReview = async () => {
        axios.get(`${process.env.REACT_APP_API_HOST}/user/${userInfo.userId}/album/review`, {}).then((response) => {
            setAlbumReview(response.data);
            setIsLoading(false);
        }).catch((error) => {
            console.error('Failed to fetch album reviews', error);
        });
    }


    useEffect(() => {
        getTopsterInfo();
        getAlbumReview();
    }, []);

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

    if (isLoading) {
        return <div>Loading Profile...</div>; // 로딩 상태일 때 로딩 메시지 표시
    }

    return(
        <div className={styles.TabSection}>
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>
                <div className={styles.sectionTitle}>{isMine ? titleMine[0] : userInfo.username + titleOthers[0]}</div>
                {user?.id &&
                    <img src="/pencil-grey.svg" className={styles.btnEditTopster} alt="edit"
                            onClick={() => setIsTopsterEraseMode(!isTopsterEraseMode)}/>
                }
            </div>
            <TopsterDisplay topsterInfo={topsterInfo} isErasable={isTopsterEraseMode}/>
        </section>
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>
                <div className={styles.sectionTitle}>{isMine ? titleMine[1] : userInfo.username + titleOthers[1]}</div>
            </div>
            <div className="verticalScroll">
                <ReviewPreview content={mockReview}/>
               {albumReview.map((review, index) => (<ReviewPreview content={review} key={index}/>))}
                
            </div>
        </section>
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>
                <div className={styles.sectionTitle}>{isMine ? titleMine[2] : userInfo.username + titleOthers[2]}</div>
            </div>
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
        </div>
    )  

};

const ReviewPage = ( props ) => {
    const { userInfo, isMine} = props;
    const {user, setUser} = useContext(UserContext);
    const titleMine = ["나의 리뷰 앨범 💿", "나의 한줄평 ✍🏻", "나의 플레이리스트 🎧"];
    const titleOthers = ["의 리뷰 앨범 💿", "의 한줄평 ✍🏻", "의 플레이리스트 🎧"];
    return(
        <div className={styles.TabSection}>
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>
                <div className={styles.sectionTitle}>{isMine ? titleMine[0] : userInfo.username + titleOthers[0]}</div>
            </div>
            <div className="verticalScroll">
                <ReviewPreview/>
                <ReviewPreview/>
                <ReviewPreview/>
                <ReviewPreview/>
                <ReviewPreview/>
                <ReviewPreview/>
                <ReviewPreview/>
                <ReviewPreview/>
                <ReviewPreview/>
                <ReviewPreview/>
            </div>
        </section>
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>
                <div className={styles.sectionTitle}>{isMine ? titleMine[1] : userInfo.username + titleOthers[1]}</div>
            </div>
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
                <div className={styles.sectionTitle}>{isMine ? titleMine[2] : userInfo.username + titleOthers[2]}</div>
            </div>
            <div className="verticalScroll">
                <PlaylistPreview/>
                <PlaylistPreview/>
                <PlaylistPreview/>
                <PlaylistPreview/>
                <PlaylistPreview/>
                <PlaylistPreview/>
                <PlaylistPreview/>
                <PlaylistPreview/>
            </div>
        </section>
        </div>
    )
};

const LikesPage = () => {
    const {user, setUser} = useContext(UserContext);
    // 자신의 프로필이라고 가정
    const [isMine, setIsMine] = useState(true);
    const title = ["좋아요한 앨범 💘", "좋아요한 곡 ❣️", "내가 좋아요한 리뷰 💜", "찜한 플레이리스트 🎧"];
    
    return(
        <div className={styles.TabSection}>
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>
                <div className={styles.sectionTitle}>{title[0]}</div>
            </div>
            <div className="verticalScroll">
                <LikedAlbumList/>
            </div>
            
        </section>
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>
                <div className={styles.sectionTitle}>{title[1]}</div>
            </div>
            <div className="verticalScroll">
                <LikedTrackList/>
            </div>
            
        </section>
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>
                <div className={styles.sectionTitle}>{title[2]}</div>
            </div>
            <div className="verticalScroll">
                <ReviewPreview/>
                <ReviewPreview/>
                <ReviewPreview/>
                <ReviewPreview/>
                <ReviewPreview/>
                <ReviewPreview/>
                <ReviewPreview/>
                <ReviewPreview/>
                <ReviewPreview/>
                <ReviewPreview/>
            </div>
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

const Profile = ( props ) => {
    // const { props } = useParams(); // profile owner
    const {user, setUser} = useContext(UserContext);
    const [tab, setTab] = useState('main');
    const [isMine, setIsMine] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const userId = "f86c4c2e-d484-4178-ac77-dcdc6d06d1ae" 

    if (user.id == userId){
        setIsMine(true);
    }

    const getProfileHeader = async () => {
        axios.get(`${process.env.REACT_APP_API_HOST}/user/${userId}/profile/aggregation`, {}).then((response) => {
            setUserInfo(response.data);
            console.log(response.data);
            setIsLoading(false);
        }).catch((error) => {
            console.error('Failed to fetch profile header:', error);
        });
    }


    useEffect(() => {
        getProfileHeader();
    }, []);

    if (isLoading) {
        return <div>Loading Profile...</div>; // 로딩 상태일 때 로딩 메시지 표시
    }

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
                {tab === 'main' && <MainPage userInfo={userInfo} isMine={isMine} />}
                {tab === 'review' && <ReviewPage userInfo={userInfo} isMine={isMine}/>}
                {tab === 'likes' && <LikesPage userInfo={userInfo} isMine={isMine}/>}
            </div>
        </div>
    );
}

export default Profile;