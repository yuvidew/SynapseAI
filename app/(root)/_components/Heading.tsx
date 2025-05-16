"use client"


import { Button } from '@/components/ui/button';
import { useClerk } from '@clerk/clerk-react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

export const Heading = () => {
    const { isSignedIn } = useClerk()
    const router = useRouter();
    return (
        <div className=" max-w-3xl space-y-4" >
            <h1 className=" text-2xl sm:text-5xl md:text-4xl font-bold">
                Autonomous Research Agent with RAG + LLMs with help of {" "}
                <span className=" underline">SynapseAI</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                that finds, understands, and summarizes information —
                so you can focus on insights, not information overload.
            </h3>
            {isSignedIn ? (
                <Button onClick={() => router.push("/dashboard")}>
                    Enter Synapse.AI {" "}
                    <ArrowRight className=" h-4 w-4 ml-2" />
                </Button>
            ) : (
                <Button
                    onClick={() => router.push("/sign-in")}
                >
                    Get SynapseAI Free
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            )}
        </div>
    )
}
