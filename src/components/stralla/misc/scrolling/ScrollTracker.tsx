// TODO:
// customisation
// make certain onScroll needs to useCallback or not
import { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"

const ScrollTracker = () => {
    const [scrollY, setScrollY] = useState(0)
    const progressBarRef = useRef<HTMLDivElement>(null)
    let throttleActive = useRef(false)
    let timeOutId = useRef<number | undefined>(undefined)
    const onScroll = () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        if(throttleActive.current && scrollPercentage > 2 && scrollPercentage < 98)return
        throttleActive.current = true
        clearTimeout(timeOutId.current)
        timeOutId.current = setTimeout(() => throttleActive.current = false, 16)
        setScrollY(scrollPercentage)
    }
    useEffect(() => {
        requestAnimationFrame(() => {
            if(progressBarRef.current){
                progressBarRef.current.style.transform = `translate(${scrollY - 100}%, 0)`
            }
        })
    }, [scrollY])
    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])
    return ReactDOM.createPortal((
        <div className="h-2 z-[9999] top-0 w-full fixed">
            <div ref={progressBarRef} className="h-full translate-x-[-100%] duration-300 bg-blue-600"></div>
        </div>
    )
    ,document.body)
}

export default ScrollTracker

// ===========================================
// *** Notes ***
// ===========================================
// Throttled at 16ms (60fps)
// Include top-[x] in sticky header
// -------------------------------------------
// Uses transform instead of width as its more
// performant, body must use x-overflow: clip
// -------------------------------------------
// on rare occasions throttle timing prevents
// full/no progress therefore these values
// always checked
// ===========================================