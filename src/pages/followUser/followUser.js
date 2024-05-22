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
    const [userList, setUserList] = useState([]);

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
            setUserList(response.data)
        }).catch(error => {
            setUserList([])
        });
    }

    const getFollowing = () => {
        axios.get(`${process.env.REACT_APP_API_HOST}/user/${pageUserId}/followings`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then(response => {
            setUserList(response.data)
        }).catch(error => {
            setUserList([])
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

    const handleFollowClick = (userId) => {
        console.log("Toggle follow state for user:", userId);

        //TODO: Follow or unfollow user
    };

    useEffect(() => {
        if (activeTab === 'followers') {
            getFollowers();
        } else {
            getFollowing();
        }
    }, [activeTab]);

    useEffect(() => {
        checkLogin();
    }, []);


    return (
        <div className="follow-page">
            <div className="tab-nav">
                <button onClick={() => setActiveTab('followers')} className={activeTab === 'followers' ? 'active' : ''}>
                    {`${userList != null ? userList.length : 0} 팔로워`}
                    <div className={activeTab === 'followers' ? 'indicator' : 'hidden'}></div>
                </button>
                <button onClick={() => setActiveTab('following')} className={activeTab === 'following' ? 'active' : ''}>
                    {`${userList != null ? userList.length : 0} 팔로잉`}
                    <div className={activeTab === 'following' ? 'indicator' : 'hidden'}></div>
                </button>
            </div>
            {/*            <div className="latest-section">
                <span className="latest-text">latest</span>
                <img src="/import_export.svg" alt="Change Order" className="latest-icon"/>
            </div>*/}
            <ul className="user-list">
                {userList.map(user => (
                    <li key={user.id} className="user-item" onClick={() => moveToProfile(user.userId)}>
                        <img src={user.profileImageUrl} alt={user.nickname} className="user-image"/>
                        <div className="user-info">
                            <div className="user-text">
                                <h2 className="user-name">{user.nickname}</h2>
                            </div>
                            <button
                                className={`follow-btn ${user.following ? 'unfollow' : 'follow'}`}
                                onClick={() => handleFollowClick(user.id)}
                            >
                                {user.following ? '언팔로우' : '팔로우'}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FollowUser;
