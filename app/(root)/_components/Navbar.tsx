"use client";
import React from "react";
import { ModeToggle } from "@/components/ModeToggle";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/clerk-react";

export const Navbar = () => {
    const { isSignedIn } = useClerk()
    const router = useRouter()
    const { scrolled } = useScrollTop();
    return (
        <div
            className={cn(
                "z-50 bg-background fixed dark:bg-[#1f1f1f] top-0  flex items-center w-full p-6",
                scrolled && "border-b shadow-sm"
            )}
        >
            <Logo />
            <div
                className="md:ml-auto md:justify-end justify-between w-full
            flex items-center gap-x-2"
            >
                {isSignedIn ? (
                    <Button onClick={() => router.push("/dashboard")} variant="default" size="sm">
                        Dashboard
                    </Button>
                ) : (
                    <>
                        <Button onClick={() => router.push("/sign-in")} variant="ghost" size="sm">
                            Log in
                        </Button>
                        <Button onClick={() => router.push("/sign-up")} variant="default" size="sm">
                            Sign up
                        </Button>
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    );
};
