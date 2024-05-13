import ProfileHeader from "../../components/profileHeader/ProfileHeader";
import TopsterDisplay from "../../components/topsterDisplay/TopsterDisplay";
import ReviewPreview from "../../components/reviewPreview/ReviewPreview";
import TrackReview from "../../components/trackReview/TrackReview";
import styles from "./Profile.module.css";
import {useContext, useState} from "react";
import {UserContext} from "../../context/UserContext";


const MainPage = () => {
    const {user, setUser} = useContext(UserContext);
    const [isTopsterEraseMode, setIsTopsterEraseMode] = useState(false);
    // 자신의 프로필이라고 가정
    const titleMine = ["내 뮤직보드", "내가 리뷰한 앨범 💿", "내가 남긴 한줄평 ✍🏻"];
    return(
        <div className={styles.mainSection}>
        <section className={styles.topsterContainer}>
            <div className={styles.sectionTitleContainer}>
                <div className={styles.sectionTitleMine}>{titleMine[0]}</div>
                {user?.id &&
                    <img src="/pencil-grey.svg" className={styles.btnEditTopster} alt="edit"
                            onClick={() => setIsTopsterEraseMode(!isTopsterEraseMode)}/>
                }
            </div>
            <TopsterDisplay isErasable={isTopsterEraseMode}/>
        </section>
        <section className={styles.profileMainReview}>
            <div className={styles.sectionTitleContainer}>
                <div className={styles.sectionTitleMine}>{titleMine[1]}</div>
            </div>
            <div className={styles.albumReviewContainer}>
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
        <section className={styles.profileMainComment}>
            <div className={styles.sectionTitleContainer}>
                <div className={styles.sectionTitleMine}>{titleMine[2]}</div>
            </div>
            <div className={styles.songCommentContainer}>
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
    return(
        <div>
            ReviewPage
        </div>
    )
};

const ListPage = () => {
    return(
        <div>
            ListPage
        </div>
    )
};

const Profile = () => {
    // const { id } = useParams(); // profile owner
    const [tab, setTab] = useState('main');

    return (
        <div className={styles.profileContainer}>
            <ProfileHeader/>
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
                {tab === 'list' && <ListPage />}
            </div>
        </div>
    );
}

export default Profile;