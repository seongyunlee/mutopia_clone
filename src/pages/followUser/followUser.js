import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import './FollowUser.css';
import axios from "axios";
import {UserContext} from "../../context/UserContext";

const FollowUser = () => {
    const [activeTab, setActiveTab] = useState('followers');
    const [searchParams] = useSearchParams();
    const {user, setUser} = useContext(UserContext);
    const pageUserId = useParams().id;
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const navigate = useNavigate();

    const showLoginModal = () => {
        alert("로그인이 필요합니다.");
        const loginModal = document.getElementById('loginModal');
        loginModal.showModal();
    }

    const checkLogin = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken === null) {
            showLoginModal();
        }
    }

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab === 'followers' || tab === 'following') {
            setActiveTab(tab);
        } else {
            setActiveTab('followers');
        }
    }, [searchParams]);

    const getFollowers = () => {
        axios.get(`${process.env.REACT_APP_API_HOST}/user/${pageUserId}/followers`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then(response => {
            setFollowers(response.data)
        }).catch(error => {
            setFollowers([])
        });
    }

    const getFollowing = () => {
        axios.get(`${process.env.REACT_APP_API_HOST}/user/${pageUserId}/followings`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then(response => {
            setFollowing(response.data)
        }).catch(error => {
            setFollowing([])
        });
    }

    const moveToProfile = (userId) => {
        navigate(`/profile/${userId}`);
    }


    /*    const followers = [
            {id: 1, name: '테일러가 짱이야', image: '/Ellipse_93.svg', isFollowing: true, bio: '테일러는 나의 신!'},
            {id: 2, name: '테친자', image: '/Ellipse_93.svg', isFollowing: false, bio: '테친자요? 네!'},
            {id: 3, name: '테일러가 나라다', image: '/Ellipse_93.svg', isFollowing: false, bio: '즐겨 찾는 고양이 부지'},
            {id: 4, name: '스위프티', image: '/Ellipse_93.svg', isFollowing: false, bio: 'since 22~'},
            {id: 5, name: '미세스아메리카나', image: '/Ellipse_93.svg', isFollowing: false, bio: 'MRS AMERICANA'},
            {id: 6, name: '시골소녀', image: '/Ellipse_93.svg', isFollowing: false, bio: 'Come to the swifties side'},
            {id: 7, name: '테일러루프', image: '/Ellipse_93.svg', isFollowing: false, bio: '테일러 덕후 '}
        ];

        const following = [
            {id: 1, name: '비욘세', image: '/Ellipse_93.svg', isFollowing: true, bio: 'Queen B in the house'},
            {id: 2, name: '드레이크', image: '/Ellipse_93.svg', isFollowing: true, bio: 'Started from the bottom'}
        ];*/


    const changeFollowState = (userId, isFollowing) => {
        const updatedList = followers.map(user => {
            if (user.userId === userId) {
                return {...user, following: isFollowing};
            }
            return user;
        });
        setFollowers(updatedList);
    }

    const unFollow = (userId) => {
        axios.delete(`${process.env.REACT_APP_API_HOST}/user/following?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then(() => {
            changeFollowState(userId, false);
        }).catch((error) => {
        });
    }

    const follow = (userId) => {
        axios.post(`${process.env.REACT_APP_API_HOST}/user/following?userId=${userId}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then(() => {
            changeFollowState(userId, true);
        }).catch((error) => {
        });
    }


    const handleFollowClick = (e, userId, isFollow) => {
        if (isFollow) {
            unFollow(userId);
        } else {
            follow(userId);
        }
        e.stopPropagation();
    };

    useEffect(() => {
        getFollowers();
        getFollowing();
    }, [activeTab]);

    useEffect(() => {
        checkLogin();
    }, []);


    return (
        <div className="follow-page">
            <div className="tab-nav">
                <button onClick={() => setActiveTab('followers')} className={activeTab === 'followers' ? 'active' : ''}>
                    {`${followers != null ? followers.length : 0} 팔로워`}
                    <div className={activeTab === 'followers' ? 'indicator' : 'hidden'}></div>
                </button>
                <button onClick={() => setActiveTab('following')} className={activeTab === 'following' ? 'active' : ''}>
                    {`${following != null ? following.length : 0} 팔로잉`}
                    <div className={activeTab === 'following' ? 'indicator' : 'hidden'}></div>
                </button>
            </div>
            {/*            <div className="latest-section">
                <span className="latest-text">latest</span>
                <img src="/import_export.svg" alt="Change Order" className="latest-icon"/>
            </div>*/}
            <ul className="user-list">
                {(activeTab == "followers" ? followers : following).map(user => (
                    <div key={user.id} className="user-item" onClick={() => moveToProfile(user.userId)}>
                        <img loading="lazy" src={user.profileImageUrl} alt={user.nickname} className="user-image"/>
                        <div className="user-info">
                            <div className="user-text">
                                <h2 className="user-name">{user.nickname}</h2>
                            </div>
                            <button
                                className={`follow-btn ${user.following ? 'unfollow' : 'follow'}`}
                                onClick={(e) => handleFollowClick(e, user.userId, user.following)}
                            >
                                {user.following ? '언팔로우' : '팔로우'}
                            </button>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default FollowUser;
