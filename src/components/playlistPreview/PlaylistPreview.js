import styles from "./PlaylistPreview.module.css";
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";

const PlaylistPreview = (prop) => {

    const {content} = prop;

    const navigate = useNavigate();  // Using useNavigate instead of useHistory
    const [creatorProfileImg, setCreatorProfileImg] = useState("");

    const navigateToPlaylist = () => {
        navigate(`/playlist/${content?.playlistId}`); // Navigate to the Playlist page
    };

    const [isLiked, setIsLiked] = useState(false);

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
                    <div>{content?.creatorName}</div>
                </div>
                <div className={styles.reviewDate}>{content?.createdAt}</div>
            </div>

            <div className={styles.coverContainer}>
                {content?.songs?.slice(0, 5).map((song, index) => (
                        <img loading="lazy" className={styles.cover} loading="lazy" alt="Cover" key={index}
                             src={song?.albumImgUrl}/>
                    )
                )}
            </div>

            <div className={styles.playlistTitle}>
                {content?.title}
            </div>
            <div className={styles.reviewDesc}>
                <span className={styles.reviewContainer}>
                    <span className={styles.content}>{content?.content}</span>
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

