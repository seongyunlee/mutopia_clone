import styles from './LoginModal.module.css';

const LoginModal = () => {

    const moveToKakaoLogin = () => {
        document.location.href = `${process.env.REACT_APP_API_HOST}/oauth2/authorization/kakao`
    }

    const moveToGoogleLogin = () => {
        document.location.href = `${process.env.REACT_APP_API_HOST}/oauth2/authorization/google`
    }


    return (
        <div>
            <dialog id="loginModal" className={styles.loginModal}>
                <div className={styles.loginHeader}>
                    로그인하기
                </div>
                <div className={styles.loginItemContainer}>
                    <div className={styles.loginItem} onClick={moveToKakaoLogin}>
                        <img className={styles.loginItemIcon} alt="카카오" src="/kakao-icon.svg"></img>
                        <div>카카오로 로그인하기</div>
                    </div>
                    <div className={styles.loginItemIcon} className={styles.loginItem} onClick={moveToGoogleLogin}>
                        <img alt="구글" src="/google-icon.svg" className={styles.loginItemIcon}></img>
                        <div>구글로 로그인하기</div>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default LoginModal;