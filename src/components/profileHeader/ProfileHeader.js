import styles from "./ProfileHeader.module.css";
import { useNavigate } from 'react-router-dom';

const ProfileHeader = (props) => {
    const isMine = props.isMine;
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleButtonClick = (path, tab) => {
        navigate(`${path}?tab=${tab}`); // 경로로 이동하면서 탭 상태를 쿼리 파라미터로 전달
    };

    return (
        <header className={styles.profileContainer}>
            <div className={styles.profileContainerFirst}>
                <div className={styles.userName}>바보랜드</div>
                <button title="editProfile" className={styles.btnProfileEdit} onClick={() => handleButtonClick(isMine ? '/editProfile' : '/followUser', 'followers')}>
                    {isMine ? "수정" : "팔로우"}
                </button>
            </div>
            <div className={styles.profileContainerSecond}>
                <img src="/defaultProfile.svg" alt="profile" className={styles.profilePhoto}/>
                <div className={styles.profileInfo}>
                    <div className={styles.profileInfoElement} onClick={() => handleButtonClick('/followUser', 'followers')}>
                        <div className={styles.profileInfoElementNum}>94</div>
                        <div className={styles.profileInfoElementText}>리뷰</div>
                    </div>
                    <div className={styles.profileInfoElement} onClick={() => handleButtonClick('/followUser', 'followers')}>
                        <div className={styles.profileInfoElementNum}>123</div>
                        <div className={styles.profileInfoElementText}>팔로워</div>
                    </div>
                    <div className={styles.profileInfoElement} onClick={() => handleButtonClick('/followUser', 'following')}>
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
