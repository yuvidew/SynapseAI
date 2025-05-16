"use client"

import React from 'react'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/clerk-react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { ModeToggle } from '@/components/ModeToggle'
import { Skeleton } from '@/components/ui/skeleton'

export const Header = ({
    title,
    isTitle = false,
}: { title?: string,  isTitle?: boolean }) => {
    return (
        <header className=" py-5 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex w-full items-center justify-between px-4">
                <div className="flex items-center gap-2.5">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/dashboard`}>Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            {isTitle && 
                                (title?.length !== 0 ? (
                                    <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbPage className='w-[50%] truncate'>{title}</BreadcrumbPage>
                                    </>
                                ) : <Skeleton className=' h-7 w-52' />)
                            }
                        </BreadcrumbList>
                    </Breadcrumb>

                </div>
                <div className="flex items-center justify-end gap-1.5 relative">
                    <ModeToggle />
                    {typeof window !== "undefined" && <UserButton signInUrl="/sign-in" />}
                </div>
            </div>
        </header>
    )
}
