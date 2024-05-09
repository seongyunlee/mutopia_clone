import styled from "@emotion/styled";
import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaStarHalf } from "react-icons/fa";

// 별들을 가로로 정렬하는 컨테이너
const RowBox = styled.div`
  display: flex;
  margin-top: -8px;
  margin-left: 5px;
  align-items: center; // 세로 축 가운데 정렬
`;

// 각 별을 담는 컨테이너, 위치 상대적
const StarDiv = styled.div`
  position: relative; // 내부 절대 위치 아이콘을 위해
  width: 30px; // 별 아이콘 크기에 맞춰 조정 가능
  height: 30px; // 높이도 동일하게
  margin: 2px;
  cursor: pointer; // 마우스 오버 시 포인터 변경
`;

// 별의 왼쪽 반을 담당하는 컴포넌트, 호버 이벤트 처리
const Left = styled.div`
  position: absolute; // 부모(StarDiv)에 대해 절대 위치
  width: 50%; // 부모의 절반 크기
  height: 100%; // 전체 높이
  left: 0; // 왼쪽 정렬
  z-index: 1; // 클릭 가능하도록 z-index 설정
`;

// 별의 오른쪽 반을 담당하는 컴포넌트
const Right = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  right: 0; // 오른쪽 정렬
  z-index: 1;
`;

const StarRating3 = ({ score, setScoreFixed }) => {
    const [localScore, setLocalScore] = useState(0);
  
    const handleLeftHalfEnter = (idx) => setLocalScore(idx + 0.5);
    const handleRightHalfEnter = (idx) => setLocalScore(idx + 1);
  
    const handleStarClick = () => {
      setScoreFixed(localScore);  // 여기를 localScore로 수정
    };
  
    const handleStarLeave = () => {
        if (localScore !== score) {
          setLocalScore(score);  // localScore를 score로 초기화
        }
    };
    
    return (
      <RowBox>
        {Array(5)
          .fill(0)
          .map((i, idx) => (
            <StarDiv key={idx} onClick={handleStarClick}>
              {score - Math.floor(score) === 0.5 && Math.floor(score) === idx ? (
                <FaStarHalfAlt
                  key={idx}
                  style={{ position: "absolute" }}
                  size={32}
                  color="gold"
                />
              ) : idx + 1 > score ? (
                <FaStar
                  key={idx}
                  style={{ position: "absolute" }}
                  size={32}
                  color="lightGray"
                />
              ) : (
                <FaStar
                  key={idx}
                  style={{ position: "absolute" }}
                  size={32}
                  color="gold"
                />
              )}
              <Left
                key={idx + "left"}
                onMouseEnter={() => handleLeftHalfEnter(idx)}
                onMouseLeave={handleStarLeave}
              />
              <Right
                key={idx + "right"}
                onMouseEnter={() => handleRightHalfEnter(idx)}
                onMouseLeave={handleStarLeave}
              />
            </StarDiv>
          ))}
      </RowBox>
    );
};

export default StarRating3;