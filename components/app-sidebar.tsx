"use client"

import * as React from "react"


import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavWorkspaces } from "@/components/nav-workspaces"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Logo } from "./Logo"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar className="border-r-0" {...props}>
            <SidebarHeader>
                <div className="flex flex-col items-start gap-4">
                    <div className="py-2 px-1">
                        <Logo/>
                    </div>
                    <NavMain />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavFavorites />
                <NavWorkspaces />
                <NavSecondary  />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
