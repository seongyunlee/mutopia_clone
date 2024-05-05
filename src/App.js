import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
//import HomeLogOut from "./pages/home/HomeLogOut";
import Header from "./components/header/Header";
import FooterNav from "./components/footer/FooterNav";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/editProfile/EditProfile";
import UserContextProvider from "./context/UserContext";
import Search from "./pages/search/Search";
import AlbumDetail from "./pages/albumDetail/AlbumDetail";

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
                        <Route path="/search" element={<Search/>}/>
                        <Route path="/albumDetail" element={<AlbumDetail/>}/>
                    </Routes>
                </div>
                <FooterNav/>
            </div>
        </UserContextProvider>
    );
}

export default App;
