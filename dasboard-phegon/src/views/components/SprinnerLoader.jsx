import { useEffect, useState } from "react";

export default function SPLoader() {
    const [text, setText] = useState("");
    const [showImg, setShowImg] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowImg(false);
            setText(
                "I waited for 3 seconds to be loaded, đi you see the sprinner?"
            );
        }, 3000);
    }, []);

    return (
        <>
            <div>{showImg ? <img src="./load.svg" /> : <h3>{text}</h3>}</div>
        </>
    );
}
