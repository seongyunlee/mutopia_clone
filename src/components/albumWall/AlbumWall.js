import AlbumDisplay from "../albumDisplay/AlbumDisplay";
import styles from "./AlbumWall.module.css";

const AlbumWall = ({albums}) => {
    return (
        <div className={styles.container}>
            {albums?.slice(0, 8).map((album, index) => (
                <AlbumDisplay
                    isTrack
                    id={album.id}
                    key={index}
                    coverImg={album.image.url}
                    name={album.name}
                    artist={album.artists.length > 0 ? album.artists[0].name : ""}
                />
            ))}
        </div>
    );
};

export default AlbumWall;
