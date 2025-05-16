"use client";

import React from 'react';

import { useSearchPopUp } from '@/hooks/useSearchPopUp';
import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import {  useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
} from "@/components/ui/command"


export const SearchModal = () => {
    const { isOpen, closePopup } = useSearchPopUp();
    const router = useRouter();
    const documentList = useQuery(api.documents.getDocumentList , {});


    return (
        <CommandDialog open={isOpen}  onOpenChange = {closePopup}>
            <CommandInput 
                placeholder = {`Search documents...`}
            />
            <CommandList className='w-full'>
                <CommandEmpty>
                    No results found.
                </CommandEmpty>
            </CommandList>
            <CommandGroup className='w-full' heading  = "Documents">
                {documentList?.map((item) => (
                    <CommandItem key={item._id} onSelect={() => router.push(`/dashboard/${item._id}`)} className='px-2 py-3  bg-transparent hover:dark:bg-neutral-900 rounded-md hover:bg-neutral-300 cursor-pointer flex items-center gap-2'>
                        <File className='size-4 text-[#FF5733]'/>
                        <p className='text-sm line-clamp-1'>{item.context}</p>
                        <CommandShortcut>⌘+K</CommandShortcut>
                    </CommandItem>
                ))}
            </CommandGroup>
        </CommandDialog>

    )
}
