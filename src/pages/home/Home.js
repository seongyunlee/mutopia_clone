import AlbumWall from "../../components/albumWall/AlbumWall";
import styles from "./Home.module.css";
import ReviewPreview from "../../components/reviewPreview/ReviewPreview";
import PlaylistPreview from "../../components/playlistPreview/PlaylistPreview";
import ToggleFilter from "../../components/toggleFilter/ToggleFilter";
import TrackReview from "../../components/trackReview/TrackReview";

const Home = () => {
    const onContainerClick = () => {
    };
    return (
        <div className={styles.home}>
            <section className={styles.homeSection}>
                <div className={styles.sectionTitle}>팔로워들의 최근 업로드</div>
                <div className="verticalScroll">
                    <ReviewPreview
                        ellipse85="/ellipse-85@2x.png"
                        iFeel="I feel"
                        rectangle1480="/rectangle-1480@2x.png"
                        prop="아이들 리뷰 제목"
                        onContainerClick={onContainerClick}
                    />
                    <ReviewPreview
                        ellipse85="/ellipse-85@2x.png"
                        iFeel="I feel"
                        rectangle1480="/rectangle-1480@2x.png"
                        prop="아이들 리뷰 제목"
                        onContainerClick={onContainerClick}/>
                </div>
            </section>
            <section>
                <div className={styles.sectionTitle}>트렌딩 앨범</div>
                <AlbumWall/>
            </section>
            <section className={styles.homeSection}>
                <div className={styles.sectionTitle}>
                    <div>
                        앨범리뷰
                    </div>
                    <ToggleFilter menu={["최근", "인기"]}/>
                </div>
                <div className="verticalScroll">
                    <ReviewPreview
                        ellipse85="/ellipse-85@2x.png"
                        iFeel="I feel"
                        rectangle1480="/rectangle-1480@2x.png"
                        prop="아이들 리뷰 제목"
                        onContainerClick={onContainerClick}
                    />
                    <ReviewPreview
                        ellipse85="/ellipse-85@2x.png"
                        iFeel="I feel"
                        rectangle1480="/rectangle-1480@2x.png"
                        prop="아이들 리뷰 제목"
                        onContainerClick={onContainerClick}/>
                </div>
            </section>
            <section className={styles.homeSection}>
                <div className={styles.sectionTitle}>
                    <div>곡 별점</div>
                    <ToggleFilter menu={["최근", "인기"]}/>
                </div>
                <div className="verticalScroll">
                    <TrackReview/>
                </div>
            </section>
            <section className={styles.homeSection}>
                <div className={styles.sectionTitle}>
                    <div>플레이리스트</div>
                </div>
                <div className="verticalScroll">
                    <PlaylistPreview
                        ellipse85="/ellipse-85@2x.png"
                        rectangle1480="/rectangle-1480-2@2x.png"
                        rectangle1479="/rectangle-1479@2x.png"
                        rectangle1478="/rectangle-1478@2x.png"
                        rectangle1477="/rectangle-1477@2x.png"
                        rectangle14781="/rectangle-1478-1@2x.png"
                        rectangle14791="/rectangle-1479-1@2x.png"
                        vector="/vector-15.svg"
                    />
                </div>
            </section>
        </div>
    );
};

export default Home;
