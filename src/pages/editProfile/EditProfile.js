import React, { useState } from 'react';
import styles from "./EditProfile.module.css";

const EditProfile = () => {
    const [image, setImage] = useState('/circleprofile.svg'); // 초기 이미지 경로
    const [name, setName] = useState(''); // 이름 상태
    const [bio, setBio] = useState(''); // 소개 상태

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

    return (
        <div className={styles.editProfile}>
            <div className={styles.photoSection}>
                <div
                    className={styles.profilePhoto}
                    style={{ backgroundImage: `url(${image})` }}
                    onClick={() => document.getElementById('fileInput').click()}
                ></div>
                <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
            </div>
            <div className={styles.textSection}>
                <div className={styles.profileName}>
                    이름
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="이름 입력"
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
            <button title="editProfile" className={styles.btnProfileEdit}>
                    저장
                </button>
        </div>
    );
}

export default EditProfile;