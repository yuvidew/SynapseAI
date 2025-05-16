"use client"

import { Home, Search } from "lucide-react"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSearchPopUp } from "@/hooks/useSearchPopUp"
import { usePathname, useRouter } from "next/navigation";

export function NavMain() {
    const {openPopup} = useSearchPopUp();
    const path = usePathname();
    const router = useRouter();
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    onClick={openPopup}
                    className="mb-1"
                >
                    <Search />
                    <span>Search</span>
                </SidebarMenuButton>

                <SidebarMenuButton
                    isActive={path == "/dashboard"}
                    className="mb-1"
                    onClick={() => {
                        router.push("/dashboard");
                    }}
                >
                    <Home />
                    <span>Home</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
