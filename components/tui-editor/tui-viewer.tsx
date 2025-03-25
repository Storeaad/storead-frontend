"use client";

import { ForwardedRef, forwardRef, useEffect, useRef } from "react";

import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer, ViewerProps } from "@toast-ui/react-editor";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { toggleDark } from "./utils/toggle-dark";

const WrappedEditor = dynamic(() => import("./wrapped-viewer"), {
  ssr: false,
  loading: () => <Skeleton className="w-[500px] h-[500px] rounded-md" />,
});

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
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    toggleDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  return (
    <Card className="p-6 rounded-2xl shadow-lg">
      <ForwardedViewer
        ref={viewerRef}
        language="ko-KR"
        height="600px"
        theme={resolvedTheme === "dark" ? "dark" : "default"}
        {...props}
      />
    </Card>
  );
};

export default TUIViewer;
