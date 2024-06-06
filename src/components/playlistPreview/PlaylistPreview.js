import styles from "./PlaylistPreview.module.css";
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";

const PlaylistPreview = (prop) => {

    const {content} = prop;

    const [creatorProfileImg, setCreatorProfileImg] = useState("");

    const navigateToPlaylist = () => {
        window.location.href =`/playlist/${content?.playlistId}`;
    };

    const getUserProfileImg = (userId) => {
        axios.get(`${process.env.REACT_APP_API_HOST}/user/${userId}/profile/aggregation`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then((response) => {
            setCreatorProfileImg(response.data.profileImageUrl);
        }).catch((error) => {
        });
    }


    useEffect(() => {
        getUserProfileImg(content?.creatorId)
    }, []);


    return (
        <div className={styles.container} onClick={navigateToPlaylist}>
            <div className={styles.headerContainer}>
                <div className={styles.authorContainer}>
                    <img
                        src={creatorProfileImg ? creatorProfileImg : "/person.png"}
                        className={styles.authorProfileImg}
                        loading="lazy"
                        alt="Author profile"
                    />
                    <div>{content?.creatorName.length > 12 ? `${content?.creatorName.substring(0,12)}...` : content?.creatorName }</div>
                </div>
                <div className={styles.reviewDate}>{content?.createdAt}</div>
            </div>

            <div className={styles.coverContainer}>
                {[...Array(6)].map((_, index) => (
                    <img
                        loading="lazy"
                        className={styles.cover}
                        alt="Cover"
                        key={index}
                        src={content?.songs && content.songs[index] ? content.songs[index].albumImgUrl : "/empty_cover.png"}
                    />
                ))}
            </div>

            <div className={styles.playlistTitle}>
                {content?.title.length > 20 ? `${content?.title.substring(0, 20)}...` : content?.title}
            </div>
            <div className={styles.reviewDesc}>
                <span className={styles.reviewContainer}>
                    <span className={styles.content}>{content?.content.length > 30 ? `${content?.content.substring(0, 30)}` : content?.content }</span>
                    <span className={styles.add}>....더보기</span>
                </span>
            </div>
            <div className={styles.footerContainer}>
                <div className={styles.likeContainer}>
                    <img src={content?.isLiked ? "/favoritefilled.svg" : "/heart-icon.svg"} loading="lazy"
                         alt="Like icon"/>
                    <div>{content?.likeCount}</div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistPreview;

