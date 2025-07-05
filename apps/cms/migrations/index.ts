import * as migration_20250617_131629 from './20250617_131629';

export const migrations = [
  {
    up: migration_20250617_131629.up,
    down: migration_20250617_131629.down,
    name: '20250617_131629'
  },
];
