import styles from "./ShareDialog.module.css";

const ShareDialog = (props) => {

    const {linkUrl, dialogId} = props;

    const closeDialog = () => {
        const dialog = document.getElementById(dialogId);
        dialog.close();
    }

    const copyLink = () => {
        // Clipboard API 사용
        navigator.clipboard.writeText(linkUrl)
            .then(() => {
                alert("링크가 복사되었습니다.")
            })
            .catch((err) => {
                console.error("복사 실패: ", err);
            });

    }

    return (
        <dialog id={dialogId} className={styles.dialogContainer}>
            <div className={styles.header}>
                <div className={styles.title}>
                    공유하기
                </div>
                <img src="/x-circle.svg" className={styles.closeButton} onClick={closeDialog}/>
            </div>
            <div className={styles.body}>
                <div className={styles.linkBox}>
                    <div className={styles.linkText}>
                        {linkUrl ? linkUrl : "undefined"}
                    </div>
                    <div className={styles.copyButton} onClick={copyLink}>
                        복사
                    </div>
                </div>
            </div>
        </dialog>
    );
}

export default ShareDialog;
