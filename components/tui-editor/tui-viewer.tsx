"use client";

import { ForwardedRef, forwardRef, useEffect, useRef } from "react";

import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer, ViewerProps } from "@toast-ui/react-editor";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

import { toggleDark } from "./utils/toggle-dark";

const WrappedEditor = dynamic(() => import("./wrapped-viewer"), { ssr: false });

const ForwardedViewer = forwardRef(
  (props: ViewerProps, forwardedRef: ForwardedRef<Viewer>) => {
    return (
      <WrappedEditor
        {...props}
        forwardedRef={forwardedRef}
      />
    );
  },
);
ForwardedViewer.displayName = "ForwardedViewer";

const TUIViewer = (props: ViewerProps) => {
  const viewerRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    toggleDark();
  }, [theme]);

  return (
    <ForwardedViewer
      ref={viewerRef}
      language="ko-KR"
      height="600px"
      theme={theme === "dark" ? "dark" : "default"}
      {...props}
    />
  );
};

export default TUIViewer;
