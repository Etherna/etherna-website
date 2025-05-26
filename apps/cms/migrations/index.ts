import * as migration_20250525_175739 from './20250525_175739';

export const migrations = [
  {
    up: migration_20250525_175739.up,
    down: migration_20250525_175739.down,
    name: '20250525_175739'
  },
];
