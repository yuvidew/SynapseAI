"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, CopyCheck } from 'lucide-react';

export const ResultMarkDown = ({ content }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const [isCopiedCode, setIsCopiedCode] = React.useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopiedCode(true);
    setTimeout(() => setIsCopiedCode(false), 2000);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }

  return (
    <div className='flex flex-col gap-3'>
    <ReactMarkdown
      // remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ ...props }) => (
          <h1 className='text-4xl font-bold mb-6 leading-snug' {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className='text-3xl font-semibold mb-4 leading-snug' {...props} />
        ),
        h3: ({ ...props }) => (
          <h3 className='text-2xl font-semibold mb-2 leading-snug' {...props} />
        ),
        h4: ({ ...props }) => (
          <h4 className='text-xl font-medium mb-2 leading-snug' {...props} />
        ),
        h5: ({ ...props }) => (
          <h5 className='text-lg font-medium mb-1 leading-snug' {...props} />
        ),
        h6: ({ ...props }) => (
          <h6 className='text-base font-medium mb-1 leading-snug' {...props} />
        ),
        p: ({ ...props }) => (
          <p className='mb-4 leading-relaxed' {...props} />
        ),
        a: ({ ...props }) => (
          <a
            className='text-blue-600 underline hover:text-blue-800 focus:text-blue-700'
            target='_blank'
            rel='noreferrer'
            {...props}
          />
        ),
        ul: ({ ordered, ...props }) => (
          <ul className='list-disc pl-6 space-y-2 leading-relaxed' {...props} />
        ),
        ol: ({ ordered, ...props }) => (
          <ol className='list-decimal pl-6 space-y-2 leading-relaxed' {...props} />
        ),
        li: ({ordered, ...props }) => (
          <li className='mb-1' {...props} />
        ),
        blockquote: ({ ...props }) => (
          <blockquote className='border-l-4 bg-gray-100 p-4 italic leading-relaxed mb-6' {...props} />
        ),
        hr: () => <hr className='border-t border-gray-300 my-4' />, 
        img: ({ ...props }) => (
          <div className='mb-4'>
            <img className='max-w-full h-auto rounded-lg shadow-sm' {...props} />
          </div>
        ),
        table: ({ ...props }) => (
          <table className='table-auto w-full text-sm border-collapse border border-gray-300 mb-6' {...props} />
        ),
        th: ({ ...props }) => (
          <th className='bg-gray-100 text-left py-2 px-4 border border-gray-300' {...props} />
        ),
        td: ({ ...props }) => (
          <td className='py-2 px-4 border border-gray-300' {...props} />
        ),
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <div className='relative mb-4'>
              <button
                className='absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-xs cursor-pointer'
                onClick={() => copyToClipboard(String(children).replace(/\n$/, ''))}
              >
                {isCopiedCode ? "Copied" : "Copy"}
              </button>
              <SyntaxHighlighter
                style={okaidia}
                language={match[1]}
                PreTag='div'
                className='rounded-md overflow-auto'
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className='bg-stone-800 text-white px-1 py-0.5 rounded' {...props} />
          );
        },
        "note": ({ ...props }) => (
          <div className='bg-blue-100 border-l-4 border-blue-500 p-4 mb-4' {...props} />
        ),
        "warning": ({ ...props }) => (
          <div className='bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4' {...props} />
        ),
        "error": ({ ...props }) => (
          <div className='bg-red-100 border-l-4 border-red-500 p-4 mb-4' {...props} />
        ),

        article: ({ ...props }) => <article className="mb-6" {...props} />,
          aside: ({ ...props }) => <aside className="mb-6" {...props} />,
          nav: ({ ...props }) => <nav className="mb-6" {...props} />,
          header: ({ ...props }) => <header className="mb-6" {...props} />,
          footer: ({ ...props }) => <footer className="mb-6" {...props} />,
          mark: ({ ...props }) => <mark className="bg-yellow-300" {...props} />,
      }}

    >
      {content}
    </ReactMarkdown>
    <button  onClick={onCopy} >
      {isCopied ? <CopyCheck className='size-4' /> : <Copy className='size-4'/>}
    </button>
    </div>
  );
};
