import styles from "./ProfileHeader.module.css";

const ProfileHeader = () => {
    return (
        <header className={styles.profileContainer}>
            <div className={styles.profileContainerFirst}>
                <div className={styles.userName}>바보랜드</div>
                <button title="editProfile" className={styles.btnProfileEdit}>
                    수정
                </button>
            </div>
            <div className={styles.profileContainerSecond}>
                <img src="/circleprofile.svg" alt="profile" className={styles.profilePhoto}/>
            </div>
            <div className={styles.profileContainerThird}>이름과 바이오</div>
            
        </header>
    );
};

export default ProfileHeader;