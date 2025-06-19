
import { Level, GameState, ExecutionResult } from '../types/game';

export const executeCode = async (
  commands: string[], 
  level: Level, 
  gameState: GameState
): Promise<ExecutionResult> => {
  const path: [number, number][] = [];
  let [x, y] = [...level.start];
  let direction = 0; // 0: right, 1: down, 2: left, 3: up
  
  // Directions: [dx, dy]
  const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  
  console.log('Executing commands:', commands);
  console.log('Starting position:', [x, y]);
  console.log('Goal position:', level.goal);
  
  for (const command of commands) {
    console.log('Processing command:', command);
    
    if (command === 'moveForward') {
      const [dx, dy] = directions[direction];
      const newX = x + dx;
      const newY = y + dy;
      
      // Check bounds
      if (newX >= 0 && newX < 5 && newY >= 0 && newY < 5) {
        // Check for walls
        if (level.grid[newY][newX] !== 1) {
          x = newX;
          y = newY;
          path.push([x, y]);
          console.log('Moved to:', [x, y]);
        } else {
          console.log('Hit wall at:', [newX, newY]);
        }
      } else {
        console.log('Out of bounds:', [newX, newY]);
      }
    } else if (command === 'turnLeft') {
      direction = (direction + 3) % 4; // Turn left
      console.log('Turned left, new direction:', direction);
    } else if (command === 'turnRight') {
      direction = (direction + 1) % 4; // Turn right
      console.log('Turned right, new direction:', direction);
    } else if (command === 'repeat') {
      // For now, we'll just repeat the last action 3 times
      // In a full implementation, this would handle block grouping
      console.log('Repeat command - implementing basic version');
    }
    
    // Add delay for animation
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  const [goalX, goalY] = level.goal;
  const success = x === goalX && y === goalY;
  
  console.log('Final position:', [x, y]);
  console.log('Success:', success);
  
  return {
    success,
    path,
    finalPosition: [x, y],
    message: success ? 'Level completed!' : 'Try again!'
  };
};
