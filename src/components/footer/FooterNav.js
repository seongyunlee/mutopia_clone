import styles from "./Footer.module.css";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext";
import {useContext} from "react";

const FooterNav = ({}) => {

    const home = "/home.svg"

    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    function navigateHome() {
        navigate("/");
    }

    const showLoginModal = () => {
        alert("로그인이 필요합니다.");
        const loginModal = document.getElementById('loginModal');
        loginModal.showModal();
    }

    function navigateProfile() {
        if (user.id == null) {
            showLoginModal();
            return;
        }
        navigate(`/profile/${user.id}`);
    }

    function navigateeditProfile() {
        navigate("/addSong");
    }

    function navigateSearch() {
        navigate("/search");
    }

    return (
        <div className={styles.footerWrapper}>
            <nav className={styles.footer}>
                <div className={styles.footerItemContainer} onClick={navigateHome}>
                    <img loading="lazy" alt="" src="/home.svg"/>
                    <span className={styles.footerItemDesc}>홈</span>
                </div>
                <div className={styles.footerItemContainer} onClick={navigateeditProfile}>
                    <img loading="lazy" alt="" src="/menu.svg"/>
                    <span className={styles.footerItemDesc}>메뉴</span>
                </div>
                <div className={styles.footerItemContainer} onClick={navigateSearch}>
                    <img loading="lazy" alt="" src="/search.svg"/>
                    <span className={styles.footerItemDesc}>검색</span>
                </div>
                <div className={styles.footerItemContainer} onClick={navigateProfile}>
                    <img loading="lazy" alt="" src="/person.svg"/>
                    <span className={styles.footerItemDesc}>프로필</span>
                </div>
            </nav>
        </div>
    );
};

export default FooterNav;
