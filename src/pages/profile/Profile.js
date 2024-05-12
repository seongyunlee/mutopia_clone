import ProfileHeader from "../../components/profileHeader/ProfileHeader";
import TopsterDisplay from "../../components/topsterDisplay/TopsterDisplay";
import styles from "./Profile.module.css";
import {useContext, useState} from "react";
import {UserContext} from "../../context/UserContext";


const MainPage = () => {
    const {user, setUser} = useContext(UserContext);
    const [isTopsterEraseMode, setIsTopsterEraseMode] = useState(false);

    return(
        <>
        <section className={styles.topsterContainer}>
                <div className={styles.sectionTitleContainer}>
                    <div className={styles.sectionTitle}>뮤직보드</div>
                    {user?.id &&
                        <img src="/pencil-grey.svg" className={styles.btnEditTopster} alt="edit"
                             onClick={() => setIsTopsterEraseMode(!isTopsterEraseMode)}/>
                    }
                </div>
            <TopsterDisplay isErasable={isTopsterEraseMode}/>
        </section>
        <section className={styles.profileMainReview}>
        </section>
        <section className={styles.profileMainComment}>
        </section>
        </>
    )
    

};
const Profile = () => {
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