export const normalizeIdea = idea => ({ ...idea, average_score: parseFloat(idea.average_score).toFixed(1) });

export const normalizeIdeas = ideas => ideas.map(normalizeIdea);

export const generateArray = (len = 10) => Array.from(Array(len), (x, i) => ++i);

export const calculateAvg = (...args) => {
  const avg = args.reduce((prev, curr) => prev + parseInt(curr, 10), 0);
  return (avg / args.length).toFixed(1);
};

export const removeNew = idea => ({ ...idea, isNew: false });