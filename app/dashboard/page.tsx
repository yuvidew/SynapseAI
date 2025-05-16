import React from 'react'
import { Header } from './_components/Header'
import { SearchInput } from './_components/SearchInput'
import { Logo } from '@/components/Logo';



export default function DashboardPage() {
    
    return (
        <>
            <Header
                isTitle={false}
            />
            <div className='h-[90%] flex items-center justify-center'>
                <div className='flex flex-col  gap-6 w-[90%] md:w-[80%] lg:w-[50%]'>
                    <Logo size='lg' />
                    <SearchInput />
                </div>
            </div>
            <div>
                
        
            </div>
        </>
    )
}
