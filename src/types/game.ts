
export interface Level {
  level: number;
  grid: number[][];
  start: [number, number];
  goal: [number, number];
  skills: string[];
}

export interface Skills {
  loops: number;
  sequencing: number;
  debugging: number;
  conditionals: number;
  functions: number;
}

export interface GameState {
  currentLevel: number;
  buggyPosition: [number, number];
  isRunning: boolean;
  isComplete: boolean;
  xp: number;
  unlockedBadges: string[];
  skills: Skills;
}

export interface Badge {
  id: string;
  name: string;
  skill: string;
  condition: string;
  xp: number;
  icon: string;
}

export interface ExecutionResult {
  success: boolean;
  path: [number, number][];
  finalPosition: [number, number];
  message: string;
}
