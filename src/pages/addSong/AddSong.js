import styles from './AddSong.module.css';
import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const AddSong = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef();

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (isModalOpen) {
            navigate(-1);
        }
    };

    useEffect(() => {
        const fetchResults = async (query) => {
            if (!query) return [];
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST}/album/search?keyword=${query}`, {});
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

    const recommendedSongs = [
        {
            id: 1,
            title: "Columbia",
            artist: "Quevedo",
            cover: "./rectangle-1513-5@2x.png"
        },
        {
            id: 2,
            title: "VETRI NERI",
            artist: "AVA, ANNA, Capo Plaza",
            cover: "./rectangle-1513-5@2x.png"
        },
        {
            id: 3,
            title: "BESO",
            artist: "ROSALÍA, Rauw Alejandro",
            cover: "./rectangle-1513-5@2x.png"
        },
        {
            id: 4,
            title: "EL TONTO",
            artist: "Lola Indigo, Quevedo",
            cover: "./rectangle-1513-5@2x.png"
        },
        {
            id: 5,
            title: "PLAYA DEL INGLÉS",
            artist: "Quevedo, Myke Towers",
            cover: "./rectangle-1513-5@2x.png"
        },
        {
            id: 6,
            title: "WHERE SHE GOES",
            artist: "Bad Bunny",
            cover: "./rectangle-1513-5@2x.png"
        },
        {
            id: 7,
            title: "Casanova",
            artist: "Soolking, Lola Indigo, Rvfv",
            cover: "./rectangle-1513-5@2x.png"
        },
        {
            id: 8,
            title: "MIRAGE (feat. Ozuna, GIMS & Sfera Ebbasta)",
            artist: "AriBeatz, Ozuna, GIMS, Sfera Ebbasta",
            cover: "./rectangle-1513-5@2x.png"
        }
    ];

    if (!isModalOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <div className={styles.modalTitle}>곡 추가하기</div>
                    <button className={styles.closeButton} onClick={toggleModal}>×</button>
                </div>
                <div className={styles.searchContainer}>
                    <img src="/search.svg" alt="search" className={styles.searchIcon} />
                    <input
                        type="search"
                        className={styles.searchBar}
                        value={query}
                        ref={inputRef}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                {query ? (
                    <SearchResults results={results} searching={searching} />
                ) : (
                    <RecommendedSongs songs={recommendedSongs} />
                )}
            </div>
        </div>
    );
};

const RecommendedSongs = ({ songs }) => {
    return (
        <div className={styles.songList}>
            <div className={styles.suggest}><h3>추천된 노래</h3></div>
            {songs.map(song => (
                <div key={song.id} className={styles.songItem}>
                    <img src={song.cover} alt="album cover" className={styles.songCover} />
                    <div className={styles.songInfo}>
                        <div className={styles.songTitle}>{song.title}</div>
                        <div className={styles.songArtist}>{song.artist}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const SearchResults = ({ results, searching }) => {
    return (
        <div className={styles.songList}>
            {searching ? (
                "Loading..."
            ) : (
                results.map(result => (
                    <div key={result.id} className={styles.songItem}>
                        <img src={result.coverImageUrl} alt="album cover" className={styles.songCover} />
                        <div className={styles.songInfo}>
                            <div className={styles.songTitle}>{result.name}</div>
                            <div className={styles.songArtist}>{result.artistName}</div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default AddSong;
