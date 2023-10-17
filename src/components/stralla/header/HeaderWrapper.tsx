import React, { useContext } from 'react'
import { useEffect, useRef } from 'react' 
import { HeaderVariations } from './types/HeaderTypings'
import HeaderContextProvider, { HeaderContext } from './contextProvider/HeaderContextProvider'

type Props = React.HTMLAttributes<HTMLElement> & {
    animationVariant?: HeaderVariations
    children?: React.ReactNode,
}

// Tree shaking purposes
const headerAnimationFunctionMap : { [key: string] : (headeRef: HTMLElement, navRef:HTMLElement) => void} = {
    revealLeftTakeHeader: (headeRef, navRef) => {
        requestAnimationFrame(() => {
            headeRef.style.transform = `translate(${navRef.offsetWidth}px, 0)`
        })
    },
    revealRightTakeHeader: (headeRef, navRef) => {
        requestAnimationFrame(() => {
            headeRef.style.transform = `translate(-${navRef.offsetWidth}px, 0)`
        })
    }
};

const HeaderWrapper2 = ({className, animationVariant, children}: Props) => {
    const {active, shifitngMainContent, setScreenWidth, 
        navRef, animationVariant: contextAnimationVariant} = useContext(HeaderContext);
    const headerRef = useRef<HTMLElement>(null)
    const animationVariantVar = animationVariant ?? contextAnimationVariant
    useEffect(() => {
        if(shifitngMainContent){
            const handleResize = () => {
                setScreenWidth!(window.innerWidth)
            } 
            window.addEventListener('resize', handleResize)
            return () => {
                window.removeEventListener('resize', handleResize)
            }
        }
    },[])
    useEffect(() => {

        if(active){
            if(animationVariantVar && headerAnimationFunctionMap[animationVariantVar]){
                headerAnimationFunctionMap[animationVariantVar](headerRef.current!, navRef!.current!)
            }
        }else{
            requestAnimationFrame(() => {
                headerRef.current!.style.transform = `translate(0, 0)`
            })
        }
    }, [active])
    if(shifitngMainContent){
        return(
            <header ref={headerRef} id={'header'} className={`flex sticky top-0 w-full transition-all duration-500 z-50 ${className}`}>
                {children}
            </header>
    )}
    return (
        <>
            <HeaderContextProvider animationVariant={animationVariant!}>
                <header ref={headerRef} id={'header'} className={`flex sticky top-0 w-full transition-all duration-500 z-50 ${className}`}>
                    {children}
                </header>
            </HeaderContextProvider>
        </>
    )
}

export default HeaderWrapper2