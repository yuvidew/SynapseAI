"use client"
import { useEffect, useState } from 'react';

const useScrollTop = (threshold: number = 10) => {
    const [scrolled, setScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > threshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return { scrolled };
};

export default useScrollTop;
