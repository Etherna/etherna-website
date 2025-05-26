import * as migration_20250525_175739 from './20250525_175739';
import * as migration_20250526_074041 from './20250526_074041';

export const migrations = [
  {
    up: migration_20250525_175739.up,
    down: migration_20250525_175739.down,
    name: '20250525_175739',
  },
  {
    up: migration_20250526_074041.up,
    down: migration_20250526_074041.down,
    name: '20250526_074041'
  },
];
