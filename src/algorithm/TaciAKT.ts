export type Matrix = number[][];

interface TaciNode {
  matrix: Matrix;
  g: number;
  h: number;
  f: number;
  emptyPos: [number, number];
  parent?: TaciNode;
}

export function generateRandomMatrix(n: number): Matrix {
  const numbers = Array.from({ length: n * n }, (_, i) => i);
  numbers.sort(() => Math.random() - 0.5);
  const matrix = [];
  for (let i = 0; i < n; i++) {
    matrix.push(numbers.slice(i * n, (i + 1) * n));
  }
  return matrix;
}

function calculateHeuristic(matrix: Matrix, goal: Matrix): number {
  let h = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== 0 && matrix[i][j] !== goal[i][j]) {
        h++;
      }
    }
  }
  return h;
}

function findEmptyPosition(matrix: Matrix): [number, number] {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) return [i, j];
    }
  }
  return [-1, -1];
}

export function solveTaci(startMatrix: Matrix, goalMatrix: Matrix): TaciNode[] {
    const startNode: TaciNode = {
      matrix: startMatrix,
      g: 0,
      h: calculateHeuristic(startMatrix, goalMatrix),
      f: 0,
      emptyPos: findEmptyPosition(startMatrix),
    };
    startNode.f = startNode.g + startNode.h;
  
    const openSet: TaciNode[] = [startNode];
    const closedSet: Set<string> = new Set();
  
    const directions = [
      [-1, 0], // Up
      [1, 0],  // Down
      [0, -1], // Left
      [0, 1],  // Right
    ];
  
    while (openSet.length > 0) {
      openSet.sort((a, b) => a.f - b.f);
      const currentNode = openSet.shift()!;
      closedSet.add(JSON.stringify(currentNode.matrix));
  
      if (currentNode.h === 0) {
        const steps: TaciNode[] = [];
        let node: TaciNode | undefined = currentNode;
        while (node) {
          steps.unshift(node);
          node = node.parent;
        }
        return steps;
      }
  
      for (const [dx, dy] of directions) {
        const [emptyX, emptyY] = currentNode.emptyPos;
        const newX = emptyX + dx;
        const newY = emptyY + dy;
  
        if (newX >= 0 && newX < currentNode.matrix.length && newY >= 0 && newY < currentNode.matrix[0].length) {
          const newMatrix = currentNode.matrix.map((row) => [...row]);
          [newMatrix[emptyX][emptyY], newMatrix[newX][newY]] = [newMatrix[newX][newY], newMatrix[emptyX][emptyY]];
  
          const h = calculateHeuristic(newMatrix, goalMatrix);
          const g = currentNode.g + 1;
          const newNode: TaciNode = {
            matrix: newMatrix,
            g,
            h,
            f: g + h,
            emptyPos: [newX, newY],
            parent: currentNode,
          };
  
          if (!closedSet.has(JSON.stringify(newMatrix))) {
            openSet.push(newNode);
          }
        }
      }
    }
    return [];
  }
  