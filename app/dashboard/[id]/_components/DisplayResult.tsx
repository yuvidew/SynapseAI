"use client";
import { ResultMarkDown } from '@/components/ResultMarkDown';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

import { Separator } from '@radix-ui/react-dropdown-menu';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { Send } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

export const DisplayResult = (
  {
    id,
    title,
    content,
    type,
    format,
    context
  }: {
    id : Id<"document">,
    title: string,
    content: string,
    type: string,
    format: string,
    context: string
  }
) => {

  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const addResult = useMutation(api.documents.addMoreDocumentResult);

  const onAskQuery = async () => {
    if (!query) {
      toast.error("Please enter your query")
      return
    }

    setQuery("")
    setLoading(true)
    try {
      const response = await axios.post("/api/conversation", { message: { query, context, type, format } });

      if (response.status !== 200) {
        toast.error("Failed to ask query");
        return
      }

      const result = await addResult({
        id,
        title: query,
        content: response.data.result
      });

      console.log(result)

      // if (!result) {
      //   toast.error("Failed to add result");
      //   return
      // }


    } catch (error) {
      console.log(error)
      toast.error("An error occurred while asking the query.");
    } finally {

      setLoading(false)
    }
  }
  return (
    <div className='mt-7 '>
      <h2 id={id} className='font-medium text-2xl pb-2  capitalize border-b-2 border-[#eaeaea]dark:border-gray-700'>
        {title}
      </h2>
      <Separator className='mb-2 w-full' />
      <ResultMarkDown content={content} />
      <div className="absolute dark:bg-neutral-800 bg-neutral-100 p-4 gap-3 rounded-md bottom-4 w-[65%] flex items-center left-1/2 -translate-x-1/2 transform ">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your query.."
        />
        <Button size={"icon"} onClick={onAskQuery} >
          {loading ? <Spinner color={"white"} size={"sm"} /> :
            <Send className=' size-5' />
          }
        </Button>
      </div>

    </div>
  )
}
