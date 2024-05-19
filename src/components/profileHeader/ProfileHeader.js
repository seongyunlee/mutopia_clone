import styles from "./ProfileHeader.module.css";
import { useNavigate } from 'react-router-dom';

const ProfileHeader = (props) => {
    const { userInfo, isMine} = props;
    console.log(userInfo);
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleButtonClick = (path, tab) => {
        navigate(`${path}?tab=${tab}`); // 경로로 이동하면서 탭 상태를 쿼리 파라미터로 전달
    };

    return (
        <header className={styles.profileContainer}>
            <div className={styles.profileContainerFirst}>
                <div className={styles.userName}>{userInfo.username}</div>
                <button title="editProfile" className={styles.btnProfileEdit} onClick={() => handleButtonClick(isMine ? '/editProfile' : '/followUser', 'followers')}>
                    {isMine ? "수정" : "팔로우"}
                </button>
            </div>
            <div className={styles.profileContainerSecond}>
                <img src={userInfo.profileImageUrl? userInfo.profileImageUrl: "/defaultProfile.svg"} alt="profile" className={styles.profilePhoto}/>
                <div className={styles.profileInfo}>
                    <div className={styles.profileInfoElement} >
                        <div className={styles.profileInfoElementNum}>{userInfo.totalReviewCount ? userInfo.totalReviewCount : 0}</div>
                        <div className={styles.profileInfoElementText}>리뷰</div>
                    </div>
                    <div className={styles.profileInfoElement} >
                        <div className={styles.profileInfoElementNum}>{userInfo.totalRatingCount ? userInfo.totalRatingCount : 0 }</div>
                        <div className={styles.profileInfoElementText}>평가</div>
                    </div>
                    <div className={styles.profileInfoElement} onClick={() => handleButtonClick('/followUser', 'followers')}>
                        <div className={styles.profileInfoElementNum}>{userInfo.followerCount ? userInfo.followerCount : 0}</div>
                        <div className={styles.profileInfoElementText}>팔로워</div>
                    </div>
                    <div className={styles.profileInfoElement} onClick={() => handleButtonClick('/followUser', 'following')}>
                        <div className={styles.profileInfoElementNum}>{userInfo.followingCount ? userInfo.followingCount : 0}</div>
                        <div className={styles.profileInfoElementText}>팔로잉</div>
                    </div>
                </div>
            </div>
            <div className={styles.profileContainerThird}>{userInfo.biography? userInfo.biography : " "}</div>
        </header>
    );
};

export default ProfileHeader;
