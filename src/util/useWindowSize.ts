import { useEffect, useState } from 'react';

const useWindowSize = (): { width: number; height: number } => {
    const [state, setState] = useState<{ width: number; height: number }>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handler = (): void => {
            setState({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handler);
        return (): void => window.removeEventListener('resize', handler);
    }, []);

    return state;
};

export default useWindowSize;
