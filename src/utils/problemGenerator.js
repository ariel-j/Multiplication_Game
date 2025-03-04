// Utility functions for problem generation

function generateRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMultiplicationProblem(minMultiplier, maxMultiplier, maxProduct) {
  let a, b, product;
  let attempts = 0;
  const maxAttempts = 50;

  do {
    a = generateRandomInRange(minMultiplier, maxMultiplier);
    b = generateRandomInRange(minMultiplier, maxMultiplier);
    product = a * b;
    attempts++;
  } while (product > maxProduct && attempts < maxAttempts);

  // If we couldn't find a valid problem within constraints, adjust
  if (product > maxProduct) {
    a = Math.min(a, Math.floor(Math.sqrt(maxProduct)));
    b = Math.min(b, Math.floor(maxProduct / a));
    product = a * b;
  }

  return {
    factorA: a,
    factorB: b,
    product: product,
    text: `${a} × ${b} = ?`
  };
}

function generateProblemsForLevel(levelData) {
  const { minMultiplier, maxMultiplier, maxProduct, problemCount } = levelData;
  const problems = [];

  for (let i = 0; i < problemCount; i++) {
    problems.push(generateMultiplicationProblem(minMultiplier, maxMultiplier, maxProduct));
  }

  return problems;
}

export { generateMultiplicationProblem, generateProblemsForLevel };
