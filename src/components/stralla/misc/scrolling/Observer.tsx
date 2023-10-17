import { useEffect, useRef } from "react"

type Props = {
    children: React.ReactNode,
    onEnterViewport?: () => void,
    onExitViewport?: () => void
}

const Observer = ({children, onEnterViewport, onExitViewport}: Props) => {
    const observerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // Margin around the root
        threshold: 0, // Trigger when 0% of the target is visible
        };

        const callback = (entries: any[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && onEnterViewport) {
                    onEnterViewport();
                } else {
                    if(onExitViewport)onExitViewport();
                }
            });
        };
        const observer = new IntersectionObserver(callback, options);
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [onEnterViewport, onExitViewport]);
    return (
        <div ref={observerRef}>
            {children}
        </div>
    )
}

export default Observer