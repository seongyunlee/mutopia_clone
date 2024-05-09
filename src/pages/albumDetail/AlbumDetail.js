
import { createPortal } from "react-dom";
import styles from "./AlbumDetail.module.css";
import {useEffect, useState, useRef} from "react";
import {useParams} from "react-router-dom";
import AlbumReviewWrite from "../../components/albumReviewModal/AlbumReviewWrite";
import ReviewPreview from "../../components/reviewPreview/ReviewPreview";
import PlaylistPreview from "../../components/playlistPreview/PlaylistPreview";
import ToggleFilter from "../../components/toggleFilter/ToggleFilter";
import TrackReview from "../../components/trackReview/TrackReview";

const MainPage = () => {
    return (
        <div className="mainPage">
            <h2>수록곡</h2>
            <div className="trackList">
                <div className="track">
                    <span className="trackNumber">1</span>
                    <span className="trackName">클린카드 (Queencard)</span>
                    <span className="trackTime">03:48</span>
                    <span className="trackRating">4.2 / 5</span>
                </div>
                {/* Repeat for other tracks */}
            </div>

            <h2>탑리뷰</h2>
            <div className="userReview">
                <img src="user-profile.jpg" alt="User profile" className="userImage"/>
                <div className="reviewContent">
                    <div className="userName">아침나무늘보님</div>
                    <div className="reviewDate">작성일 2024.04.01</div>
                    <div className="reviewText">내가 봤던 최고의!</div>
                    <div className="reviewLikes">
                        <span className="heartIcon">❤️</span>
                        <span>76</span>
                    </div>
                </div>
            </div>

            <h2>평점</h2>
            <div className="ratingSummary">
                <div className="ratingStars">★★★★★</div>
                <div className="ratingCount">5</div>
            </div>
        </div>
    );
};

const ReviewPage = () => {
    const onContainerClick = () => {
    };
    return (
        <div className="reviewPage">
            <section className={styles.homeSection}>
                <div className={styles.sectionTitle}>
                    <h2>앨범리뷰</h2>
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

            <h2>수록곡 리뷰</h2>
            <ToggleFilter menu={["최근", "인기"]}/>
            <section className={styles.homeSection}>
                <div className="verticalScroll">
                    <TrackReview/>
                </div>
            </section>
        </div>
    );
};


const ListPage = () => {
    return (
        <section className={styles.homeSection}>
        <div className={styles.sectionTitle}>
            <h2>플레이리스트</h2>
            <ToggleFilter menu={["최근", "인기"]}/>
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
    );
};
// 앨범 상세페이지 컴포넌트
const AlbumDetailsPage = (props) => {
    console.log(props.albumId)
    const [reviewWriteModalOpen, setReviewWriteModalOpen] = useState(false);
    const reviewWriteModalBackground = useRef();
    //const [] = useState(false);

    return (        
      <div className={styles.albumPage}>
        <div className={styles.albumArtContainer}>
          <img src="/ive.png" alt="Album Art" className={styles.albumArt} />
        </div>
        <div className={styles.albumInfo}>
          <h1>I feel</h1>
          <p>2023.05.15 | KR | 6곡 1시간 17분 소요</p>
          <p>(여자)아이들</p>
        </div>
        <div className={styles.ratingInfo}>
          <div className={styles.totalReviews}>Total Reviews 2414</div>
          <div className={styles.averageRating}>Average Ratings 4.2 / 5</div>
          <div className={styles.yourRating}>Your Ratings ? / 5</div>
        </div>
        <button className={styles.reviewButton} onClick={() => setReviewWriteModalOpen(true)}>이 앨범 리뷰하기 / 나의 리뷰 보기</button>
        <div className={styles.socialButtons}>
          <img src="/Vector.svg" alt="Vector" className={styles.socialIcon} />
          <img src="/share.svg" alt="Share" className={styles.socialIcon} />
          <img src="/bookmark_border.svg" alt="Bookmark" className={styles.socialIcon} />
          <img src="/control_point.svg" alt="Control Point" className={styles.socialIcon} />
          <img src="/open_in_new_off.svg" alt="Open in New" className={styles.socialIcon} />
        </div>
        {/* NavigationBar 컴포넌트 추가 */}
        <NavigationBar />
        
        {reviewWriteModalOpen &&            
               <AlbumReviewWrite albumId={props.albumId}
                    reviewWriteModalOpen={reviewWriteModalOpen}
                    setReviewWriteModalOpen={setReviewWriteModalOpen}
                    reviewWriteModalBackground={reviewWriteModalBackground}
               />
        }

      </div>
    );
  };

  // NavigationBar 컴포넌트
const NavigationBar = () => {
    const [tab, setTab] = useState('main');
  
    return (
      <div>
        <div className={styles.navBar}>
          <button className={tab === 'main' ? styles.activeTab : styles.tab} onClick={() => setTab('main')}>메인</button>
          <button className={tab === 'review' ? styles.activeTab : styles.tab} onClick={() => setTab('review')}>리뷰</button>
          <button className={tab === 'list' ? styles.activeTab : styles.tab} onClick={() => setTab('list')}>리스트</button>
        </div>
        <div>
          {tab === 'main' && <MainPage />}
          {tab === 'review' && <ReviewPage />}
          {tab === 'list' && <ListPage />}
        </div>
      </div>
    );
  };

const AlbumDetail = () =>{
    const { id } = useParams(); // id 파라미터 추출

    return (
        <>
         <h1>Album ID: {id}</h1> {/* ID 출력 */}

        <AlbumDetailsPage albumId={id} />

        </>
    );
}

export default AlbumDetail;
