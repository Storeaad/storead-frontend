import { ForwardedRef } from "react";

import { Viewer, ViewerProps } from "@toast-ui/react-editor";

interface WrappedViewerProps extends ViewerProps {
  forwardedRef: ForwardedRef<Viewer>;
}
function WrappedViewer(props: WrappedViewerProps) {
  return (
    <Viewer
      ref={props.forwardedRef}
      {...props}
    />
  );
}

export default WrappedViewer;
