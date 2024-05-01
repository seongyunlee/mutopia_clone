import AlbumDisplay from "../albumDisplay/AlbumDisplay";
import styles from "./AlbumWall.module.css";

const AlbumWall = () => {
    return (
        <div className={styles.container}>
            <AlbumDisplay
                coverImg="/rectangle-1513@2x.png"
                name="UNFORGIVEN"
                artist="르세라핌"
            />
            <AlbumDisplay
                coverImg="/rectangle-1513-1@2x.png"
                name="DITTO"
                artist="뉴진스"
            />
            <AlbumDisplay
                coverImg="/rectangle-1513-2@2x.png"
                name="LION HEART"
                artist=" 소녀시대"
            />
            <AlbumDisplay
                coverImg="/rectangle-1513-3@2x.png"
                name="LOVE DIVE"
                artist="아이브"
            />
            <AlbumDisplay
                coverImg="/rectangle-1513-4@2x.png"
                name="COOKIE JAR"
                artist="레드벨벳"
            />
            <AlbumDisplay
                coverImg="/rectangle-1513-5@2x.png"
                name="NEVER DIE"
                artist="(여자)아이들"
            />
        </div>
    );
};

export default AlbumWall;
