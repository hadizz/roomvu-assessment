import {useEffect, useRef} from 'react';

const useMounted = (): boolean => {
    const isMounted = useRef<boolean>(false);

    useEffect(() => {
        isMounted.current = true

        return () => {
            isMounted.current = false
        }
    }, [])

    return isMounted.current
};

export default useMounted;
