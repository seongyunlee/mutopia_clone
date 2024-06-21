import styles from './AddSong.module.css';
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import ItemAdd from "../../components/playlistItem/ItemAdd"

const AddSong = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef();
    const [recommendation, setRecommendation] = useState([])

    const playlistId = useParams().id;

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (isModalOpen) {
            navigate(-1);
        }
    };


    const getRecommendation = () => {
        const jwt = localStorage.getItem("accessToken");

        axios.get(`${process.env.REACT_APP_API_HOST}/user/playlist/${playlistId}/recommendation`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            .then((response) => {
                setRecommendation(response.data.songs);
                console.log(response.data);
            })
            .catch((error) => {
            });
    }

    useEffect(() => {
        getRecommendation();
    }, [playlistId]);

    useEffect(() => {
        const fetchResults = async (query) => {
            if (!query) return [];
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST}/song/search`, {
                    params: {
                        offset: 0,
                        keyword: query
                    }
                });
                return response.data;
            } catch (error) {
                console.error(error);
                return [];
            }
        };

        const debouncedQuery = setTimeout(async () => {
            if (query) {
                setSearching(true);
                const result = await fetchResults(query);
                setResults(result);
                setSearching(false);
            }
        }, 500);

        return () => clearTimeout(debouncedQuery);
    }, [query]);

    if (!isModalOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <div className={styles.modalTitle}>곡 추가하기</div>
                    <button className={styles.closeButton} onClick={toggleModal}>×</button>
                </div>
                <div className={styles.searchContainer}>
                    <img loading="lazy" src="/search.svg" alt="search" className={styles.searchIcon}/>
                    <input
                        type="search"
                        className={styles.searchBar}
                        value={query}
                        ref={inputRef}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                {query ? (
                    <SearchResults results={results} searching={searching}/>
                ) : (
                    <div className={styles.listContainer}>
                        <div className={styles.suggest}><h3>추천된 노래</h3></div>
                        {
                            recommendation?.map((track, index) => (
                                <ItemAdd key={index} track={track} playlistId={playlistId}/>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

const SearchResults = ({results, searching}) => {

    const playlistId = useParams().id;

    const getSongs = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_HOST}/user/playlist/${playlistId}`)
        return res?.data?.songs?.length;
    }

    const addSong = async (songId) => {
        const jwt = localStorage.getItem("accessToken");

        axios.post(`${process.env.REACT_APP_API_HOST}/user/playlist/${playlistId}/song`, {
            songId: songId,
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
        <div className={styles.listContainer}>
            <div className={styles.suggest}>
                {searching ? (
                    "Loading..."
                ) : (
                    results.map(result => (
                        <div key={result.id} className={styles.songItem} onClick={() => addSong(result.id)}>
                            <img loading="lazy" src={result.albumCoverUrl} alt="album cover"
                                 className={styles.songCover}/>
                            <div className={styles.songInfo}>
                                <div className={styles.songTitle}>{result.name}</div>
                                <div className={styles.songArtist}>{result.artistName}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AddSong;
