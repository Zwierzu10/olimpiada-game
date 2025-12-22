'use client'
import { useState } from "react";

export default function Inventory(){
    const [cosWybrane, setCosWybrane] = useState(false);
    return(
    <div className="w-full h-full flex justify-center items-center bg-[#1D1E22]">
        <div className="relative w-4/5 h-4/5">
            <div className="animated-border-box-glow absolute inset-0 rounded-xl"></div>
            <div className="animated-border-box absolute inset-0 rounded-xl"></div>

            <div className=" relative w-full h-full flex flex-row justify-between items-center z-10 p-4">
                <div className="w-55/100 h-full bg-[#313338] rounded-2xl">
                    {/* TU BEDA BRONIE */}
                </div>
                <div className={`w-35/100 h-full ${cosWybrane ? "bg-[#313338]" : "bg-[#292a2e]"} rounded-2xl`}></div>
            </div>

        </div>
    </div>
    )
}