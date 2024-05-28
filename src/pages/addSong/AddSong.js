import styles from './AddSong.module.css';
import {useEffect, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import ItemAdd from "../../components/playlistItem/ItemAdd"

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
                        <ItemAdd/>
                        <ItemAdd/>
                        <ItemAdd/>
                        <ItemAdd/>
                        <ItemAdd/>
                        <ItemAdd/>
                        <ItemAdd/>
                    </div>
                )}
            </div>
        </div>
    );
};

const SearchResults = ({results, searching}) => {
    return (
        <div className={styles.songListContainer}>
            <div className={styles.songList}>
                {searching ? (
                    "Loading..."
                ) : (
                    results.map(result => (
                        <div key={result.id} className={styles.songItem}>
                            <img loading="lazy" src={result.coverImageUrl} alt="album cover"
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
