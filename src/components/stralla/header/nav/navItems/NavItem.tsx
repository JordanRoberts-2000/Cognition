// --------------------------------------------------------
// Dropdown could be link?, button with onclick, more dropdowns
// dropdown detects edge of page?
// drop down opens up, opens up and clears space, slides in from left/right(needs back button)
// mega DropDown variant?? or element Prop
// deal with border and positioninig
// --------------------------------------------------------
import React, { useState } from "react"

type Props = {
    children?: React.ReactNode,
    nested?: true
    nestedDirection?: 'left' | 'right',
}

const NavItem = ({children, nested, nestedDirection="right"}: Props) => {
    const [active, setActive] = useState(false)
    return (
        <div className="relative group-[soup] border border-blue-500" 
            onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
            <button onClick={() => setActive((prev) => !prev)}>Docs</button>
            {children && 
                <div className={`absolute left-[-2px] flex flex-col transition duration-200
                    ${active ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-[-16px]"}
                    ${nested ? "top-[-2px]" : "top-full"}
                    ${nested && nestedDirection === "right" && "translate-x-[100%]"}
                    ${nested && nestedDirection === "left" && "translate-x-[-100%]"}
                    border border-red-500`}> 
                    {/* {React.Children.map(children, (child) => {
                        if (React.isValidElement(child)) {
                            if (child.type.displayName === 'NavItem') {
                                return React.cloneElement(child, { nested: true, nestedDirection });
                            }
                        }
                        return child;
                    })} */}
                </div>
            }
        </div>
    )
}

NavItem.displayName = "NavItem"
export default NavItem