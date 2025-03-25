"use client";

import MainLayout from "@/components/main-layout/main-layout";
import SwitchTwoLayout from "@/components/switch-two-layout/switch-two-layout";

import ReviewList from "./review-list";

function SwitchMainToReviewListLayout() {
  return (
    <SwitchTwoLayout
      firstLayout={<MainLayout />}
      secondLayout={<ReviewList />}
    />
  );
}

export default SwitchMainToReviewListLayout;
