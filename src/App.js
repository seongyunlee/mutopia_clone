import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
//import HomeLogOut from "./pages/home/HomeLogOut";
import Header from "./components/header/Header";
import FooterNav from "./components/footer/FooterNav";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/editProfile/EditProfile";
import FollowUser from "./pages/followUser/followUser";
import UserContextProvider from "./context/UserContext";
import SearchResults from "./pages/search/SearchResults";
import AlbumDetail from "./pages/albumDetail/AlbumDetail";
import TrackDetail from "./pages/trackDetail/TrackDetail";
import ReviewDetail from "./pages/reviewDetail/ReviewDetail";
import Playlist from "./pages/playlist/Playlist";
import AddSong from "./pages/addSong/AddSong";
import MakeList from "./pages/playlist/MakeList";

function App() {

    return (
        <UserContextProvider>
            <div className="App">
                <Header isLogin="true"/>
                <div className="frameWrapper">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/profile/:id" element={<Profile/>}/>
                        <Route path="/editProfile" element={<EditProfile/>}/>
                        <Route path="/search" element={<SearchResults/>}/>
                        <Route path="/albumDetail/:id" element={<AlbumDetail/>}/>
                        <Route path="/trackDetail/:id" element={<TrackDetail/>}/>
                        <Route path="/reviewDetail/:id" element={<ReviewDetail/>}/>
                        <Route path="/playlist/:id" element={<Playlist/>}/>
                        <Route path="/playlist/:id/addSong" element={<AddSong/>}/>
                        <Route path="/makeList" element={<MakeList/>}/>
                        <Route path="/makeList/:userId/:songId" element={<MakeList/>}/>
                        <Route path="/profile/:id/followers" element={<FollowUser/>}/>
                    </Routes>
                </div>
                <FooterNav/>
            </div>
        </UserContextProvider>
    );
}

export default App;
