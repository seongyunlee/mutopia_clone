import styles from './LoginModal.module.css';
import {useEffect, useRef} from "react";

const LoginModal = () => {

    const moveToKakaoLogin = () => {
        document.location.href = `${process.env.REACT_APP_API_HOST}/oauth2/authorization/kakao`
    }

    const moveToGoogleLogin = () => {
        document.location.href = `${process.env.REACT_APP_API_HOST}/oauth2/authorization/google`
    }

    const modal = useRef();

    const handleBackdropClick = (event) => {
        if (event.target === modal.current) {
            modal.current.close();
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleBackdropClick);
    }, []);

    return (
        <div>
            <dialog id="loginModal" className={styles.loginModal} ref={modal}>
                <div className={styles.loginHeader}>
                    Mutopia에 로그인
                </div>
                <div className={styles.loginItemContainer}>
                    <div className={styles.loginItem} onClick={moveToKakaoLogin}>
                        <img className={styles.loginItemIcon1} alt="카카오" src="/kakao-icon.svg"></img>
                        <div>카카오로 로그인하기</div>
                    </div>
                    <div className={styles.loginItem} onClick={moveToGoogleLogin}>
                        <img alt="구글" src="/google.svg" className={styles.loginItemIcon2}></img>
                        <div>구글로 로그인하기</div>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default LoginModal;