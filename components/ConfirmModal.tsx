"use client";

import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";



export const ConfirmModal = ({children , onConfirm} : {children: React.ReactNode; onConfirm: () => void;}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger
            asChild>
                {children} 
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()} >Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.stopPropagation();
                            onConfirm();
                        }}
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>    
            </AlertDialogContent>
        </AlertDialog>
    )
}
