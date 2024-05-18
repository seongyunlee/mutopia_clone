import styles from "./TopsterDisplay.module.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";


const TopsterDisplay = (props) => {

    const {topsterInfo, isErasable} = props;
    console.log(topsterInfo);

    const navigate = useNavigate();

    const moveToAlbumDetail = (albumId) => {
        navigate(`/albumDetail/${albumId}`);
    }
    const albums = [];

    if (topsterInfo == null) {
        const sample =
            {
                topsterId: "1",
                albumId: "1575TQDOQqc0MAheeEeKWUR",
                albumCoverImg: "https://i.scdn.co/image/ab67616d0000b273bd8c739ce7e59ae9414c7a26"
            };
        for (let i = 0; i < 11; i++) {
            albums.push(sample);
        }

    } else{
        for (let i = 0; i < topsterInfo.topsterAlbums.length; i++) {
            albums.push(topsterInfo.topsterAlbums[i]);
        }
    }

    const removeAlbum = (topsterId) => {
        axios.delete(`/topster/${topsterId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(response => {
                albums = albums.filter(album => album.topsterId !== topsterId);
            }).catch(error => {
            alert("탑스터 삭제에 실패했습니다.");
        });
    }

    const onAlbumClick = (album) => {
        if (isErasable) {
            // show confirm alert
            confirm("탑스터를 삭제하시겠습니까?") && removeAlbum(album.topsterId);

        } else {
            moveToAlbumDetail(album.id)
        }
    }

    return (
        <div className={styles.topsterContainer}>
            <div className={styles.largerRow}>
                {albums.slice(0, 3).map((album, index) => (
                    <div className={styles.largeAlbum} key={index}>
                        <img 
                            className={styles.albumlargeCoverImg} 
                            src={album ? album.coverImageUrl : "/topsterdefault.jpg"} 
                            alt={album ? album.name : "Default Image"}
                            onClick={() => onAlbumClick(album)}
                        />
                        {isErasable && <img className={styles.deleteIcon} src="/cross-circle.svg" alt="delete" />}
                    </div>
                ))}
            </div>
            <div className={styles.smallerRow}>
                {albums.slice(3, 7).map((album, index) => (
                    <div className={styles.smallAlbum} key={index + 3}>
                        <img 
                            className={styles.albumsmallCoverImg} 
                            src={album ? album.coverImageUrl : "/topsterdefault.jpg"} 
                            alt={album ? album.name : "Default Image"}
                            onClick={() => onAlbumClick(album)}
                        />
                        {isErasable && <img className={styles.deleteIcon} src="/cross-circle.svg" alt="delete" />}
                    </div>
                ))}
            </div>
            <div className={styles.smallerRow}>
                {albums.slice(7, 11).map((album, index) => (
                    <div className={styles.smallAlbum} key={index + 3}>
                        <img 
                            className={styles.albumsmallCoverImg} 
                            src={album ? album.coverImageUrl : "/topsterdefault.jpg"} 
                            alt={album ? album.name : "Default Image"}
                            onClick={() => onAlbumClick(album)}
                        />
                        {isErasable && <img className={styles.deleteIcon} src="/cross-circle.svg" alt="delete" />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopsterDisplay;