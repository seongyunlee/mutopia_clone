import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
//import HomeLogOut from "./pages/home/HomeLogOut";
import Header from "./components/header/Header";
import FooterNav from "./components/footer/FooterNav";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/editProfile/EditProfile";
import FollowUser from "./pages/followUser/followUser";
import UserContextProvider from "./context/UserContext";
import Search from "./pages/search/Search";
import SearchResults from "./pages/search/SearchResults";
import AlbumDetail from "./pages/albumDetail/AlbumDetail";
import ReviewDetail from "./pages/reviewDetail/ReviewDetail";
import StarRating3 from "./components/starRating2/StarRating3";
import Playlist from "./pages/playlist/Playlist";
import AddSong from "./pages/addSong/AddSong";
import PlaylistAdd from "./pages/playlist/PlaylistAdd";

function App() {

    return (
        <UserContextProvider>
            <div className="App">
                <Header isLogin="true"/>
                <div className="frameWrapper">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/editProfile" element={<EditProfile/>}/>
                        <Route path="/search" element={<SearchResults/>}/>
                        <Route path="/albumDetail/:id" element={<AlbumDetail/>}/>
                        <Route path="/reviewDetail" element={<ReviewDetail/>}/>
                        <Route path="/reviewDetail/:id" element={<ReviewDetail/>}/>
                        <Route path="/followUser" element={<FollowUser/>}/>
                        <Route path="/playlist" element={<Playlist/>} />
                        <Route path="/addSong" element={<AddSong/>} />
                        <Route path="/playlistadd" element={<PlaylistAdd/>} />
                    </Routes>
                </div>
                <FooterNav/>
            </div>
        </UserContextProvider>
    );
}

export default App;
