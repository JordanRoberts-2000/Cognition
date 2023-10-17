import React from 'react'

const TextInputInlineLabel = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="relative mt-2">
            <div className="flex absolute top-0 left-0 w-full">
                <div className="h-[2px] bg-black w-4"/>
                <label className="mx-1 translate-y-[-50%] font-medium">{children}</label>
                <div className="h-[2px] bg-black flex-1"/>
            </div>
            <input className="border-x-2 border-b-2 w-full border-black p-1 pl-2 font-medium"/>
        </div>
    )
}

export default TextInputInlineLabel