import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles.headerContainer}>
            <img className={styles.logo} src="/mutopia.svg" alt="MUTOPIA"></img>
            <div className={styles.profileBtn}>
                <img src="/baboland.svg"/>
            </div>
        </header>
    );
};

export default Header;
