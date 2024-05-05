import { createPortal } from "react-dom";
import styles from "./AlbumDetail.module.css";
import {useEffect, useState, useRef} from "react";
import AlbumReviewWrite from "../../components/albumReviewModal/AlbumReviewWrite";

const AlbumDetail = () =>{
    const [reviewWriteModalOpen, setReviewWriteModalOpen] = useState(false);
    const reviewWriteModalBackground = useRef();

    return (
        <>
        <div className={styles.reviewBtn}>
            <button className={styles.writeReview} onClick={() => setReviewWriteModalOpen(true)}>
            이 앨범 리뷰하기
            </button>
        </div>

        {reviewWriteModalOpen &&            
               <AlbumReviewWrite 
                    reviewWriteModalOpen={reviewWriteModalOpen}
                    setReviewWriteModalOpen={setReviewWriteModalOpen}
                    reviewWriteModalBackground={reviewWriteModalBackground}
               />
        }
        </>
    );
}

export default AlbumDetail;