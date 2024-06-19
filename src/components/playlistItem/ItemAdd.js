import styles from './PlaylistItem.module.css';
import {useState} from "react";
import axios from 'axios';

const ItemAdd = ({track, playlistId}) => {

    const img = track?.image.url.length > 0 ? track?.image.url : "";
    const artist = track?.artists.length > 0 ? track?.artists[0].name : "";

    const getSongs = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_HOST}/user/playlist/${playlistId}`)
        return res?.data?.songs?.length;
    }

    const addSong = async () => {
        const jwt = localStorage.getItem("accessToken");
        console.log(track.id, "trackId");
        console.log(playlistId, "playlistId");

        axios.post(`${process.env.REACT_APP_API_HOST}/user/playlist/${playlistId}/song`, {
            songId: track.id,
            trackOrder: await getSongs()
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
            .then((response) => {
                alert("플레이리스트에 곡이 추가되었습니다.");
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    alert("권한이 없습니다.");
                } else {
                    alert("일시적인 오류가 발생했습니다.");
                }
            });
    }


    return (
        <div className={styles.trackContainer}>
            <img src={img} alt="album cover" className={styles.coverImg}/>
            <div className={styles.trackInfo}>
                <div className={styles.trackName}>{track?.name}</div>
                <div className={styles.albumArtist}>{artist}</div>
            </div>
            <div className={styles.etcContainer}>
                <img src="/add.svg" alt="etc" className={styles.etc} onClick={addSong}/>
            </div>
        </div>
    );
};

export default ItemAdd;
