// ./src/app/page.tsx
"use client";

import HaNoiTower from "@/components/HaNoiTower";
import Taci from "@/components/Taci";

export default function Home() {
  return (
    <div className="p-6 divide-y">
      <HaNoiTower />
      <Taci />
    </div>
  );
}
