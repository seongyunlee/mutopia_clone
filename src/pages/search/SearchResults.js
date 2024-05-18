import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./Search.module.css";

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE3MTUxNTgwNzksImV4cCI6MTc0NjY5NDA3OSwiYXVkIjoiIiwic3ViIjoidGVzdHVzZXIifQ._zVQhiluqkNvElvU45WPH2gaoPB7J_c_ZvTOU3zqvD0"
const SearchBox = ({inputRef, onChange}) => {
    return (
        <div className={styles.searchBox}>
            <img src="/search.svg" alt="search"/>
            <input
                className={styles.searchBoxInput}
                type="search"
                placeholder="Search..."
                ref={inputRef}
                onChange={onChange}
            />
        </div>
    );
}
const ResultItem = (props) => {

    const {onClick, result} = props;

    return (
        <div className={styles.resultItem} onClick={onClick}>
            <img src={result.coverImageUrl} className={styles.resultItemImg}/>
            <div>
                <div className={styles.resultItemName}>{result.name}</div>
                <div className={styles.resultItemArtist}>{result.artistName}</div>
            </div>
        </div>
    );
}

const SearchResults = ({results, searching}) => {

    const navigate = useNavigate(); // navigate 함수 사용

    const handleItemClick = (id) => {
        navigate(`/albumDetail/${id}`); // 페이지 이동
    };
    // console.log(results);
    // 우선 앨범 결과만 온다고 가정
    return (
        <div className={styles.searchResults}>
            {searching ? "Loading..." : ""}
            {results.map((result) => (
                <ResultItem key={result.id} result={result} onClick={() => handleItemClick(result.id)}/>
            ))}
        </div>
    );
}

const fetchResults = async (query) => {
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

const Search = () => {
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);

    const inputRef = useRef();

    const setQueryParams = (query) => {
        const url = new URL(window.location.href);
        url.searchParams.set('q', query);
        window.history.pushState({}, '', url);
    }

    const search = async () => {
        const now = inputRef.current.value;
        if (now === "") {
            return;
        }
        try {
            setTimeout(async () => {
                const changed = inputRef.current.value;
                if (changed === now) {
                    setSearching(true);
                    const result = await fetchResults(changed);
                    setQueryParams(changed);
                    setResults(result);
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
            <SearchBox inputRef={inputRef} onChange={(e) => search()}/>
            <SearchResults results={results} searching={searching}/>
        </div>
    );
}

export default Search;