// src/components/Tower.tsx
"use client";

interface TowerProps {
  disks: number[];
  towerIndex: number;
  getColor: (disk: number) => string;
}
const SIZES = [
  "w-5",
  "w-8",
  "w-14", 
  "w-20",
  "w-32",
  "w-40",
  "w-52",
  "w-60",
  "w-72",
  "w-80",
  "w-96"
];

const Tower: React.FC<TowerProps> = ({ disks, towerIndex, getColor }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 font-semibold">Cột {towerIndex}</div>
      <div className="flex flex-col-reverse gap-1 h-32 mb-10">
        {disks.map((disk, index) => (
          <div
            key={index}
            className={`h-6 ${SIZES[disk]} ${getColor(disk)} flex items-center justify-center mx-auto`}
          >
            {disk}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tower;