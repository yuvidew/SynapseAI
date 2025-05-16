import React from 'react'
import { Loader } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const spinnerVariants = cva('text-muted-foreground animate-spin', {
    variants: {
        size: {
            default: 'h-4 w-4',
            sm: 'h-2 w-2',
            lg: 'h-6 w-6',
            icon: 'h-10 w-10',
        },
        color : {
            orange : "text-[#FF5733]",
            white : "text-white"
        }
    },
    defaultVariants: {
        size: 'default',
        color : "orange"
    },
})

type SpinnerProps = VariantProps<typeof spinnerVariants>

const Spinner: React.FC<SpinnerProps> = ({ size  , color}) => {
    return <Loader className={cn(spinnerVariants({ size  , color}))} />
}

export default Spinner
