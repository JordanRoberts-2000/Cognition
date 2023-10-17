import React from 'react'
import ShiftingMainContent2 from './ShiftingMainContent2'
import HeaderContextProvider from './contextProvider/HeaderContextProvider'
import { HeaderShifingVariants } from './types/HeaderTypings'

type Props = {
    children: React.ReactNode,
    headerElement: React.ReactNode,
    animationVariant: HeaderShifingVariants
}

const HeaderAndShiftingMain2 = ({children, headerElement, animationVariant}: Props) => {
    return (
        <HeaderContextProvider animationVariant={animationVariant} shifitngMainContent>
            {headerElement}
            <ShiftingMainContent2 animationVariant={animationVariant}>
                {children}
            </ShiftingMainContent2>
        </HeaderContextProvider>
    )
}

export default HeaderAndShiftingMain2