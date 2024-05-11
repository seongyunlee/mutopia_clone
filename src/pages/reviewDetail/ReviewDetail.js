import styles from './ReviewDetail.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import StarRating from '../../components/starRating/StarRating';

const ReviewDetail = () => {
    return (
        <>
        <div className={styles.reviewContainer}>
            <div className={styles.reviewWriter}>
                <span className={styles.writerName}>아무거나듣는사람</span>
                <img className={styles.writerPhoto} src="/defaultProfile.svg" />
            </div>
            <div className={styles.reviewCover}>
                <img className={styles.albumCover} src="/ive.png"/>
                <div className={styles.reviewInfo}>
                    <div className={styles.albumTitle}>9자넘으면...</div>
                    <div className={styles.artist}>아티스트</div>  
                    <div className={styles.rating}>
                        <StarRating score={10}/>
                    </div>
                    <div className={styles.dates}>2024.04.01 작성 (수정됨)</div>
                </div>
            </div>
            <div className={styles.reviewTitle}>
                리뷰제목이만약길어지면어떻게 되려나 말이야 모르겠네
            </div>
            <div className={styles.reviewContent}>
                &ldquo;다른 문을 열어/따라갈 필요는 없어&rdquo;라 외쳤던 &lsquo;I am&rsquo;의 가사가 무색하게 많은 것이 겹쳐 보인다. 베이스라인을 강조한 &lsquo;Off the record&rsquo;는 피프티 피프티의 &lsquo;Cupid&rsquo;와 태연의 &lsquo;Weekend&rsquo;가 레퍼런스로 삼은 도자 캣의 분홍색 디스코 감성을 닮았고, &lsquo;Baddie&rsquo;의 사운드 질감과 랩 위주의 구성에서 에스파의 &lsquo;Savage&rsquo;와 NCT의 잔향을 지우기란 쉽지 않다. 전통적인 색채로 &lsquo;정통성&rsquo;을 손에 쥐었던 아이브가 눈치를 많이 보고 있다.
                그동안 확고한 캐릭터로 단단한 입지를 구축한 그룹이기에 익숙한 무기를 내려놓은 이번 전략은 다소 의아하다. 사실 직전 정규 앨범 &lt; I&rsquo;ve IVE &gt;에서도 여러 장르적인 시도를 펼치긴 했으나 핵심으로 배치하지는 않았기에 &lt; I&rsquo;ve Mine &gt;의 태도 전환은 조금은 갑작스러운 면이 있다. 짐작하자면 맹렬한 고음과 선명한 멜로디 라인 중심의 이미지로 굳어지는 것에 대한 &ldquo;
            </div>
            <div className={styles.reivewNav}>
                <div className={styles.likeIcon}>
                    <img src="/favoritefilled.svg" alt="likes" className={styles.socialIcon} />
                    <div className={styles.socialCount}>3</div>    
                </div>
                <img src="/share.svg" alt="share" className={styles.shareIcon} />
            </div>
        </div>
        <button className={styles.btnWrite}>이 앨범 리뷰하기</button>        
        <div>
            <div className={styles.othersContainer}>
                다른 사람 리뷰 및 수록곡 리뷰
            </div>
        </div>
        </>
    );
}

export default ReviewDetail;