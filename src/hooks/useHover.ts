import { MutableRefObject, useEffect, useRef, useState } from "react";

export function useHover<T>(): [MutableRefObject<T>, boolean] {
    const [isHover, setIsHover] = useState<boolean>(false);

    const ref: any = useRef<T | null>(null);

    const handleMouseOver = (): void => setIsHover(true);
    const handleMouseOut = (): void => setIsHover(false);

    useEffect(() => {
        const node: any = ref.current;

        if (node) {
            node.addEventListener('mouseover', handleMouseOver);
            node.addEventListener('mouseout', handleMouseOut);

            return () => {
                node.removeEventListener('mouseover', handleMouseOver);
                node.removeEventListener('mouseout', handleMouseOut);
            };

        }
    }, [ref.current]);
    return [ref, isHover];
}  
