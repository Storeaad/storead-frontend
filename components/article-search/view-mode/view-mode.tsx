"use client";

import { LayoutGrid, LayoutList } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { useViewModeStore } from "../hooks/store/useViewModeStore";

function ViewMode() {
  const { viewMode, setViewMode } = useViewModeStore();

  return (
    <ToggleGroup
      type="single"
      value={viewMode}
      onValueChange={(value) => setViewMode(value as "list" | "grid")}
    >
      <ToggleGroupItem
        value="list"
        aria-label="List view"
      >
        <LayoutList className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="grid"
        aria-label="Grid view"
      >
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export default ViewMode;
