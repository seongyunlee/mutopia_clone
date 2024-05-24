import styles from "./TopsterDisplay.module.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";


const TopsterDisplay = (props) => {

    const {topsterInfo, isErasable, refreshTopster} = props;

    const navigate = useNavigate();

    const moveToAlbumDetail = (albumId) => {
        navigate(`/albumDetail/${albumId}`);
    }
    let albums = [];

    if (topsterInfo == null || topsterInfo.length === 0) {
        return (
            <div>등록된 뮤직보드가 없습니다</div>
        )
    } else {
        for (let i = 0; i < topsterInfo?.topsterAlbums?.length; i++) {
            albums.push(topsterInfo.topsterAlbums[i]);
        }
    }

    const removeAlbum = (albumId) => {
        axios.delete(`${process.env.REACT_APP_API_HOST}/user/profile/topster/album`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                data: {
                    albumIds: [albumId]
                }
            }
        )
            .then(response => {
                refreshTopster();
            }).catch(error => {
            alert("탑스터 삭제에 실패했습니다.");
        });
    }

    const onAlbumClick = (album) => {
        if (isErasable) {
            // show confirm alert
            confirm("탑스터를 삭제하시겠습니까?") && removeAlbum(album.id);

        } else {
            moveToAlbumDetail(album.id)
        }
    }

    return (
        <div className={styles.topsterContainer}>
            <div className={styles.largerRow}>
                {albums.slice(0, 3).map((album, index) => (
                    <div className={styles.largeAlbum} key={index} onClick={() => onAlbumClick(album)}>
                        <img
                            className={styles.albumlargeCoverImg}
                            src={album ? album.coverImageUrl : "/topsterdefault.jpg"}
                            alt={album ? album.name : "Default Image"}
                        />
                        {isErasable && <img className={styles.deleteIcon} src="/cross-circle.svg" alt="delete"/>}
                    </div>
                ))}
            </div>
            <div className={styles.smallerRow}>
                {albums.slice(3, 7).map((album, index) => (
                    <div className={styles.smallAlbum} key={index + 3} onClick={() => onAlbumClick(album)}>
                        <img
                            className={styles.albumsmallCoverImg}
                            src={album ? album.coverImageUrl : "/topsterdefault.jpg"}
                            alt={album ? album.name : "Default Image"}
                            onClick={() => onAlbumClick(album)}
                        />
                        {isErasable && <img className={styles.deleteIcon} src="/cross-circle.svg" alt="delete"/>}
                    </div>
                ))}
            </div>
            <div className={styles.smallerRow}>
                {albums.slice(7, 11).map((album, index) => (
                    <div className={styles.smallAlbum} key={index + 3} onClick={() => onAlbumClick(album)}>
                        <img
                            className={styles.albumsmallCoverImg}
                            src={album ? album.coverImageUrl : "/topsterdefault.jpg"}
                            alt={album ? album.name : "Default Image"}
                            onClick={() => onAlbumClick(album)}
                        />
                        {isErasable && <img className={styles.deleteIcon} src="/cross-circle.svg" alt="delete"/>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopsterDisplay;