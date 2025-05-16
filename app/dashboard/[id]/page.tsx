"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Header } from "../_components/Header";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { DisplayResult } from "./_components/DisplayResult";
import { Skeleton } from "@/components/ui/skeleton";


export default function SearchResultPage() {
    const params = useParams();
    const getSearchInputById = useQuery(api.documents.getDocumentById, {
        id: params.id as Id<"document">,
    });

    useEffect(() => {
        console.log("search query : ", getSearchInputById);
    }, [getSearchInputById]);

    if (!getSearchInputById) {
        return (
            <>
                <Header isTitle={false} title={""} />
                <div className="px-10 md:px-20 lg:px-36 xl:px-56 mt-20">
                    <div className="mt-7">
                        <div className="border-b-2 border-[#eaeaea]dark:border-gray-700 mb-2">
                        <Skeleton className="h-8 w-full mb-2" />
                        </div>
                        <Skeleton className="h-28 w-full mt-2" />
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header
                isTitle={true}
                title={getSearchInputById?.context}
            />

            {getSearchInputById?.result.map(({ title, content ,}) => (
                <div key={title} className="px-10 md:px-20 lg:px-36 xl:px-56 mt-20 pb-32">
                    <DisplayResult
                        id={getSearchInputById?._id}
                        title={title}
                        context={getSearchInputById?.context}
                        content={content}
                        type = {getSearchInputById?.type}
                        format = {getSearchInputById?.format}
                    />
                </div>
            ))}
        </>
    );
}
