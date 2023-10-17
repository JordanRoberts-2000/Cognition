import { useEffect, useRef, useState } from 'react'

const Accordion = ({children}: {children: [React.ReactNode, React.ReactNode]}) => {
    const [active, setActive] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if(active){
            if(!sectionRef.current)return
            requestAnimationFrame(() => {
                sectionRef.current!.style.opacity = '1'
            })
        }else{
            if(!sectionRef.current)return
            requestAnimationFrame(() => {
                sectionRef.current!.style.opacity = '0'
            })
        }
    }, [active])
    return(
        <>
            <button onClick={() => setActive((prev) => !prev)}>
                {children[0]}
            </button>
            <div className={`grid ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} transition-[grid-template-rows] duration-[500ms]`}>
                <div ref={sectionRef} className={`overflow-hidden opacity-0 row-span-2 ${active ? "duration-300 delay-[200ms]" : "duration-300"}`}>
                    {children[1]}
                </div>
            </div>
        </>
    )
}

export default Accordion

// ===========================================
// *** Notes ***
// ===========================================
// first child is clickable and toggles
// second child reveals/hides
// ===========================================