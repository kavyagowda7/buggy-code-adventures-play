
import { Badge } from '../types/game';

export const badges: Badge[] = [
  {
    id: 'first_steps',
    name: 'First Steps',
    skill: 'Sequencing',
    condition: 'Complete first level',
    xp: 50,
    icon: '👣'
  },
  {
    id: 'loop_legend',
    name: 'Loop Legend',
    skill: 'Loops',
    condition: 'Use loops 3 times',
    xp: 100,
    icon: '🔄'
  },
  {
    id: 'bug_hunter',
    name: 'Bug Hunter',
    skill: 'Debugging',
    condition: 'Fix 5 bugs',
    xp: 75,
    icon: '🐛'
  },
  {
    id: 'code_master',
    name: 'Code Master',
    skill: 'Functions',
    condition: 'Use functions 5 times',
    xp: 150,
    icon: '⚙️'
  }
];
