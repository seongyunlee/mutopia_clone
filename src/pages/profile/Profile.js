import ProfileHeader from "../../components/profileHeader/ProfileHeader";
import TopsterDisplay from "../../components/topsterDisplay/TopsterDisplay";
import ReviewPreview from "../../components/reviewPreview/ReviewPreview";
import TrackReview from "../../components/trackReview/TrackReview";
import PlaylistPreview from "../../components/playlistPreview/PlaylistPreview";
import LikedAlbumList from "../../components/likedAlbumList/LikedAlbumList";
import LikedTrackList from "../../components/likedTrackList/LikedTrackList";
import styles from "./Profile.module.css";
import {useContext, useState} from "react";
import {UserContext} from "../../context/UserContext";


const MainPage = () => {
    const {user, setUser} = useContext(UserContext);
    const [isTopsterEraseMode, setIsTopsterEraseMode] = useState(false);
    // 자신의 프로필이라고 가정
    const [isMine, setIsMine] = useState(true);
    const titleMine = ["내 뮤직보드 🎵", "내가 리뷰한 앨범 💿", "내가 남긴 한줄평 ✍🏻"];
    const titleOthers = ["의 뮤직보드 🎵", "의 인생 앨범 💿", "의 인생곡 ✍🏻"];
    return(
        <div className={styles.TabSection}>
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>
                <div className={styles.sectionTitle}>{isMine ? titleMine[0] : user.Name + titleOthers[0]}</div>
                {user?.id &&
                    <img src="/pencil-grey.svg" className={styles.btnEditTopster} alt="edit"
                            onClick={() => setIsTopsterEraseMode(!isTopsterEraseMode)}/>
                }
            </div>
            <TopsterDisplay isErasable={isTopsterEraseMode}/>
        </section>
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>
                <div className={styles.sectionTitle}>{isMine ? titleMine[1] : user.Name + titleOthers[1]}</div>
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
                <div className={styles.sectionTitle}>{isMine ? titleMine[2] : user.Name + titleOthers[2]}</div>
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

const ReviewPage = () => {
    const {user, setUser} = useContext(UserContext);
    // 자신의 프로필이라고 가정
    const [isMine, setIsMine] = useState(true);
    const titleMine = ["나의 리뷰 앨범 💿", "나의 한줄평 ✍🏻", "나의 플레이리스트 🎧"];
    const titleOthers = ["의 리뷰 앨범 💿", "의 한줄평 ✍🏻", "의 플레이리스트 🎧"];
    return(
        <div className={styles.TabSection}>
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>
                <div className={styles.sectionTitle}>{isMine ? titleMine[0] : user.Name + titleOthers[0]}</div>
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
                <div className={styles.sectionTitle}>{isMine ? titleMine[1] : user.Name + titleOthers[1]}</div>
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
                <div className={styles.sectionTitle}>{isMine ? titleMine[2] : user.Name + titleOthers[2]}</div>
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
            <LikedAlbumList/>
        </section>
        <section className={styles.subSection}>
            <div className={styles.sectionTitleContainer}>
                <div className={styles.sectionTitle}>{title[1]}</div>
            </div>
            <LikedTrackList/>
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

const Profile = () => {
    // const { id } = useParams(); // profile owner
    const [tab, setTab] = useState('main');
    const [isMine, setIsMine] = useState(true);

    return (
        <div className={styles.profileContainer}>
            <ProfileHeader isMine={isMine}/>
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
                {tab === 'main' && <MainPage />}
                {tab === 'review' && <ReviewPage />}
                {tab === 'likes' && <LikesPage />}
            </div>
        </div>
    );
}

export default Profile;