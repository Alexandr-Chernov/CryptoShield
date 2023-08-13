import React, { useEffect, useState } from "react";

const LoadingAnimation = () => {

    const [downloadingText, setDownloadingText] = useState("Loading");

    useEffect(() => {
        const interval = setInterval(() => {
            setDownloadingText((prevText) => {
                if (prevText === "Loading...") {
                    return "Loading";
                } else {
                    return prevText + ".";
                }
            });
        }, 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <h1 className="loading">{downloadingText}</h1>
        </>
    );

}

export default LoadingAnimation;
