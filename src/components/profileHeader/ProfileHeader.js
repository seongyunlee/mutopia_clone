import styles from "./ProfileHeader.module.css";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {useState} from "react";

const ProfileHeader = (props) => {
    const {userInfo, isMine} = props;
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [isFollowing, setIsFollowing] = useState(false);

    const navigateToFollower = (tab) => {
        navigate(`/profile/${userInfo.id}/followers?tab=${tab}`);
    }

    const addFollow = () => {
        if (localStorage.getItem('accessToken') === null) {
            showLoginModal();
            return;
        }
        setIsFollowing(true);
        axios.post(`${process.env.REACT_APP_API_HOST}/user/following?userId=${userInfo.id}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then(() => {
            setIsFollowing(true);
        }).catch((error) => {
            setIsFollowing(false);
        });
    }

    const showLoginModal = () => {
        alert("로그인이 필요합니다.");
        const loginModal = document.getElementById('loginModal');
        loginModal.showModal();
    }

    const removeFollow = () => {
        if (localStorage.getItem('accessToken') === null) {
            showLoginModal();
            return;
        }
        setIsFollowing(false);
        axios.delete(`${process.env.REACT_APP_API_HOST}/user/following?userId=${userInfo.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then(() => {
            setIsFollowing(false);
        }).catch((error) => {
            setIsFollowing(true);
        });
    }

    const handleButtonClick = (tag) => {
        if (isMine) {
            navigate('/editProfile');
        } else if (isFollowing) {
            removeFollow();
        } else {
            addFollow();
        }
    }


    return (
        <header className={styles.profileContainer}>
            <div className={styles.profileContainerTopContainer}>
                <img src={userInfo.profileImageUrl ? userInfo.profileImageUrl : "/defaultProfile.svg"} alt="profile"
                     className={styles.profilePhoto}/>
                <div className={styles.profileContainerTop}>
                    <div className={styles.profileContainerFirst}>
                        <div className={styles.userName}>{userInfo.username}</div>
                        <div title="editProfile" className={styles.btnProfileEdit}
                             style={{
                                 background: isMine || !isFollowing ? "#7B61FF" : "#EADDFF",
                                 color: isMine || !isFollowing ? "#FFFFFF" : "#000000"
                             }}
                             onClick={() => handleButtonClick(isMine ? '/editProfile' : '/followUser', 'followers')}>
                            {isMine ? "수정" : isFollowing ? "팔로잉" : "팔로우"}
                        </div>
                    </div>
                    <div className={styles.profileContainerSecond}>
                        <div className={styles.profileInfo}>
                            <div className={styles.profileInfoElement}>
                                <div
                                    className={styles.profileInfoElementNum}>{userInfo.totalReviewCount ? userInfo.totalReviewCount : 0}</div>
                                <div className={styles.profileInfoElementText}>리뷰</div>
                            </div>
                            <div className={styles.profileInfoElement}>
                                <div
                                    className={styles.profileInfoElementNum}>{userInfo.totalRatingCount ? userInfo.totalRatingCount : 0}</div>
                                <div className={styles.profileInfoElementText}>평가</div>
                            </div>
                            <div className={styles.profileInfoElement}
                                 onClick={() => navigateToFollower("follower")}>
                                <div
                                    className={styles.profileInfoElementNum}>{userInfo.followerCount ? userInfo.followerCount : 0}</div>
                                <div className={styles.profileInfoElementText}>팔로워</div>
                            </div>
                            <div className={styles.profileInfoElement}
                                 onClick={() => navigateToFollower("following")}>
                                <div
                                    className={styles.profileInfoElementNum}>{userInfo.followingCount ? userInfo.followingCount : 0}</div>
                                <div className={styles.profileInfoElementText}>팔로잉</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.profileContainerThird}>{userInfo.biography ? userInfo.biography : " "}</div>
        </header>
    );
};

export default ProfileHeader;
