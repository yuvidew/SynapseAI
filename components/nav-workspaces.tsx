
import { ChevronRight, Folder, Link2, MoreHorizontal, Star, StarOff, Trash2 } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    useSidebar,
} from "@/components/ui/sidebar"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";

export function NavWorkspaces() {
    const id = usePathname().split("/")[2];
    const { isMobile } = useSidebar();
    const documentsList = useQuery(api.documents.getDocumentList, { context: "" });
    const removeFromFavorites = useMutation(api.documents.updateDocumentIsFavorites);

    const updateDocumentIsTrash = useMutation(api.documents.updateDocumentIsTrash);

    if (!documentsList) {
        return (
            <SidebarGroup>
                <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {[1, 2, 3, 4, 5].map((i) => (
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
        <SidebarGroup>
            <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {documentsList?.filter(({ isTrash }) => !isTrash).map(({ _id, context, result, isFavorites }) => (
                        <Collapsible key={_id} >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild >
                                    <SidebarMenuAction
                                        className="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
                                        showOnHover

                                    >
                                        <ChevronRight />
                                    </SidebarMenuAction>
                                </CollapsibleTrigger>
                                <SidebarMenuButton isActive={_id == id} asChild>

                                    <a href={`/dashboard/${_id}`} title={context}>
                                        <Folder className="size-4 text-[#FF5733]" />
                                        <span className=" w-[200px] truncate">{context}</span>
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
                                            <Link2 className="text-muted-foreground" />
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
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {result?.map(({ title }) => (
                                            <SidebarMenuItem key={title}>
                                                <SidebarMenuButton asChild className="line-clamp-1">
                                                    <span className=" line-clamp-1">{title}</span>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                        {/* Add your submenu items here */}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
