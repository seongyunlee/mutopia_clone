import styles from './LikedTrackList.module.css';
import TrackItem from '../trackItem/TrackItem';

const LikedTrackList = () => {
    // 4곡씩 청크로 나누는 함수
    const chunkTracks = (tracks, chunkSize) => {
      const chunks = [];
      for (let i = 0; i < tracks.length; i += chunkSize) {
        chunks.push(tracks.slice(i, i + chunkSize));
      }
      return chunks;
    };
    
    const tracks = new Array(10).fill(0);
    // 트랙 리스트를 4곡씩 나눔
    const trackChunks = chunkTracks(tracks, 4);
  
    return (
      <div className={styles.container}>
        {trackChunks.map((chunk, index) => (
          <div key={index} className={styles.columnContainer}>
            {chunk.map((track, idx) => (
                <TrackItem  key={idx}/>

            ))}
          </div>
        ))}
      </div>
    );
  };
  

export default LikedTrackList;

/*
const LikedTrackList = ({ tracks }) => {
    // 4곡씩 청크로 나누는 함수
    const chunkTracks = (tracks, chunkSize) => {
      const chunks = [];
      for (let i = 0; i < tracks.length; i += chunkSize) {
        chunks.push(tracks.slice(i, i + chunkSize));
      }
      return chunks;
    };
  
    // 트랙 리스트를 4곡씩 나눔
    const trackChunks = chunkTracks(tracks, 4);
  
    return (
      <div className={styles.container}>
        {trackChunks.map((chunk, index) => (
          <div key={index} className={styles.columnContainer}>
            {chunk.map((track, idx) => (
              <div key={idx} className={styles.track}>
                {track.artist} - {track.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  

export default LikedTrackList;

*/