interface Step {
  from: number;
  to: number;
  disk: number;
  f?: number; 
  g?: number; 
  h?: number; 
}

export const solveHaNoiAKT = (disks: number) => {
  const steps: Step[] = [];
  
  const g = (stepCount: number) => stepCount; 
  
  const h = (remainingDisks: number) => Math.pow(2, remainingDisks) - 1; 

  const f = (g: number, h: number) => g + h;

  solve(disks, 0, 2, 1, steps, g, h, f);

  let stepCount = 0;
  steps.forEach((step, index) => {
    stepCount++;
    step.g = stepCount;

    const remainingDisks = calculateRemainingDisks(steps, index, disks);
    step.h = h(remainingDisks);
    
    step.f = f(step.g, step.h);
  });

  return { steps };
};

const calculateRemainingDisks = (
  steps: Step[],
  currentIndex: number,
  totalDisks: number
) => {
  let remainingDisks = totalDisks;
  for (let i = 0; i <= currentIndex; i++) {
    if (steps[i].disk === remainingDisks) {
      remainingDisks--;
    }
  }
  return remainingDisks;
};

const solve = (
  n: number,
  from: number,
  to: number,
  aux: number,
  steps: Step[],
  g: (stepCount: number) => number,
  h: (remainingDisks: number) => number,
  f: (g: number, h: number) => number
) => {
  if (n === 1) {
    steps.push({ from, to, disk: 1 });
    return;
  }

  solve(n - 1, from, aux, to, steps, g, h, f);
  steps.push({ from, to, disk: n });
  solve(n - 1, aux, to, from, steps, g, h, f);
};