import * as migration_20250617_131629 from './20250617_131629';
import * as migration_20250705_144706 from './20250705_144706';

export const migrations = [
  {
    up: migration_20250617_131629.up,
    down: migration_20250617_131629.down,
    name: '20250617_131629',
  },
  {
    up: migration_20250705_144706.up,
    down: migration_20250705_144706.down,
    name: '20250705_144706'
  },
];
