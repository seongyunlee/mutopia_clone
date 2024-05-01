import styles from "./AlbumDisplay.module.css";

const AlbumDisplay = (props) => {
    const {coverImg, name, artist} = props;

    return (
        <div className={styles.rectangleParent}>
            <img
                className={styles.frameChild}
                loading="lazy"
                alt=""
                src={coverImg}
            />
            <div className={styles.ditto}>
                {name}
            </div>
            <div className={styles.div}>{artist}</div>
        </div>
    );
};

export default AlbumDisplay;
