"use client"
import { AppSidebar } from '@/components/app-sidebar'
import { SearchModal } from '@/components/Modals/SearchModal'
import { SettingModal } from '@/components/Modals/SettingModel'
import { TrashModel } from '@/components/Modals/TrashModel'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React, { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {

    return (
        <div className=" dark:bg-[#1f1f1f] h-full flex" >
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <main className=" flex-1 h-full overflow-y-auto">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
            <SearchModal/>
            <SettingModal/>
            <TrashModel/>
        </div>
    )
}
