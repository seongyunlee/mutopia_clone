import styles from './LikedTrackList.module.css';
import TrackItem from '../trackItem/TrackItem';

const LikedTrackList = () => {
    return(
        <div className={styles.container}>
            <TrackItem/>
            <TrackItem/>
            <TrackItem/>
            <TrackItem/>
            <TrackItem/>
            <TrackItem/>
            <TrackItem/>
            <TrackItem/>
            <TrackItem/>
            <TrackItem/>
        </div>
    )
};

export default LikedTrackList;