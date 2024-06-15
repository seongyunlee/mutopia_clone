import React, {useEffect, useState} from 'react';
import styles from "./EditProfile.module.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const EditProfile = () => {
    const [image, setImage] = useState('/defaultProfile.svg'); // 초기 이미지 경로
    const [name, setName] = useState(''); // 이름 상태
    const [bio, setBio] = useState(''); // 소개 상태
    const [oldName, setOldName] = useState(''); // 이전 이름 상태

    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.substr(0, 5) === "image") {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('이미지 파일만 업로드 가능합니다.');
        }
    };

    const withdraw = () => {
        if (window.confirm("정말 탈퇴하시겠습니까?")) {
            const token = localStorage.getItem('accessToken');
            axios.post(`${process.env.REACT_APP_API_HOST}/user/withdraw`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                localStorage.removeItem('accessToken');
                navigate('/');
            }).catch((error) => {
                alert("회원 탈퇴 중 오류가 발생했습니다.");
                location.reload();
            });
        }
    }

    const getUserInfo = () => {
        const token = localStorage.getItem('accessToken');
        axios.get(`${process.env.REACT_APP_API_HOST}/user/profile/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            const {profileUrl, name, bio} = response.data;
            setImage(profileUrl);
            setOldName(name);
            setBio(bio);
        }).catch((error) => {
            alert("로그인 중 오류가 발생했습니다. 다시 로그인해주세요.");
            localStorage.removeItem('accessToken');
            location.href = '/';
        });
    }

    const saveProfile = () => {
        const token = localStorage.getItem('accessToken');

        const formData = new FormData();
        if (document.getElementById('fileInput').files.length > 0) {
            formData.append('file', document.getElementById('fileInput').files[0]);
        }

        if (name !== "") {
            formData.append('userName', name);
        }
        if (bio !== "") {
            formData.append('bio', bio);
        }

        axios.patch(`${process.env.REACT_APP_API_HOST}/user/profile/me`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            navigate(-1);
        }).catch((error) => {
            alert("프로필 저장 중 오류가 발생했습니다.");
            location.reload();
        });
    }

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            getUserInfo();
        } else {
            alert("잘못된 접근입니다.")
            navigate(-1);
        }
    }, []);

    return (
        <div className={styles.editProfile}>
            <div className={styles.photoSection}>
                <div
                    className={styles.profilePhoto}
                    style={{backgroundImage: `url(${image})`}}
                    onClick={() => document.getElementById('fileInput').click()}
                ></div>
                <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{display: 'none'}}
                    hint={oldName}
                    onChange={handleImageChange}
                />
            </div>
            <div className={styles.textSection}>
                <div className={styles.profileName}>
                    이름
                    <input
                        type="text"
                        value={name}
                        placeholder={oldName}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.textInput}
                    />
                </div>
                <div className={styles.profileBio}>
                    소개
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="소개 입력"
                        className={styles.textArea}
                    />
                </div>
            </div>
            <button title="editProfile" className={styles.btnProfileEdit} onClick={saveProfile}>
                저장
            </button>
            <button title="editProfile" className={styles.btnProfileEdit} onClick={withdraw}>
                회원 탈퇴
            </button>
        </div>
    );
}

export default EditProfile;