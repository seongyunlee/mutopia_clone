
import styles from './PlaylistAdd.module.css';

const PlaylistAdd = () => {
  return (
    <div className={styles.addPlaylist}>
        <div className={styles.addListContainer}>
            <img src="./listadd.svg" alt="listadd" className={styles.listadd} />
            <p>새로운 리스트</p>
        </div>

        <div className={styles.playlistItem}>
            <img src="./rectangle-1477@2x.png" alt="Album Cover" className={styles.albumArt} />
            <p>운동할 때 듣는 노래</p>
            <input type="checkbox" className={styles.playlistCheckbox} />
        </div>

      <button className={styles.musicAddButton}>리스트 선택하기</button>
    </div>
  );
};

export default PlaylistAdd;
