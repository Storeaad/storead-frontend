"use client";

import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor, EditorProps } from "@toast-ui/react-editor";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

import { toggleDark } from "./utils/toggle-dark";

const WrappedEditor = dynamic(() => import("./wrapped-editor"), { ssr: false });

const ForwardedEditor = forwardRef(
  (props: EditorProps, forwardedRef: ForwardedRef<Editor>) => {
    return (
      <WrappedEditor
        {...props}
        forwardedRef={forwardedRef}
      />
    );
  },
);

ForwardedEditor.displayName = "ForwardedEditor";

export type TUIEditorRef = {
  getHTML: () => string;
  getMarkdown: () => string;
};

interface Props extends EditorProps {}

const TUIEditor = forwardRef<TUIEditorRef, Props>((props: Props, ref) => {
  const editorRef = useRef<Editor | null>(null);
  const { theme } = useTheme();

  useImperativeHandle(ref, () => ({
    getHTML: () => editorRef.current?.getInstance().getHTML(),
    getMarkdown: () => editorRef.current?.getInstance().getMarkdown(),
  }));

  useEffect(() => {
    toggleDark();
  }, [theme]);

  return (
    <ForwardedEditor
      ref={editorRef}
      initialValue=" "
      language="ko-KR"
      previewStyle="vertical"
      height="600px"
      initialEditType="markdown"
      hideModeSwitch={true}
      useCommandShortcut={true}
      theme={theme === "dark" ? "dark" : "default"}
      {...props}
    />
  );
});

TUIEditor.displayName = "TUIEditor";

export default TUIEditor;
