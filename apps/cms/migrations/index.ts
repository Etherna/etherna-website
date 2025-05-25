import * as migration_20250525_133825 from './20250525_133825';

export const migrations = [
  {
    up: migration_20250525_133825.up,
    down: migration_20250525_133825.down,
    name: '20250525_133825'
  },
];
