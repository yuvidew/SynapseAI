import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog"

import {Label} from "@/components/ui/label";
import { ModeToggle } from "../ModeToggle";
import { useSetting } from "@/hooks/useSetting";
import { DialogTitle } from "@radix-ui/react-dialog";

export const SettingModal = () => {
    const { isOpen, closeSetting } = useSetting();
    return (
        <Dialog open={isOpen} onOpenChange={closeSetting}>
            <DialogContent>
                <DialogHeader className={"border-b pb-3"} >
                    <DialogTitle className=" text-lg font-medium">
                        My settings
                    </DialogTitle>
                </DialogHeader>
                <div className=" flex items-center justify-between">
                    <div className=" flex flex-col gap-y-1">
                        <Label>
                            Appearance
                        </Label>
                        <span className=" text-[0.8rem] text-muted-foreground">
                            Customize how Synapse.ai looks on your device
                        </span>
                    </div>
                    <ModeToggle/>
                </div>
            </DialogContent>
        </Dialog>
    )
}