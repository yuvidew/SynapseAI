"use client"

import {
    Link,
    MoreHorizontal,
    Star,
    StarOff,
    Trash2,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Skeleton } from "./ui/skeleton"
import { toast } from "sonner"

export function NavFavorites() {
    const { isMobile } = useSidebar()
    const documentsList = useQuery(api.documents.getDocumentList , { context: "" });
    const removeFromFavorites = useMutation(api.documents.updateDocumentIsFavorites);

    const updateDocumentIsTrash = useMutation(api.documents.updateDocumentIsTrash);

    if (!documentsList) {
            return (
                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <SidebarGroupLabel>Favorites</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {[1 ,2 ,3 ,4 ,5].map((i) => (
                                <SidebarMenuItem key={i}>
                                    <Skeleton className="h-5 w-full" />
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            )
        }
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Favorites</SidebarGroupLabel>
            <SidebarMenu>
                {documentsList?.filter(({ isFavorites  , isTrash}) => isFavorites && !isTrash).map(({_id , context , isFavorites}) => (
                    <SidebarMenuItem key={_id}>
                        <SidebarMenuButton asChild>
                            <a href={`/dashboard/${_id}`} title={context}>
                                <span>{context}</span>
                            </a>
                        </SidebarMenuButton>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction showOnHover>
                                    <MoreHorizontal />
                                    <span className="sr-only">More</span>
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align={isMobile ? "end" : "start"}
                            >
                                <DropdownMenuItem onClick={() => {
                                            removeFromFavorites({ id: _id })
                                            if (!isFavorites) {
                                                toast("Document added to favorites")
                                            }else{
                                                toast("Document removed from favorites")
                                            }
                                        }}>

                                            {isFavorites ? <StarOff className="text-muted-foreground" /> : <Star className="text-muted-foreground" />}
                                            {isFavorites ? <span>Remove from Favorites</span> : <span>Add to Favorites</span>}
                                        </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href

                                        )
                                        toast("Link copied to clipboard")
                                    }}
                                >
                                    <Link className="text-muted-foreground" />
                                    <span>Copy Link</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => {
                                            updateDocumentIsTrash({ id: _id }
                                            )
                                            toast("Document moved to trash")
                                        }}>
                                    <Trash2 className="text-muted-foreground" />
                                    <span>Move to Trash</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                ))}
                {documentsList?.filter(({ isFavorites }) => isFavorites).length === 0 && (
                    <SidebarMenuItem className="ml-3">
                    <p className="text-xs text-muted-foreground">No favorite document</p>
                    </SidebarMenuItem>
                )}
            </SidebarMenu>
        </SidebarGroup>
    )
}
