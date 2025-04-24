/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { Content } from "@/interface/content";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import React, { useState, SetStateAction, useEffect, useCallback } from "react";

interface TextEditorProps { 
  value: any;
  setValue: React.Dispatch<SetStateAction<any>>;
  isError: boolean;
  error: string | boolean;
  dataKey: string;
}

export default function TextEditor({ value, setValue, isError, error, dataKey }: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ 
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

            if (!allowedProtocols.includes(protocol)) {
              return false
            }

            // all checks have passed
            return true
          } catch {
            return false
          }
        }
       }),
    ],
    content: value ? value!.contents || '' : ''
  });
  const [isClient, setIsClient] = useState<boolean>(false);

  const setLink = useCallback(() => {
    const previousUrl = editor!.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor!.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    try {
      editor!.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    } catch (e) {
      alert("Failed to add Link");
    }
  }, [editor])

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || !editor) return null;
  else return (
    <div className="p-4 border rounded-md w-full mx-auto flex flex-col gap-3">
      <div className="flex gap-2 mb-2">
        <button 
          onClick={() => editor.chain().focus().toggleBold().run()} 
          className={`btn font-bold px-1 rounded-md ${editor.isActive('bold') ? 'bg-gray-400 text-white' : 'bg-white text-black'}`}
        >
          <b>B</b>
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleItalic().run()} 
          className={`btn italic px-2 rounded-md ${editor.isActive('italic') ? 'bg-gray-400 text-white' : 'bg-white text-black'}`}
        >
          <i>I</i>
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleUnderline().run()} 
          className={`btn underline px-1 rounded-md ${editor.isActive('underline') ? 'bg-gray-400 text-white' : 'bg-white text-black'}`}
        >
            <u>U</u>
        </button>
        <button 
          onClick={() => {
            if(editor.isActive('link')) editor.chain().focus().unsetLink().run()
            else setLink()
          }} 
          className={`btn underline px-1 rounded-md ${editor.isActive('link') ? 'bg-gray-400 text-white' : 'bg-white text-blue-600'}`}
        >
          A
        </button>
        <div className="flex gap-2 bg-gray-300 rounded-md px-2 py-2">
          <button 
            onClick={() => editor.chain().focus().toggleBulletList().run()} 
            className={`btn px-1 rounded-md ${editor.isActive('bulletList') ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'}`}
          >
              Bullet List
          </button>
          <button 
            onClick={() => editor.chain().focus().toggleOrderedList().run()} 
            className={`btn px-1 rounded-md ${editor.isActive('orderedList') ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'}`}
          >
              Ordered List
          </button>
        </div>
        <button 
          onClick={() => setValue({
            ...value!,
            [dataKey]: editor.getHTML()
          })} 
          className="btn">
            Save
          </button>
      </div>
      <EditorContent editor={editor} className="min-h-[200px] border p-2 rounded" />
      {
        isError && <p className="text-red-500 text-xs">{error}</p>
      }
    </div>
  )
}