import {useEffect, useRef, useState} from "react";
import styles from "./ImgLoad.module.css";

const ImgLoad = (props) => {

    const {src, ..._props} = props;


    const placeholder = "/public/person.svg";

    const divRef = useRef();
    const imgRef = useRef();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const image = new Image();
        image.src = "https://source.unsplash.com/random";
        image.onload = () => {
            setIsLoading(false);
        }
    }, []);
    return (
        <div>
            {
                isLoading ? (
                    <div className={styles.imgLoad} ref={divRef}>
                    </div>
                ) : (
                    <img loading="lazy" src={src} {..._props} ref={imgRef}
                    ></img>
                )}
        </div>
    );
}

export default ImgLoad;