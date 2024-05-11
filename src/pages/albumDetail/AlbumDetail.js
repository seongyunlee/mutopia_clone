
import { createPortal } from "react-dom";
import styles from "./AlbumDetail.module.css";
import {useEffect, useState, useRef} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import AlbumReviewWrite from "../../components/albumReviewModal/AlbumReviewWrite";
import ReviewPreview from "../../components/reviewPreview/ReviewPreview";
import PlaylistPreview from "../../components/playlistPreview/PlaylistPreview";
import ToggleFilter from "../../components/toggleFilter/ToggleFilter";
import TrackReview from "../../components/trackReview/TrackReview";

const MainPage = () => {
    const onContainerClick = () => {
    };
    
    return (
        <div className="mainPage">
            <section className={styles.homeSection}>
                <div className={styles.sectionTitle}>
                    <h2>수록곡</h2>
                    <div className={styles.toggleContainer}>
                        <img src="/arrow_down.svg" alt="arrow" className={styles.arrow} />
                    </div>
                </div>

                <div className={styles.sectionTitle}>
                    <h2>탑리뷰</h2>
                    <div className={styles.toggleContainer}>
                        <img src="/arrow_up.svg" alt="arrow" className={styles.arrow} />
                    </div>
                </div>
                <div className="verticalScroll">
                    <TrackReview/>
                </div>

                <div className={styles.sectionTitle}>
                    <h2>별점</h2>
                </div>
            </section>
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
                    <div className={styles.toggleContainer}>
                        <ToggleFilter menu={["최근", "인기"]} />
                    </div>
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

                <div className={styles.sectionTitle}>
                    <h2>수록곡 리뷰</h2>
                    <div className={styles.toggleContainer}>
                        <ToggleFilter menu={["최근", "인기"]} />
                    </div>
                </div>
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
            <div className={styles.toggleContainer}>
                <ToggleFilter menu={["최근", "인기"]} />
            </div>
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
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    const reviewWriteModalBackground = useRef();
    const [albumInfo, setAlbumInfo] = useState(null);

    const fetchAlbumInfo = async () => {
        try {
            setIsLoading(true); // 데이터를 불러오기 시작할 때 로딩 상태를 true로 설정
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/album/info/${props.albumId}`, {});
            console.log(response.data);
            setAlbumInfo(response.data);
            setIsLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 설정
        } catch (error) {
            console.error('Failed to fetch album information:', error);
            setIsLoading(false); // 에러 발생 시 로딩 상태를 false로 설정
        }
    };

    useEffect(() => {
        fetchAlbumInfo();
    }, [props.albumId]);

    if (isLoading) {
        return <div>Loading album information...</div>; // 로딩 상태일 때 로딩 메시지 표시
    }

    return (
        <div className={styles.albumPage}>
            <div className={styles.contentContainer}> 
                <div className={styles.albumArtContainer}>
                    <img src={albumInfo.albumImg} alt="Album Art" className={styles.albumArt} />
                </div>
                <div className={styles.albumInfo}>
                    <h1>{albumInfo.albumName}</h1>
                    <p>2023.05.15 | KR | 6곡 | 총 1시간 17분</p>
                    <p>{albumInfo.artistName}</p>
                </div>
                <div className={styles.ratingInfo}>
                    <div className={styles.ratingItem}>
                        <div className={styles.value}>2414</div>
                        <div className={styles.label}>Total Reviews</div>
                    </div>
                    <div className={styles.ratingItem}>
                        <div className={styles.value}>4.2 / 5</div>
                        <div className={styles.label}>Average Ratings</div>
                    </div>
                    <div className={styles.ratingItem}>
                        <div className={styles.value}>? / 5</div>
                        <div className={styles.label}>Your Ratings</div>
                    </div>
                </div>
                
                <button className={styles.reviewButton} onClick={() => setReviewWriteModalOpen(true)}>이 앨범 리뷰하기 / 나의 리뷰 보기</button>
                <div className={styles.socialButtons}>
                    <img src="/Vector.svg" alt="Vector" className={styles.socialIcon} />
                    <img src="/share.svg" alt="Share" className={styles.socialIcon} />
                    <img src="/add.svg" alt="Add" className={styles.socialIcon} />
                </div>
            </div>
            <NavigationBar /> {/* This remains outside the new container */}
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
        <AlbumDetailsPage albumId={id} />

        </>
    );
}

export default AlbumDetail;
