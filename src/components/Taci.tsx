import React, { useState, useEffect } from "react";
import Matrix from "./Matrix";
import { solveTaci, generateRandomMatrix } from "@/algorithm/TaciAKT";

export default function Taci() {
  const [n, setN] = useState(3);
  const [initialMatrix, setInitialMatrix] = useState<number[][]>([]);
  const [goalMatrix, setGoalMatrix] = useState<number[][]>([]);
  const [solutionSteps, setSolutionSteps] = useState<TaciNode[]>([]);
  type Matrix = number[][];

  interface TaciNode {
  matrix: Matrix;
  g: number;
  h: number;
  f: number;
  emptyPos: [number, number];
  parent?: TaciNode;
}

  useEffect(() => {
    setInitialMatrix(generateRandomMatrix(n));
    setGoalMatrix(generateRandomMatrix(n));
  }, [n]);

  const handleSolve = () => {
    const steps = solveTaci(initialMatrix, goalMatrix);
    setSolutionSteps(steps);
  };

  const handleGenerateMatrices = () => {
    setInitialMatrix(generateRandomMatrix(n));
    setGoalMatrix(generateRandomMatrix(n));
  };

  return (
    <div className="py-10">
      <h2 className="text-3xl">Bài toán Taci giải thuật AKT</h2>
      <input
        type="number"
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
        className="border p-2 mt-4"
        min={3}
      />
      <button onClick={handleGenerateMatrices} className="bg-blue-500 text-white p-2 m-2">
        Tạo Ma Trận
      </button>
      <div className="flex gap-4">
        <Matrix matrix={initialMatrix} label="Trạng thái ban đầu" />
        <Matrix matrix={goalMatrix} label="Trạng thái đích" />
      </div>
      <button onClick={handleSolve} className="bg-green-500 text-white p-2 mt-4">
        Giải
      </button>
      <div className="mt-4">
        {solutionSteps.map((node, index) => (
          <Matrix
            key={index}
            matrix={node.matrix}
            label={`Bước ${index + 1}`}
            highlight={index === solutionSteps.length - 1}
            f={node.f}
            g={node.g}
            h={node.h}
          />
        ))}
      </div>
    </div>
  );
}