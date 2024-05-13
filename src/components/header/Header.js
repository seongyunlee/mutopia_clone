import styles from "./Header.module.css";
import LoginModal from "../loginModal/LoginModal";
import {useContext, useEffect} from "react";
import axios from "axios";
import {UserContext} from "../../context/UserContext";

const Header = (props) => {

    const {user, setUser} = useContext(UserContext);

    const showModal = () => {
        const loginModal = document.getElementById("loginModal");
        loginModal.showModal();
    }

    const getUserInfo = () => {
        const token = localStorage.getItem('accessToken');
        axios.get(`${process.env.REACT_APP_API_HOST}/user/profile/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            const {profileUrl, isFirstLogin, name, id} = response.data;
            setUser({
                imageUrl: profileUrl,
                name: name,
                id: id,
            });
            if (isFirstLogin) {
                location.href = '/editProfile';
            }
        }).catch((error) => {
            setUser({
                imageUrl: "https://mblogthumb-phinf.pstatic.net/MjAyMTA3MTJfMjYx/MDAxNjI2MDQ1Mzk2NzI1.wPOZpA4eJ-hOLL5ktbeD8HneX0Mxm5bAnojZV1NB-SMg.EoU_Se3-qSDCSllBt5KHvd_15O3nh5ZP5nxe5CmMizEg.JPEG.oyeonwol0311/1626045389738.jpg?type=w800",
                name: "익명",
                id: "2333-ddnf-2323-2323-2323",
            });
            //alert("로그인 중 오류가 발생했습니다. 다시 로그인해주세요.");
            //localStorage.removeItem('accessToken');
            console.error(error);
        });
    }

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            getUserInfo();
        }
    }, []);


    const logout = () => {
        localStorage.removeItem('accessToken');
        setUser({});
        location.href = '/';
    }

    return (
        <div>
            <LoginModal/>
            <header className={styles.headerContainer}>
                <img className={styles.logo} src="/mutopia.svg" alt="MUTOPIA"></img>
                {user?.id ? (
                    <div className={styles.profileBtn} onClick={logout}>
                        <img className={styles.profileImg} src={user.imageUrl}/>
                    </div>) : (
                    <div onClick={showModal} className={styles.loginButton}>
                        로그인
                    </div>)}
            </header>
        </div>

    );
};

export default Header;
