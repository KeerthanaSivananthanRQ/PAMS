

export function randomReadableName() {
  const words = ['Sky', 'Nova', 'Orion', 'Atlas', 'Zen'];
  const word = words[Math.floor(Math.random() * words.length)];
  return `sample_${word}_${Date.now().toString().slice(-4)}`;
}
