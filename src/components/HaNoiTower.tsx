"use client";

import { useEffect, useState } from "react";
import { solveHaNoiAKT } from "../algorithm/AKT";
import Tower from "./Tower";

interface Step {
  from: number;
  to: number;
  disk: number;
  f?: number; 
  g?: number; 
  h?: number; 
}

const HaNoiTower: React.FC = () => {
  const [disks, setDisks] = useState<number>(3);
  const [towers, setTowers] = useState<number[][]>([[], [], []]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [manualMode, setManualMode] = useState<boolean>(false);
  const [autoSteps, setAutoSteps] = useState<Step[]>([]);
  const [currentStepLog, setCurrentStepLog] = useState<string[]>([]);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1000);
  const [stepCount, setStepCount] = useState<number>(0);
  const COLORS = [
    "bg-white",
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
  ];

  useEffect(() => {
    initializeTowers();
  }, [disks]);

  const initializeTowers = () => {
    const initialTowers: number[][] = [[], [], []];
    for (let i = disks; i > 0; i--) {
      initialTowers[0].push(i);
    }
    setTowers(initialTowers);
    setSteps([]);
    setStepIndex(0);
    setCurrentStepLog([]);
    setStepCount(0);
  };

  const handleSolve = (auto: boolean) => {
    initializeTowers();
    const result = solveHaNoiAKT(disks);
    const stepsToUse = result.steps;

    if (auto) {
      setAutoSteps(stepsToUse);
      setManualMode(false);
      setStepCount(0);
      handleAutoPlay(stepsToUse);
    } else {
      setSteps(stepsToUse);
      setManualMode(true);
    }
  };

  const handleAutoPlay = (stepsToPlay: Step[]) => {
    let currentIndex = 0;
    const log: string[] = [];

    const executeStep = () => {
      if (currentIndex < stepsToPlay.length) {
        const step = stepsToPlay[currentIndex];
        moveDisk(step.from, step.to);
        setStepCount((prevCount) => prevCount + 1);
        log.push(`Bước ${currentIndex + 1}: Di chuyển đĩa số ${step.disk} từ cột ${step.from + 1} tới cột ${step.to + 1}. Hệ số f: ${step.f ?? 'N/A'}, g: ${step.g ?? 'N/A'}, h: ${step.h ?? 'N/A'}`);
        setCurrentStepLog([...log]);
        setStepIndex(currentIndex + 1);
        currentIndex++;
        
        setTimeout(executeStep, animationSpeed);
      }
    };

    executeStep();
  };

  const handleManualMove = (from: number, to: number) => {
    if (canMove(from, to)) {
      const disk = towers[from][towers[from].length - 1];
      moveDisk(from, to);
      logStep(`Di chuyển đĩa số ${disk} từ cột ${from + 1} tới cột ${to + 1}`);
    }
  };

  const canMove = (from: number, to: number): boolean => {
    if (towers[from].length === 0) return false;
    if (towers[to].length === 0) return true;
    return towers[from][towers[from].length - 1] < towers[to][towers[to].length - 1];
  };

  const moveDisk = (from: number, to: number) => {
    setTowers((prevTowers) => {
      const newTowers = prevTowers.map((tower) => [...tower]);
      const disk = newTowers[from].pop();
      if (disk !== undefined) {
        newTowers[to].push(disk);
      }
      return newTowers;
    });
  };

  const logStep = (message: string) => {
    setCurrentStepLog((prev) => [...prev, message]);
  };

  const getColor = (disk: number): string => {
    return COLORS[disk % COLORS.length];
  };

  const handleDiskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisks(Number(e.target.value));
  };

  const handleStepSelection = (index: number) => {
    if (manualMode) {
      const step = steps[index];
      moveDisk(step.from, step.to);
      logStep(`Di chuyển đĩa số ${step.disk} từ cột ${step.from + 1} tới cột ${step.to + 1}`);
    }
  };

  return (
    <div className="mt-8 my-10">
      <h2 className="text-3xl my-10">Bài toán tháp Hà Nội giải thuật AKT</h2>
      <div className="flex gap-4">
        <input
          type="number"
          min="1"
          max="10"
          value={disks}
          onChange={handleDiskChange}
          className="border p-2 rounded"
        />
        <button
          onClick={() => handleSolve(true)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Giải auto
        </button>
        <button
          onClick={() => handleSolve(false)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Giải từng bước
        </button>
      </div>

      <div className="flex justify-around mt-6">
        {towers.map((tower, index) => (
          <Tower key={index} disks={tower} towerIndex={index + 1} getColor={getColor} />
        ))}
      </div>

      {manualMode && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Chọn bước di chuyển:</h2>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`${
                  index === stepIndex ? "text-red-500" : ""
                } flex items-center justify-between`}
              >
                <span>
                  Di chuyển đĩa số {step.disk} từ cột {step.from + 1} tới cột {step.to + 1}
                </span>
                {manualMode && (
                  <button
                    className="ml-4 bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleStepSelection(index)}
                  >
                    Chọn
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {currentStepLog.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Nhật ký các bước:</h2>
          <ul className="list-disc pl-5">
            {currentStepLog.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HaNoiTower;