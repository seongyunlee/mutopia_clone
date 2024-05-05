import styles from "./Search.module.css";
import {useState, useContext, useEffect} from "react";

const SearchBox = ({value, onChange}) => {
    return (
        <input
        type="search"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
    );
}

const SearchResults = ({results, searching}) => {
    // 우선 앨범 결과만 온다고 가정
    return (
        <article aria-busy={searching}>
            {searching ? (
                "Loading..."
            ) : (
                <>
                <header>검색 완료</header>
                <ul>
                    {results.map((result) => (
                        <li key={result.albumId}>
                            <h3>{result.albumNmae}</h3>
                            <p>{result.artistName}</p>
                        </li>
                    ))}                    
                 
                </ul>
                </>
            )}
        </article>
    );
}

const fetchResults = ({query}) => {
    return (
        // copliot 작성 코드
        fetch(`https://api.spotify.com/v1/search?q=${query}&type=album`)
        .then((res) => res.json())
        .then((data) => data.albums.items)
    );
}

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
      fetchResults(debouncedQuery).then((results) => {
        setResults(results);
        setSearching(false);
      });
    }, [debouncedQuery]);
  
    return (
      <>
        <SearchBox value={query} onChange={(e) => setQuery(e.target.value)} />
        <SearchResults results={results} searching={searching} />
      </>
    );
}

export default Search;