import styles from "./Search.module.css";
import axios from "axios";
import {useState, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE3MTUxNTgwNzksImV4cCI6MTc0NjY5NDA3OSwiYXVkIjoiIiwic3ViIjoidGVzdHVzZXIifQ._zVQhiluqkNvElvU45WPH2gaoPB7J_c_ZvTOU3zqvD0"
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

    const navigate = useNavigate(); // navigate 함수 사용

    const handleItemClick = (id) => {
        navigate(`/albumDetail/${id}`); // 페이지 이동
    };
    // 우선 앨범 결과만 온다고 가정
    return (
        <article aria-busy={searching}>
            {searching ? (
                "Loading..."
            ) : (
                <>
                <ul>
                    {results.map((result) => (
                        <li key={result.id} onClick={() => handleItemClick(result.id)}>
                            <h3>{result.name}</h3>
                            <p>{result.artistName}</p>
                        </li>
                    ))}                    
                 
                </ul>
                </>
            )}
        </article>
    );
}

const fetchResults = async ({query}) => {
    if (!query) return [];
    try {
        
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/album/search?keyword=${query}`, {
        });
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
      <>
        <SearchBox value={query} onChange={(e) => setQuery(e.target.value)} />
        <SearchResults results={results} searching={searching} />
      </>
    );
}

export default Search;