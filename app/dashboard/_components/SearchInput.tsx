"use client";
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Search } from 'lucide-react';
import { searchInputType } from '@/types/types';
import { toast } from 'sonner';
import Spinner from '@/components/Spinner';
import axios from 'axios';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';



export const SearchInput = () => {
    const [searchInput, setSearchInput] = useState<searchInputType>();
    const addDocuments = useMutation(api.documents.addDocuments);
    const [loading, setLoading] = useState(false);


    const onSelect = (type: searchInputType["type"]) => {
        setSearchInput((prev) => ({
            ...prev,
            type,
        }));
    };


    const onSearchQuery = async () => {
        if (searchInput?.title && searchInput?.type) {
            setLoading(true)
            try {

                const context = await axios.post("/api/context", {message : { title: searchInput.title } });

                if (context.status !== 200) {
                    toast.error(`Failed to generate context`)
                    return
                }

                console.log(context.data)

                const response = await axios.post("/api/research", { messages: { type: searchInput.type, content: searchInput.title , format: searchInput.format } });

                if (response.status !== 200) {
                    toast.error(`Failed to search topic`)
                    return
                }

                const id = await addDocuments({
                    context: context.data.context,
                    title : searchInput.title,
                    type : searchInput.type,
                    format : searchInput.format || "summary",
                    result : response.data.result
                })

                // console.log(response.data)

                if (!id) {
                    toast.error(`Something to went wrong`);
                    return
                }

                // router.push(`/dashboard/${id}`)
            } catch (error) {
                console.log(error)
                toast.error(`Failed to search topic`)
            } finally {
                setLoading(false)
            }
        } else {
            if (!searchInput?.title?.length) {
                toast.warning(`Enter search query`)
            } else if (!searchInput?.type?.length) {
                toast.warning(`Select search type`)
            }
        }
    }


    return (
        <Card className="w-full">
            <div className='flex flex-col gap-5 px-4'>
                <TextareaAutosize
                    value={searchInput?.title}
                    onChange={(e) => {
                        setSearchInput((prev) => ({
                            ...prev,
                            title: e.target.value
                        }))
                    }}
                    placeholder="Ask me anything..."
                    className=" text-md bg-transparent resize-none  break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] w-full"
                />

                <div className='flex items-center justify-between mt-5 '>
                    <div className='flex items-center gap-2  rounded-md'>
                        <Select defaultValue={searchInput?.format} onValueChange={(format) => {
                            setSearchInput((prev) => ({
                                ...prev,
                                format : format as "summary" | "report" | "bullet-points" | undefined,
                            }))}}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="summary">Summary</SelectItem>
                                <SelectItem value="report">Report</SelectItem>
                                <SelectItem value="bullet-points">Bullet points</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button
                            variant={searchInput?.type == "search" ? "default" : "ghost"}
                            size={"sm"}
                            className=' flex items-center gap-1'
                            onClick={() => onSelect("search")}
                        >
                            <Search className='size-4' />
                            Search
                        </Button>
                        <Button
                            variant={searchInput?.type == "research" ? "default" : "ghost"}
                            size={"sm"}
                            className=' flex items-center gap-1'
                            onClick={() => onSelect("research")}
                        >
                            <Globe className='size-4' />
                            Research
                        </Button>
                    </div>
                    <div className='flex items-center justify-end'>
                        <Button
                            size={"icon"}
                            onClick={onSearchQuery}
                            disabled={searchInput?.title?.length && searchInput.type?.length ? false : true}
                        >
                            {loading ?
                                <Spinner color={"white"} size={"sm"} />
                                :
                                <ArrowRight className='size-5' />
                            }
                        </Button>
                    </div>
                </div>
            </div>

        </Card>
    )
}
