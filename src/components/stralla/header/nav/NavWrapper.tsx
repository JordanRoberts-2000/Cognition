// ******************************
// auto focus on something when opened?
// check eventlistener with useRef??
// onScroll close nav?? prevent scroll??
// user accesibility tabbing on hidden nav???
// ******************************
import { VariantProps, cva } from 'class-variance-authority'
import { useCallback, useContext, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import ReactDOM from 'react-dom'
import { HeaderContext } from '../contextProvider/HeaderContextProvider'

type Props = 
React.HTMLAttributes<HTMLElement> &
VariantProps<typeof variants> & {
    children: React.ReactNode
}

const variants = cva(
    // Base styles
    [
        'transition-all duration-500 h-[100vh] sm:h-auto',
    ], {
    variants: {
        animationVariant: {
            coverLeft: ['fixed right-[100%] top-0'],
            coverRight: ['fixed left-[100%] top-0 md:static md:h-auto '],
            coverTop: [],
            revealLeft: ['fixed top-0 left-0 -z-10'],
            revealRight: ['fixed top-0 right-0 -z-10'],
            revealRightTakeHeader: ['fixed top-0 right-0 -z-10'],
            revealLeftTakeHeader: ['fixed top-0 left-0 -z-10'],
            revealLeftSlide: [],
            revealRightSlide: [],
            revealLeftSlideTakeHeader: [],
            revealRightSlideTakeHeader: [],
            revealLeftShrink: [],
            revealLeftShrinkTurn: [],
            revealRightShrink: [],
            revealLeftRightTurn: [],
            shiftTop: [],
            shiftLeft: [],
            shiftRight: [],
            shiftLeftTakeHeader: [],
            shiftRightTakeHeader: [],
            scaleDownFadeOut: []
        },
        active: {
            true: [],
        },
    },
    defaultVariants: {
        
    }
})

// Tree shaking purposes
const navAnimationFunctionMap : { [key: string] : (ref: HTMLElement, wrapperRef?: HTMLDivElement) => void} = {
    coverLeft: (ref) => {
        requestAnimationFrame(() => {
            ref.style.transform = `translate(100%, 0)`
        })
    },
    coverRight: (ref) => {
        requestAnimationFrame(() => {
            ref.style.transform = `translate(-100%, 0)`
        })
    },
    revealLeft: (ref, wrapperRef) => {
        requestAnimationFrame(() => {
            wrapperRef!.style.transform = `translate(${ref.offsetWidth}px, 0)`
        })
    },
    revealLeftTakeHeader: (ref, wrapperRef) => {
        requestAnimationFrame(() => {
            wrapperRef!.style.transform = `translate(${ref.offsetWidth}px, 0)`
        })
    },
    revealRight: (ref, wrapperRef) => {
        requestAnimationFrame(() => {
            wrapperRef!.style.transform = `translate(-${ref.offsetWidth}px, 0)`
        })
    },
    revealRightTakeHeader: (ref, wrapperRef) => {
        requestAnimationFrame(() => {
            wrapperRef!.style.transform = `translate(-${ref.offsetWidth}px, 0)`
        })
    },
};

const NavWrapper = ({children, className}: Props) => {
    const { shifitngMainContent, active, setActive, navRef, animationVariant, screenWidth } = useContext(HeaderContext);
    
    const checkAnimationTypeZindex = () => {
        let prefixes = ['revealLeftTakeHeader', 'revealRightTakeHeader']
        let prefixes2 = ['revealLeft', 'revealRight']
        for(let prefix of prefixes){
            if(prefix === animationVariant)return 50
        }
        for(let prefix of prefixes2){
            if(prefix === animationVariant)return 40
        }
        return -10
    }
    const navOverlay = useRef<HTMLDivElement>(null)
    const handleOnClick = () => {
        setActive!(false)
    }
    const handleKeyDown = useCallback((e: any) => {
        if(e.key === "Escape"){
            e.preventDefault()
            setActive!(false)
        }
    },[])
    const openNav = () => {
        if(animationVariant && navAnimationFunctionMap[animationVariant]){
            navAnimationFunctionMap[animationVariant](navRef!.current!, navOverlay.current!)
        }
    }
    const closeNav = () => {
        requestAnimationFrame(() => {
            navRef!.current!.style.transform = `translate(-50%, 0)`
            navOverlay.current!.style.transform = `translate(0, 0)`
        })
    }
    useEffect(() => {
        if(active){
            openNav()
            window.addEventListener('keydown', handleKeyDown)
        }else{
            closeNav()
            window.removeEventListener('keydown', handleKeyDown)
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    },[active])
    if(shifitngMainContent && screenWidth < 800){
        return ReactDOM.createPortal(
            <>
                <div ref={navOverlay} style={{ zIndex: checkAnimationTypeZindex() }} 
                    className={`beez bg-black/30 fixed w-full h-[100vh] left-0 top-0 transition-all duration-500
                    ${active ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                    onClick={() => handleOnClick()}/>
                <nav ref={navRef} className={twMerge(variants({className, animationVariant, active}))}>
                    {children}
                </nav>
            </>,
            document.body
        )
    }
    return (
        <>
            <div ref={navOverlay} style={{ zIndex: checkAnimationTypeZindex() }} 
                className={`beez bg-black/30 fixed w-full h-[100vh] left-0 top-0 transition-all duration-500
                ${active ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={() => handleOnClick()}/>
            <nav ref={navRef} className={twMerge(variants({className, animationVariant, active}))}>
                {children}
            </nav>
        </>
    )
}

export default NavWrapper