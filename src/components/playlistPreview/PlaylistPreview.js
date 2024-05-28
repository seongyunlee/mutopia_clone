import styles from "./PlaylistPreview.module.css";
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";

const PlaylistPreview = (prop) => {

    const {content} = prop;

    const navigate = useNavigate();  // Using useNavigate instead of useHistory

    const navigateToPlaylist = () => {
        navigate('/playlist'); // Navigate to the Playlist page
    };

    const [isLiked, setIsLiked] = useState(false);

    const getIsLiked = () => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get(`${process.env.REACT_APP_API_HOST}/user/playlist/${content.playlistId}/like/status`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((response) => {
            if (response.data.likeStatus === "ON") {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        })
    }


    useEffect(() => {
        getIsLiked();
    }, []);


    return (
        <div className={styles.container} onClick={navigateToPlaylist}>
            <div className={styles.headerContainer}>
                <div className={styles.authorContainer}>
                    <img
                        src="/amusementpark-3@2x.png"
                        className={styles.authorProfileImg}
                        loading="lazy"
                        alt="Author profile"
                    />
                    <div>유저이름가져오기</div>
                </div>
                <div className={styles.reviewDate}>날짜가져오기</div>
            </div>

            <div className={styles.coverContainer}>
                {content?.songs?.map((song, index) => (
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
                    <span className={styles.content}>{content.content}</span>
                    <span className={styles.add}>....더보기</span>
                </span>
            </div>
            <div className={styles.footerContainer}>
                <div className={styles.likeContainer}>
                    <img src={isLiked ? "/favoritefilled.svg" : "/heart-icon.svg"} loading="lazy" alt="Like icon"/>
                    <div>??</div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistPreview;

