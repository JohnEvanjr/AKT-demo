import React from "react";

interface MatrixProps {
  matrix: number[][];
  label: string;
  highlight?: boolean;
  f?: number;
  g?: number;
  h?: number;
}

const Matrix: React.FC<MatrixProps> = ({ matrix, label, highlight = false, f, g, h }) => {
  return (
    <div className={`border p-4 ${highlight ? "bg-green-200" : ""}`}>
      <h3 className="text-xl mb-2">{label}</h3>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${matrix.length}, 40px)` }}>
        {matrix.flat().map((value, index) => (
          <div
            key={index}
            className={`w-10 h-10 flex items-center justify-center border ${
              value === 0 ? "bg-red-600" : "bg-white"
            }`}
          >
            {value !== 0 ? value : ""}
          </div>
        ))}
      </div>
      {f !== undefined && g !== undefined && h !== undefined && (
        <p className="mt-2">
          <strong>f</strong>: {f}, <strong>g</strong>: {g}, <strong>h</strong>: {h}
        </p>
      )}
    </div>
  );
};

export default Matrix;
