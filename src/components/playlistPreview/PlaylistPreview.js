import styles from "./PlaylistPreview.module.css";

const PlaylistPreview = () => {

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <div className={styles.authorContainer}>
                    <img
                        src="/amusementpark-3@2x.png"
                        className={styles.authorProfileImg}
                        loading="lazy"
                        alt=""
                    />
                    <div>무중력지대</div>
                </div>
                <div className={styles.reviewDate}>2024. 4. 1.</div>
            </div>

            <div className={styles.coverContainer}>
                <img
                    className={styles.cover}
                    loading="lazy"
                    alt=""
                    src="/rectangle-1513-5@2x.png"
                />
                <img className={styles.cover} alt="" src="/rectangle-1478@2x.png"/>
                <img className={styles.cover} alt="" src="/rectangle-1477@2x.png"/>
                <img className={styles.cover} alt="" src="/rectangle-1477@2x.png"/>
                <img className={styles.cover} alt="" src="/rectangle-1479-1@2x.png"/>
                <img className={styles.cover} alt="" src="/rectangle-1513-4@2x.png"/>
            </div>

            <div className={styles.playlistTitle}>
                K-pop 여름 플레이리스트
            </div>
            <div className={styles.reviewDesc}>
                <span className={styles.reviewContainer}>
                    <span className={styles.content}>{` 누군가 K-락의 미래를 묻거든 고개를 들어 `}</span>
                    <span className={styles.add}>....더보기</span>
                </span>
            </div>
            <div className={styles.footerContainer}>
                <div className={styles.likeContainer}>
                    <img
                        src="/heart-icon.svg"
                        loading="lazy"
                        alt=""
                    />
                    <div>76</div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistPreview;
