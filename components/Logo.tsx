import { cn } from '@/lib/utils'
import { FileStack } from 'lucide-react'
import { Poppins } from 'next/font/google';
import React from 'react'

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
});

interface LogoProps {
    size?: "sm" | "lg",
}

export const Logo = ({ size = "sm" }: LogoProps) => {
    return (
        <div className="flex items-center gap-x-3">
            <FileStack className={`text-[#FF5733] ${size == "lg" ? "lg:size-12 md:size-8 size-7" : "size-6"}`} />
            <p className={cn("font-semibold", font.className, size == "lg" ? "lg:text-4xl md:text-2xl text-xl" : "lg:text-lg md:text-md text-sm")}>SynapseAI</p>
        </div>
    )
}
