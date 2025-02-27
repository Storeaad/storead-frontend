import { useEffect } from "react";

import { useTagsStore } from "@/store/tags-store";

export type InitialTags = string[];

export const useTags = (initialTags?: InitialTags) => {
  const tagsStore = useTagsStore((state) => state);

  useEffect(() => {
    if (initialTags) {
      tagsStore.replaceAll(initialTags);
    }
    return () => tagsStore.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return tagsStore;
};
