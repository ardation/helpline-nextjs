import { useEffect, useState } from 'react';

const useWindowSize = (): { width: number | undefined; height: number | undefined } => {
    const isClient = typeof window === 'object';

    const [state, setState] = useState<{ width: number; height: number }>({
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined,
    });

    useEffect(() => {
        if (!isClient) {
            return;
        }
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
