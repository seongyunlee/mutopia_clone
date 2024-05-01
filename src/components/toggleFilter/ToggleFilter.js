import {useState} from "react";
import styles from "./ToggleFilter.module.css";

const ToggleFilter = (props) => {
    let {menu, onFocusChange} = props;

    if (!menu) {
        menu = [];
    }
    if (!onFocusChange) {
        onFocusChange = () => {
        };
    }

    const [focused, setFocused] = useState(0);

    function onMenuClick(index) {
        setFocused(index);
        onFocusChange(index);
    }


    return (
        <div className={styles.container}>
            {menu.map((menu, index) => (
                <div
                    key={index}
                    className={`${styles.menu} ${focused === index ? styles.focus : ""}`}
                    onClick={() => onMenuClick(index)}
                >
                    {menu}
                </div>
            ))}
        </div>
    );
}

export default ToggleFilter;