import styles from "./AlbumDisplay.module.css";
import {useNavigate} from "react-router-dom";

const AlbumDisplay = (props) => {
    const {id, coverImg, name, artist, isTrack} = props;

    const navigate = useNavigate(); // useNavigate 훅 사용

    const moveToDetail = () => {
        if (isTrack) {
            navigate(`/trackDetail/${id}`);
        } else {
            navigate(`/albumDetail/${id}`);
        }
    }

    return (
        <div className={styles.rectangleParent} onClick={moveToDetail}>
            <img loading="lazy"
                 className={styles.frameChild}
                 loading="lazy"
                 alt=""
                 src={coverImg}
            />
            <div className={styles.ditto}>
                {name.length > 12 ? `${name.substring(0, 12)}...` : name}
            </div>
            <div className={styles.div}>{artist.length > 20 ? `${artist.substring(0, 20)}...`: artist}</div>
        </div>
    );
};

export default AlbumDisplay;
