"use client";

import { Content, EditorContent, useEditor } from "@tiptap/react";
import StartKit from "@tiptap/starter-kit";

interface Props {
  content?: Content;
}

const RichEditorViewer = ({ content, ...props }: Props) => {
  const editor = useEditor({
    extensions: [StartKit],
    content,
    editable: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto",
      },
    },
  });

  if (!editor) return null;

  return (
    <div
      className="p-4 min-h-[200px]"
      onClick={() => editor.chain().focus().run()}
    >
      <EditorContent
        editor={editor}
        {...props}
      />
    </div>
  );
};

export default RichEditorViewer;
