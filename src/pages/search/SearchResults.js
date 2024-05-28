import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./Search.module.css";

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE3MTUxNTgwNzksImV4cCI6MTc0NjY5NDA3OSwiYXVkIjoiIiwic3ViIjoidGVzdHVzZXIifQ._zVQhiluqkNvElvU45WPH2gaoPB7J_c_ZvTOU3zqvD0"
const SearchBox = ({inputRef, onChange, isSearching}) => {

    const clear = () => {
        inputRef.current.value = "";
        onChange();
    }

    return (
        <div className={styles.searchBox}>
            <img src="/search.svg" alt="search"/>
            <input
                className={styles.searchBoxInput}
                placeholder="Search..."
                ref={inputRef}
                onChange={onChange}
            />
            {
                isSearching &&
                <div className={styles.svgLoader}>
                    <svg className={styles.svgContainer} height="20" width="20" viewBox="0 0 100 100">
                        <circle className={styles.loaderSvgBg} cx="50" cy="50" r="45"></circle>
                        <circle className={styles.loaderSvgAnimate} cx="50" cy="50" r="45"></circle>
                    </svg>
                </div>
            }
            {!isSearching && inputRef?.current?.value !== "" &&
                <img src="/x-circle.svg" alt="x" onClick={clear} className={styles.searchBoxClear}/>
            }

        </div>
    );
}
const ResultItem = (props) => {

    const {onClick, result} = props;

    return (
        <div className={styles.resultItem} onClick={onClick}>
            <img src={result.coverImageUrl} className={styles.resultItemImg} loading="lazy"/>
            <div>
                <div className={styles.resultItemName}>{result.name}</div>
                <div className={styles.resultItemArtist}>{result.artistName}</div>
            </div>
        </div>
    );
}

const searchProgress = () => {
    return (
        <div className={styles.searchProgress}>
            Loading...
        </div>
    );
}

const SearchResults = ({albums, tracks}) => {

    const navigate = useNavigate(); // navigate 함수 사용

    const handleItemClick = (id) => {
        navigate(`/albumDetail/${id}`); // 페이지 이동
    };

    const handleTrackItemClick = (id) => {
        navigate(`/trackDetail/${id}`); // 페이지 이동
    }

    if (!albums && !tracks || (albums.length === 0 && tracks.length === 0)) {
        return (
            <div className={styles.typeKeyword}>
                음악, 앨범, 가수명으로 검색 할 수 있습니다.
            </div>
        );
    }


    return (
        <div className={styles.resultContainer}>
            {
                (albums && albums.length > 0) &&
                <section className={styles.resultSection}>
                    <div className={styles.resultSectionTitle}>
                        앨범
                    </div>
                    <div className={styles.searchResults}>
                        {albums.map((result) => (
                            <ResultItem key={result.id} result={result} onClick={() => handleItemClick(result.id)}/>
                        ))}
                    </div>
                </section>
            }
            {
                (tracks && tracks?.length > 0) &&
                <section className={styles.resultSection}>
                    <div className={styles.resultSectionTitle}>
                        곡
                    </div>
                    <div className={styles.searchResults}>
                        {tracks?.map((result) => {
                            // use albumCoverUrl as coverImageUrl
                            result.coverImageUrl = result.albumCoverUrl;
                            return (<ResultItem key={result.id} result={result}
                                                onClick={() => handleTrackItemClick(result.id)}/>)
                        })}
                    </div>
                </section>
            }
        </div>
    );
}

const getAlbums = async (query) => {
    if (!query) return [];
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/album/search?keyword=${query}`, {});
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const getTracks = async (query) => {
    if (!query) return [];
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/song/search?keyword=${query}&offset=0`, {});
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const Search = () => {
    const [albums, setAlbums] = useState([]);
    const [searching, setSearching] = useState(false);
    const [tracks, setTracks] = useState([]);

    const inputRef = useRef();

    const setQueryParams = (query) => {
        const url = new URL(window.location.href);
        url.searchParams.set('q', query);
        window.history.pushState({}, '', url);
    }

    const search = async () => {
        const now = inputRef.current.value;
        if (now === "") {
            const url = new URL(window.location.href);
            url.searchParams.delete('q');
            window.history.pushState({}, '', url);
            setTracks([]);
            setAlbums([]);
            return;
        }
        try {
            setTimeout(async () => {
                const changed = inputRef.current.value;
                if (changed === now) {
                    const [albums, tracks] = await Promise.all([getAlbums(changed), getTracks(changed)]);
                    setAlbums(albums);
                    setTracks(tracks);
                    setSearching(false);
                    setQueryParams(changed);
                }
            }, 500);
        } catch (e) {
        }
    }

    useEffect(() => {
        const query = new URLSearchParams(window.location.search).get('q');
        if (query) {
            inputRef.current.value = query;
            search();
        }
    }, []);

    return (
        <div className={styles.container}>
            <SearchBox inputRef={inputRef} onChange={(e) => search()} isSearching={searching}/>
            <SearchResults albums={albums} tracks={tracks} searching={searching}/>
        </div>
    );
}

export default Search;