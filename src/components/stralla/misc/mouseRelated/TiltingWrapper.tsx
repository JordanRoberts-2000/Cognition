// Hover over container or whole screen hover prop
// optional shadow
// throttle mousemove
// return to default animate
// range = hover
// detect mouse position on load?? useEffect??
import { HTMLAttributes, useEffect, useRef, useState } from "react"

type Props = HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode,
    maxDeg?: number | [number, number],
    range?: number | [number, number] | 'full',
    defaultPosition?: [number, number]
}

const TiltingWrapper = ({children, className, maxDeg=30, range="full", defaultPosition=[0, 0]}: Props) => {
    const [coords, setCoords] = useState<{x: number, y: number}>({x: defaultPosition[0], y: defaultPosition[1]})
    const wrapperRef = useRef<HTMLDivElement>(null)
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
        const element = wrapperRef.current;
        if (element) {
            const rect = element.getBoundingClientRect();
            // Calculate the center coordinates
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const offsetX = (e.clientX - centerX)
            const offsetY = (e.clientY - centerY)
            const degX = (offsetX / centerX) * (typeof maxDeg === "number" ? maxDeg : maxDeg[1])
            const degY = -1 * (offsetY / centerY) * (typeof maxDeg === "number" ? maxDeg : maxDeg[0])
            // Set the center coordinates in the state
            if(typeof range === "number"){
                if((e.clientX - rect.right) < range && (e.clientX - rect.left) > -range && 
                (e.clientY - rect.bottom) < range && (e.clientY - rect.top) > -range){
                    setCoords({ x: degY, y: degX });
                }else{
                    setCoords({x: defaultPosition[0], y: defaultPosition[1]})
                }
            }else if(Array.isArray(range)){
                if((e.clientX - rect.right) < range[0] && (e.clientX - rect.left) > -range[0] && 
                (e.clientY - rect.bottom) < range[1] && (e.clientY - rect.top) > -range[1]){
                    setCoords({ x: degY, y: degX });
                }else{
                    setCoords({ x: defaultPosition[0], y: defaultPosition[1] })
                }
            }else{
                setCoords({ x: degY, y: degX });
            }
        }
    }
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove)
        return () => document.removeEventListener('mousemove', handleMouseMove)
    },[])
    return (
        <div ref={wrapperRef} style={{transform: `perspective(1000px) rotateY(${coords.y}deg) rotateX(${coords.x}deg)`}} 
            className={` duration-75 ${className}`}>{children}</div>
    )
}

export default TiltingWrapper

// style={{transform: "perspective(1000px) rotateY(-20deg)"}}