// ===============================================================
// debounce the onchange handler when typing
// password && password hidden toggle
// front end vs backend
// remove error state onChange
// regex for different languages??
// comparisons eg: re-entered passwords match, username exists already
// error messages for each field
// tooltips
// ===============================================================
import { VariantProps, cva } from "class-variance-authority"
import { useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

type Props = React.InputHTMLAttributes<HTMLInputElement> & 
    VariantProps<typeof variants> & {
        validationType?: 'name' | 'username' | 'email' | 'password' | 'reEnterPassword' | 'phoneNumber'
        range?: [number | null, number]
        children: React.ReactNode
    }

const variants = cva(
    // Base styles
    [
        'disabled:bg-indigo-500/50 ring-indigo-500/70',
        'relative shadow border-2 border-black rounded-md p-1 pl-2',
        'transition outline-none disabled:shadow',
        'disabled:cursor-not-allowed',
        'ring-offset-2 focus-visible:ring-2 hover:shadow-md',
        'font-semibold',
    ], {
    variants: {
        valid: {
            true: ['bg-green-400'],
            false: ['bg-red-500'],
            null : [],
        },
    },
})

const validationFunctionMap : { [key: string] : (input: string, range?: [number | null, number]) => boolean} = {
    name: (input, range) => {
        const nameRegEx = /^[a-z]+$/i
        if(range && range[0] && input.length < range[0])return false
        if(!input.match(nameRegEx))return false
        return true
    },
    username: (input, range) => {
        const usernameRegEx = /^[\w]+$/
        const numberRequirement = /[\d]/g
        if(range && range[0] && input.length < range[0])return false
        if(!input.match(usernameRegEx))return false // can only use characters x y z
        if(!input.match(numberRequirement) || !input.match(numberRequirement)!.length)return false // needs a number
        return true
    },
    email: (input, range) => {
        const emailNumberRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if(range && range[0] && input.length < range[0])return false
        if(!input.match(emailNumberRegEx))return false
        return true
    },
    phoneNumber: (input, range) => {
        const phoneNumberRegEx = /^\d{11}$/
        if(range && range[0] && input.length < range[0])return false
        if(!input.match(phoneNumberRegEx))return false
        return true
    },
    password: (_input, _range) => {
        return true
    },
    reEnterPassword: (_input, _range) => {
        return true
    }
};

const TextInput = ({validationType, range, children, className, ...rest}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [valid, setValid] = useState<boolean | null>(null)
    const handleKeyPress = (_e: any) => {
        // var key = e.keyCode || e.charCode;
        // if((key == 8 || key == 46) && valid === false){
        //     setValid(null)
        // }
    }
    const handleOnChange = (e: any) => {
        // if(validationFunctionMap['email'](e.target.value, range)){
        //     setValid(true)
        // }else{
        //     setValid(false)
        // }
        if(validationType && validationFunctionMap[validationType]){
            if(validationFunctionMap[validationType](e.target.value, range)){
                setValid(true)
            }else{
                setValid(false)
            }
        }
    }
    return (
        <div className="flex flex-col">
            <label className="font-medium">{children}</label>
            <input {...rest} {...(validationType === 'password' && {type: 'password'})} ref={inputRef} maxLength={range ? range[1] : undefined} onChange={(e) => handleOnChange(e)} onKeyDown={(e) => handleKeyPress(e)} 
                className={twMerge(variants({valid, className}))}/>
        </div>
    )
}

export default TextInput