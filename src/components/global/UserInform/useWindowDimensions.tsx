import { useState, useEffect, useLayoutEffect } from 'react';

// function getWindowDimensions() {
//     const { innerWidth: width, innerHeight: height } = window;
//     return {
//         width,
//         height
//     };
// }

export default function useWindowDimensions() {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    const handleSize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };

    useLayoutEffect(() => {
        handleSize();
        window.addEventListener("resize", handleSize);

        return () => window.removeEventListener("resize", handleSize);
    }, []);

    return windowSize;
};
