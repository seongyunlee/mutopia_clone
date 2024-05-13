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
                <img src="/defaultProfile.svg" alt="profile" className={styles.profilePhoto}/>
                <div className={styles.profileInfo}>
                    <div className={styles.profileInfoElement}>
                        <div className={styles.profileInfoElementNum}>94</div>
                        <div className={styles.profileInfoElementText}>리뷰</div>
                    </div>
                    <div className={styles.profileInfoElement}>
                        <div className={styles.profileInfoElementNum}>123</div>
                        <div className={styles.profileInfoElementText}>평가</div>
                    </div>
                    <div className={styles.profileInfoElement}>
                        <div className={styles.profileInfoElementNum}>123</div>
                        <div className={styles.profileInfoElementText}>팔로워</div>
                    </div>
                    <div className={styles.profileInfoElement}>
                        <div className={styles.profileInfoElementNum}>123</div>
                        <div className={styles.profileInfoElementText}>팔로잉</div>
                    </div>
                    
                </div>
            </div>
            <div className={styles.profileContainerThird}>{"💿 청계산 댕이레코즈\n⛰ 서울특별시 강남구 학동로25길 27\n⏳ 영업시간 : AI 마음\n🐶 취향자브종\n🍯 당신의 고막은 책임져드리지 않습니다"}</div>

        </header>
    );
};

export default ProfileHeader;