"use client";

import { useState } from "react";

export function Style({ image, selectedStyle, isSelected }: {
    image: string;
    selectedStyle: () => void;
    isSelected: boolean
}) {

    const [mouseOver, setMouseOver] = useState(false)

    return (
        <div onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)} onClick={selectedStyle} className="relative w-fit cursor-pointer transition-all hover:scale-105 ">

            {(mouseOver || isSelected) && (
                <>
                    <div className="absolute border-t border-black h-4 w-4 -rotate-45 -right-6 -top-4"></div>
                    <div className="absolute border-t border-black h-4 w-4 rotate-[-75deg] -right-3 -top-6"></div>
                    <div className="absolute border-t border-black h-4 w-4 rotate-[-20deg] -right-7 -top-0"></div>
                    <div className="absolute border-t border-black h-4 w-4 -rotate-45 -left-4 -bottom-6"></div>
                    <div className="absolute border-t border-black h-4 w-4 rotate-[-20deg] -left-6 -bottom-3"></div>
                    <div className="absolute border-t border-black h-4 w-4 rotate-[-75deg] -left-0 -bottom-7"></div>
                </>
            )}
            <img className="w-40 rounded-lg" src={image} alt="thumbnail" />
        </div>
    )
}