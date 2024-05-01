import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import FooterNav from "./components/footer/FooterNav";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/editProfile/EditProfile";

function App() {

    return (
        <div className="App">
            <Header/>
            <div className="frameWrapper">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/editProfile" element={<EditProfile/>}/>
                </Routes>
            </div> 
            <FooterNav/>
        </div>
    );
}

export default App;
