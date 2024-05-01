import styles from "./StarRating.module.css";

const Star = ({type}) => {

    if (type === 1) {
        return (
            <img src="/HalfStar.svg"/>
        )
    }
    if (type > 0) {
        return (
            <img src="/YellowStar.svg"/>
        )
    }
    return (
        <img src="/BlankStar.svg"/>
    )
}

const StarRating = (props) => {
    let {score} = props;


    function processScore(score) {
        // make score value to integer 0~10
        score = Math.round(score)
        if (score < 0) {
            score = 0;
        } else if (score > 10) {
            score = 10;
        }
    }

    processScore(score);

    const starIndex = [...Array(5)];


    return (
        <div className={styles.container}>
            {
                starIndex.map((_, index) => (
                    <Star type={score - index * 2}/>
                ))
            }
        </div>
    );
}

export default StarRating;