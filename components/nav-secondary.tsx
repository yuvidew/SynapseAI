"use client";

import React from "react"
import { Settings2, Trash2, } from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSetting } from "@/hooks/useSetting";
import { useTrash } from "@/hooks/useTrash";


export function NavSecondary() {
    const {openSetting} = useSetting();
    const {openTrash} = useTrash();
    return (
        <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={openSetting}>
                            <>
                            <Settings2 className="size-4" />
                            <span>Settings</span>
                            </>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={openTrash}>
                            <>
                            <Trash2 className="size-4" />
                            <span>Trash</span>
                            </>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
