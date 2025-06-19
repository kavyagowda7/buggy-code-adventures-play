
import { Level } from '../types/game';

export const sampleLevel: Level = {
  level: 1,
  grid: [
    [0, 0, 0, 1, 0],
    [1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 2, 0]
  ],
  start: [0, 0],
  goal: [3, 4],
  skills: ["sequencing", "basic movement"]
};

export const levels: Level[] = [
  sampleLevel,
  {
    level: 2,
    grid: [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 1, 2]
    ],
    start: [0, 0],
    goal: [4, 4],
    skills: ["loops", "sequencing"]
  }
];
