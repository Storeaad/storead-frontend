import { ForwardedRef } from "react";

import { Editor, EditorProps } from "@toast-ui/react-editor";

interface WrappedEditorProps extends EditorProps {
  forwardedRef: ForwardedRef<Editor>;
}

const WrappedEditor = (props: WrappedEditorProps) => {
  return (
    <Editor
      ref={props.forwardedRef}
      {...props}
    />
  );
};

export default WrappedEditor;
