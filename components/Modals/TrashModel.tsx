import { useTrash } from '@/hooks/useTrash';
import { cn } from '@/lib/utils'
import { SearchIcon, Trash, Undo, XIcon } from 'lucide-react';
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { ConfirmModal } from '../ConfirmModal';
import { Skeleton } from '../ui/skeleton';
import { toast } from 'sonner';

export const TrashModel = () => {
    const router = useRouter();
    const { isOpen, closeTrash } = useTrash();
    const [value, setValue] = useState<string>('');
    const documentList = useQuery(api.documents.getDocumentList, { context: value });
    const updateDocumentIsTrash = useMutation(api.documents.updateDocumentIsTrash);
    const deleteDocument = useMutation(api.documents.deleteDocument);

    const onClick = (docId : Id<"document">) => {
        router.push(`/dashboard/${docId}`)
    }

    return (
        <div className={cn(' absolute top-0 left-0 w-full h-full  items-center justify-center z-[9999px] bg-black/40', isOpen ? 'flex' : 'hidden')}>
            <div className='flex flex-col w-[30rem]  bg-stone-300 rounded-md overflow-hidden dark:bg-stone-900 '>
                <div className="w-full relative ">
                    <SearchIcon
                        className=" absolute top-1/2 left-3 transform -translate-y-1/2  h-4 w-4 text-[#FF5733]"

                    />
                    <Input
                        value={value}
                        className="w-full h-[3rem] max-w-[516px] rounded-b-none bg-transparent pl-9 focus-visible:border-o focus-visible:ring-0 "
                        placeholder="Search documents.."
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <XIcon
                        onClick={closeTrash}
                        className=" absolute cursor-pointer top-1/2 right-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
                    />
                </div>
                {documentList?.filter(({ isTrash }) => isTrash).map(({context , _id}) => (
                    <div key={_id} className='px-2 py-3 bg-transparent hover:dark:bg-neutral-900 rounded-md hover:bg-neutral-300 cursor-pointer flex items-center gap-2'
                    >
                        <div className='w-full'
                        onClick={() => onClick(_id)}
                        >
                        <p className='text-sm line-clamp-1 pl-2 '>{context}</p>
                        </div>

                        <div className='flex items-center gap-0.5'>
                            <div
                                onClick={() => {
                                    updateDocumentIsTrash({ id: _id})
                                    toast("Document restored successfully")
                                }}
                                role=' button'
                                className=' rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                                
                            >
                                <Undo className='h-4 w-4 text-muted-foreground '/>
                            </div>
                            <ConfirmModal onConfirm={async() => {
                                await deleteDocument({id : _id })
                                toast("Document deleted successfully")
                                closeTrash()
                                router.push('/dashboard')

                            }} >
                                <div
                                    role=' button'
                                    className=' rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                                >
                                        <Trash className='h-4 w-4 text-red-500 '/>
                                </div>

                            </ConfirmModal>
                        </div>
                    </div>
                ))}

                {!documentList && [1 ,2 ,3].map((item) => (
                    <Skeleton key={item} className=' h-5 w-full' />
                ))}

                {documentList?.filter(({ isTrash }) => isTrash).length === 0 && <p className=' text-sm text-muted-foreground text-center py-4'>No documents in trash.</p>}
            </div>
        </div>
    )
}
