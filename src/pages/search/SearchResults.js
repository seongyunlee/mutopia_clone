import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./Search.module.css";

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE3MTUxNTgwNzksImV4cCI6MTc0NjY5NDA3OSwiYXVkIjoiIiwic3ViIjoidGVzdHVzZXIifQ._zVQhiluqkNvElvU45WPH2gaoPB7J_c_ZvTOU3zqvD0"
const SearchBox = ({value, onChange}) => {
    return (
        <div className={styles.searchBox}>
            <img src="/search.svg" alt="search"/>
            <input
                className={styles.searchBoxInput}
                type="search"
                placeholder="Search..."
                value={value}
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

const fetchResults = async ({query}) => {
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

const useDebouncedState = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
}

const Search = () => {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebouncedState(query, 1_000);
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        setSearching(true);
        // console.log(debouncedQuery);

        (async () => {
            let results = await fetchResults({query: debouncedQuery});
            while (results.length === 0) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                //console.log(results)
                results = await fetchResults({query: debouncedQuery});
            }
            setResults(results);
            setSearching(false);
        })();
    }, [debouncedQuery]);

    return (
        <div className={styles.container}>
            <SearchBox value={query} onChange={(e) => setQuery(e.target.value)}/>
            <SearchResults results={results} searching={searching}/>
        </div>
    );
}

export default Search;