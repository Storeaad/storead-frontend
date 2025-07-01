import { useState } from "react";

import defaultCover from "@/public/no_cover.svg";

export const useImageFallback = (
  src: string | undefined = undefined,
  fallback: string | undefined = defaultCover,
) => {
  const [imageSrc, setImageSrc] = useState(src || fallback);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImageSrc(fallback);
      setHasError(true);
    }
  };

  return { imageSrc, handleError };
};
