import AlbumDisplay from "../albumDisplay/AlbumDisplay";
import styles from "./LikedAlbumList.module.css";

const LikedAlbumList = (props) => {
    const {list} = props;
    return (
        <div className={styles.container}>
            {
                list?.map((album) => (
                    <AlbumDisplay
                        key={album.albumId}
                        id={album.albumId}
                        coverImg={album.albumCoverImg}
                        name={album.albumName}
                        artist={album.artistName}
                    />
                ))
            }
        </div>
    );
};

export default LikedAlbumList;
