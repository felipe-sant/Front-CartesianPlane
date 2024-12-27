import { useEffect, useState } from "react";

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth-40,
        height: window.innerHeight-40,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth-80,
                height: window.innerHeight-80,
            });
        };

        window.addEventListener('resize', handleResize);

        // Cleanup do event listener quando o componente é desmontado
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export default useWindowDimensions